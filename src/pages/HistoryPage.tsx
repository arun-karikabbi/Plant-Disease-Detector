import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sprout, Trash2 } from 'lucide-react';
import { ScanHistoryItem } from '../components/ScanHistoryItem';
import { HistorySkeleton } from '../components/SkeletonLoaders';
import { useLeafCare } from '../context/LeafCareContext';
import type { ScanResult } from '../types/leafcare';

export function HistoryPage() {
  const navigate = useNavigate();
  const {
    history,
    isHistoryLoading,
    openScanResult,
    removeScan,
    clearAllHistory,
  } = useLeafCare();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleOpenScan = (scan: ScanResult) => {
    openScanResult(scan);
    navigate('/results');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#142216]">Scan History</h1>
          <p className="text-sm sm:text-base text-[#4A614D]">
            Tap any past scan to view its full diagnosis and care steps.
          </p>
        </div>

        {history.length > 0 && !confirmClear && (
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium text-[#4A614D] hover:text-[#C62828] hover:bg-[#FFEBEE] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62828] cursor-pointer"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {confirmClear && (
        <div
          role="alert"
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#F9A825]/50 flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-base font-medium text-[#142216]">
            Remove all saved scans from this device?
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmClear(false)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#E8F5E9] text-[#1B5E20] font-semibold text-sm cursor-pointer"
            >
              Keep
            </button>
            <button
              type="button"
              onClick={() => {
                clearAllHistory();
                setConfirmClear(false);
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#C62828] text-white font-semibold text-sm cursor-pointer"
            >
              Yes, Clear All
            </button>
          </div>
        </div>
      )}

      {isHistoryLoading ? (
        <HistorySkeleton />
      ) : history.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E1EBE2] text-center space-y-4">
          {/* Botanical Empty State Illustration */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
            <Sprout className="w-10 h-10" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-[#142216]">No scans yet</h2>
            <p className="text-base text-[#4A614D] max-w-sm mx-auto">
              Your leaf scans and advice reports will appear here so you can check back anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
          >
            <Camera className="w-5 h-5" aria-hidden="true" />
            <span>Scan Your First Leaf</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((scan) => (
            <ScanHistoryItem
              key={scan.id}
              scan={scan}
              onOpen={handleOpenScan}
              onDelete={removeScan}
            />
          ))}
        </div>
      )}
    </div>
  );
}
