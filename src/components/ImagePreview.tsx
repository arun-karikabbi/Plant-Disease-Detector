import { useState } from 'react';
import { Leaf, RotateCcw, ScanSearch } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
  isAnalyzing: boolean;
  onRetake: () => void;
  onAnalyze: () => void;
}

export function ImagePreview({
  imageUrl,
  fileName,
  isAnalyzing,
  onRetake,
  onAnalyze,
}: ImagePreviewProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E1EBE2]">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#E8F5E9]">
        {!imgError && imageUrl ? (
          <img
            src={imageUrl}
            alt={`Selected plant leaf preview: ${fileName}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isAnalyzing ? 'scale-[1.02] brightness-90' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#2E7D32] p-6 text-center">
            <Leaf className="w-12 h-12 mb-2 opacity-80" aria-hidden="true" />
            <p className="text-base font-medium">{fileName}</p>
          </div>
        )}

        {isAnalyzing && (
          <div
            className="absolute inset-0 bg-[#142216]/35 backdrop-blur-[1px] flex flex-col items-center justify-end p-5"
            role="status"
            aria-live="polite"
          >
            {/* Scanning beam */}
            <div
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#66BB6A]/55 to-[#A5D6A7]/80 border-b-2 border-[#E8F5E9] animate-leaf-scan pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 w-full bg-white/95 rounded-xl px-4 py-3 shadow-md flex items-center justify-center gap-3">
              <ScanSearch
                className="w-5 h-5 text-[#2E7D32] animate-pulse shrink-0"
                aria-hidden="true"
              />
              <span className="text-base font-semibold text-[#142216]">
                Analyzing your leaf...
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-sm text-[#4A614D]">
        <span className="truncate">{fileName}</span>
        <span className="whitespace-nowrap shrink-0">Ready to check</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onRetake}
          disabled={isAnalyzing}
          className="min-h-[48px] px-4 py-3 rounded-xl bg-[#E8F5E9] hover:bg-[#D7EED9] disabled:opacity-50 text-[#1B5E20] font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Retake</span>
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="min-h-[48px] px-4 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#246628] disabled:opacity-65 text-white font-semibold text-base inline-flex items-center justify-center gap-2 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer disabled:cursor-not-allowed"
        >
          <ScanSearch className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
        </button>
      </div>
    </div>
  );
}
