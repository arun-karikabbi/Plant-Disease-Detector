import { useState } from 'react';
import { ChevronRight, Leaf, Trash2 } from 'lucide-react';
import type { ScanResult } from '../types/leafcare';
import { StatusBadge } from './StatusBadge';

interface ScanHistoryItemProps {
  scan: ScanResult;
  onOpen: (scan: ScanResult) => void;
  onDelete: (scanId: string) => void;
}

export function ScanHistoryItem({
  scan,
  onOpen,
  onDelete,
}: ScanHistoryItemProps) {
  const [imgError, setImgError] = useState(false);

  const formattedDate = new Date(scan.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#E1EBE2] flex items-center gap-3 transition-colors hover:border-[#BFD6C1]">
      <button
        type="button"
        onClick={() => onOpen(scan)}
        className="flex-1 min-w-0 flex items-center gap-3.5 text-left min-h-[56px] rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
        aria-label={`View ${scan.crop} ${scan.disease} scan from ${formattedDate}`}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#E8F5E9] shrink-0 flex items-center justify-center">
          {!imgError && scan.imageUrl ? (
            <img
              src={scan.imageUrl}
              alt={`${scan.crop} leaf`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <Leaf className="w-7 h-7 text-[#2E7D32]" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-[#142216] truncate">
              {scan.crop} · {scan.disease}
            </h3>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#4A614D]">
            <span className="tabular-nums font-medium text-[#2B3D2D]">
              {scan.confidence}% match
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{formattedDate}</span>
          </div>
          <div className="mt-2">
            <StatusBadge status={scan.status} size="sm" />
          </div>
        </div>

        <ChevronRight
          className="w-5 h-5 text-[#637866] shrink-0"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={() => onDelete(scan.id)}
        aria-label={`Delete ${scan.crop} ${scan.disease} scan`}
        className="min-w-[44px] min-h-[44px] rounded-xl text-[#637866] hover:text-[#C62828] hover:bg-[#FFEBEE] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62828] cursor-pointer shrink-0"
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
