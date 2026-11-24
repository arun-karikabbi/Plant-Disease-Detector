import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  clearLocalHistory,
  deleteScanFromLocalHistory,
  getScans,
  predictDisease,
  sendChatMessage,
} from '../services/api.js';
import type {
  AppErrorState,
  ChatMessage,
  PendingImage,
  ScanResult,
} from '../types/leafcare';

interface LeafCareContextValue {
  pendingImage: PendingImage | null;
  currentScan: ScanResult | null;
  history: ScanResult[];
  isHistoryLoading: boolean;
  isAnalyzing: boolean;
  isAdvisorTyping: boolean;
  errorState: AppErrorState | null;
  advisorMessages: ChatMessage[];
  advisorContextScan: ScanResult | null;
  isOnline: boolean;
  selectFileForPreview: (file: File) => { ok: boolean; error?: AppErrorState };
  selectSampleForPreview: (
    sampleKey: string,
    previewUrl: string,
    label: string,
    confidenceOverride?: number
  ) => void;
  clearPendingImage: () => void;
  analyzePendingImage: () => Promise<ScanResult | null>;
  openScanResult: (scan: ScanResult) => void;
  setAdvisorContextFromScan: (scan: ScanResult | null) => void;
  askAdvisor: (text: string) => Promise<void>;
  removeScan: (scanId: string) => void;
  clearAllHistory: () => void;
  clearError: () => void;
  setErrorState: (err: AppErrorState | null) => void;
}

const LeafCareContext = createContext<LeafCareContextValue | undefined>(undefined);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

function buildInitialGreeting(scan: ScanResult | null): ChatMessage {
  if (!scan) {
    return {
      id: 'greet_general',
      sender: 'advisor',
      text: 'Hello! I am your LeafCare Advisor. Scan a plant leaf on the Home screen, or ask me a question about crop care, spraying safety, or disease prevention.',
      timestamp: new Date().toISOString(),
    };
  }

  if (scan.status === 'healthy') {
    return {
      id: `greet_${scan.id}`,
      sender: 'advisor',
      text: `Your ${scan.crop.toLowerCase()} leaf looks healthy (${scan.confidence}% confidence). Ask me how to keep your plants strong or prevent future blights.`,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    id: `greet_${scan.id}`,
    sender: 'advisor',
    text: `I see ${scan.crop} ${scan.disease} (${scan.confidence}% confidence). Ask me what to spray, how to stop it spreading, or whether it is safe to harvest.`,
    timestamp: new Date().toISOString(),
  };
}

export function LeafCareProvider({ children }: { children: React.ReactNode }) {
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const [pendingConfidenceOverride, setPendingConfidenceOverride] = useState<
    number | undefined
  >(undefined);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isAdvisorTyping, setIsAdvisorTyping] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<AppErrorState | null>(null);
  const [advisorContextScan, setAdvisorContextScan] = useState<ScanResult | null>(null);
  const [chatByContext, setChatByContext] = useState<Record<string, ChatMessage[]>>({});
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let active = true;
    setIsHistoryLoading(true);
    getScans()
      .then((scans) => {
        if (!active) return;
        setHistory(scans);
        if (scans.length > 0 && !currentScan) {
          setCurrentScan(scans[0]);
          setAdvisorContextScan(scans[0]);
        }
      })
      .finally(() => {
        if (active) setIsHistoryLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const contextKey = advisorContextScan ? advisorContextScan.id : 'general';
  const advisorMessages =
    chatByContext[contextKey] || [buildInitialGreeting(advisorContextScan)];

  const selectFileForPreview = useCallback((file: File) => {
    setErrorState(null);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());
    const isAllowedExt = ['jpg', 'jpeg', 'png'].includes(ext);

    if (!isAllowedMime && !isAllowedExt) {
      const err: AppErrorState = {
        type: 'unsupported_image',
        title: 'Unsupported image format',
        message:
          'Please choose a JPG, JPEG, or PNG photo of your plant leaf. Other file formats like PDF or HEIC cannot be scanned yet.',
      };
      setErrorState(err);
      return { ok: false, error: err };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const err: AppErrorState = {
        type: 'upload_failed',
        title: 'Photo file is too large',
        message:
          'Please pick an image smaller than 5 MB so it uploads quickly on mobile data.',
      };
      setErrorState(err);
      return { ok: false, error: err };
    }

    const previewUrl = URL.createObjectURL(file);
    setPendingConfidenceOverride(undefined);
    setPendingImage({
      file,
      previewUrl,
      fileName: file.name,
    });
    return { ok: true };
  }, []);

  const selectSampleForPreview = useCallback(
    (
      sampleKey: string,
      previewUrl: string,
      label: string,
      confidenceOverride?: number
    ) => {
      setErrorState(null);
      setPendingConfidenceOverride(confidenceOverride);
      setPendingImage({
        file: null,
        previewUrl,
        fileName: `${label}.jpg`,
        sampleKey,
      });
    },
    []
  );

  const clearPendingImage = useCallback(() => {
    setPendingImage((prev) => {
      if (prev?.previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return null;
    });
    setPendingConfidenceOverride(undefined);
  }, []);

  const analyzePendingImage = useCallback(async () => {
    if (!pendingImage) return null;
    setErrorState(null);

    if (!navigator.onLine) {
      setErrorState({
        type: 'no_internet',
        title: 'No internet connection',
        message:
          'You appear to be offline. Connect to mobile data or Wi-Fi to analyze your leaf photo.',
      });
      return null;
    }

    setIsAnalyzing(true);
    try {
      const result = await predictDisease(pendingImage.file, {
        sampleKey: pendingImage.sampleKey,
        previewUrl: pendingImage.previewUrl,
        fileName: pendingImage.fileName,
        confidenceOverride: pendingConfidenceOverride,
      });

      setCurrentScan(result);
      setAdvisorContextScan(result);
      setHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)].slice(0, 30));
      setPendingImage(null);
      setPendingConfidenceOverride(undefined);
      return result;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'NO_INTERNET') {
        setErrorState({
          type: 'no_internet',
          title: 'No internet connection',
          message:
            'Your phone is offline. Check your signal and tap Analyze again.',
        });
      } else if (code === 'UNSUPPORTED_IMAGE') {
        setErrorState({
          type: 'unsupported_image',
          title: 'Unsupported image format',
          message: 'Please select a clear JPG or PNG leaf photo.',
        });
      } else if (code === 'NON_LEAF') {
        setErrorState({
          type: 'non_leaf',
          title: 'No plant leaf detected',
          message:
            'We could not clearly see a plant leaf in that photo. Place one leaf on a plain background in bright daylight and try again.',
        });
      } else {
        setErrorState({
          type: 'upload_failed',
          title: 'Upload failed',
          message:
            'Something interrupted the photo check. Please try again or choose a smaller photo.',
        });
      }
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [pendingImage, pendingConfidenceOverride]);

  const openScanResult = useCallback((scan: ScanResult) => {
    setErrorState(null);
    setCurrentScan(scan);
    setAdvisorContextScan(scan);
  }, []);

  const setAdvisorContextFromScan = useCallback((scan: ScanResult | null) => {
    setAdvisorContextScan(scan);
  }, []);

  const askAdvisor = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isAdvisorTyping) return;

      const key = advisorContextScan ? advisorContextScan.id : 'general';
      const userMsg: ChatMessage = {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: new Date().toISOString(),
      };

      setChatByContext((prev) => {
        const existing = prev[key] || [buildInitialGreeting(advisorContextScan)];
        return { ...prev, [key]: [...existing, userMsg] };
      });

      setIsAdvisorTyping(true);
      try {
        const res = await sendChatMessage(trimmed, advisorContextScan);
        const advisorMsg: ChatMessage = {
          id: `adv_${Date.now()}`,
          sender: 'advisor',
          text: res.reply,
          timestamp: new Date().toISOString(),
          source: res.source,
        };
        setChatByContext((prev) => {
          const existing = prev[key] || [buildInitialGreeting(advisorContextScan)];
          return { ...prev, [key]: [...existing, advisorMsg] };
        });
      } catch {
        const errMsg: ChatMessage = {
          id: `adv_err_${Date.now()}`,
          sender: 'advisor',
          text: 'I could not reach the advisor right now because your connection dropped. Please check your internet and ask again.',
          timestamp: new Date().toISOString(),
        };
        setChatByContext((prev) => {
          const existing = prev[key] || [buildInitialGreeting(advisorContextScan)];
          return { ...prev, [key]: [...existing, errMsg] };
        });
      } finally {
        setIsAdvisorTyping(false);
      }
    },
    [advisorContextScan, isAdvisorTyping]
  );

  const removeScan = useCallback(
    (scanId: string) => {
      const updated = deleteScanFromLocalHistory(scanId);
      setHistory(updated);
      if (currentScan?.id === scanId) {
        setCurrentScan(updated[0] || null);
      }
      if (advisorContextScan?.id === scanId) {
        setAdvisorContextScan(updated[0] || null);
      }
    },
    [currentScan, advisorContextScan]
  );

  const clearAllHistory = useCallback(() => {
    const empty = clearLocalHistory();
    setHistory(empty);
    setCurrentScan(null);
    setAdvisorContextScan(null);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return (
    <LeafCareContext.Provider
      value={{
        pendingImage,
        currentScan,
        history,
        isHistoryLoading,
        isAnalyzing,
        isAdvisorTyping,
        errorState,
        advisorMessages,
        advisorContextScan,
        isOnline,
        selectFileForPreview,
        selectSampleForPreview,
        clearPendingImage,
        analyzePendingImage,
        openScanResult,
        setAdvisorContextFromScan,
        askAdvisor,
        removeScan,
        clearAllHistory,
        clearError,
        setErrorState,
      }}
    >
      {children}
    </LeafCareContext.Provider>
  );
}

export function useLeafCare() {
  const ctx = useContext(LeafCareContext);
  if (!ctx) {
    throw new Error('useLeafCare must be used inside a LeafCareProvider');
  }
  return ctx;
}
