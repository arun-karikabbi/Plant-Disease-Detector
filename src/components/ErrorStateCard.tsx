import {
  AlertCircle,
  FileWarning,
  Leaf,
  RefreshCw,
  WifiOff,
} from 'lucide-react';
import type { AppErrorState } from '../types/leafcare';

interface ErrorStateCardProps {
  error: AppErrorState;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
}

const ERROR_ICONS = {
  no_internet: WifiOff,
  upload_failed: AlertCircle,
  unsupported_image: FileWarning,
  non_leaf: Leaf,
};

export function ErrorStateCard({
  error,
  onRetry,
  onDismiss,
  retryLabel = 'Try Again',
}: ErrorStateCardProps) {
  const Icon = ERROR_ICONS[error.type] || AlertCircle;
  const isUrgent = error.type === 'no_internet' || error.type === 'upload_failed';

  return (
    <div
      role="alert"
      className="bg-white rounded-2xl p-5 shadow-sm border border-[#DCE6DD]"
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isUrgent
              ? 'bg-[#FFEBEE] text-[#C62828]'
              : 'bg-[#FFF8E1] text-[#8D5B00]'
          }`}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#142216]">
            {error.title}
          </h3>
          <p className="mt-1 text-base text-[#374B39] leading-relaxed">
            {error.message}
          </p>

          {error.type === 'non_leaf' && (
            <ul className="mt-3 space-y-1 text-sm text-[#4A614D]">
              <li>• Hold the camera close to one single leaf</li>
              <li>• Stand in bright daylight without heavy shadows</li>
              <li>• Use a plain ground or paper behind the leaf</li>
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>{retryLabel}</span>
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#E8F5E9] hover:bg-[#D7EED9] text-[#1B5E20] font-semibold text-base inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] cursor-pointer"
          >
            Choose Another Photo
          </button>
        )}
      </div>
    </div>
  );
}
