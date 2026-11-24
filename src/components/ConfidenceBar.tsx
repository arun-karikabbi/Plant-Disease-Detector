import type { HealthStatus } from '../types/leafcare';

interface ConfidenceBarProps {
  confidence: number;
  status?: HealthStatus;
  label?: string;
}

export function ConfidenceBar({
  confidence,
  status = 'healthy',
  label = 'Match confidence',
}: ConfidenceBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(confidence)));

  const fillColor =
    clamped < 60
      ? 'bg-[#F9A825]'
      : status === 'urgent'
        ? 'bg-[#C62828]'
        : status === 'caution'
          ? 'bg-[#F9A825]'
          : 'bg-[#2E7D32]';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-sm font-medium text-[#374B39]">{label}</span>
        <span className="text-base font-bold text-[#142216] tabular-nums">
          {clamped}%
        </span>
      </div>
      <div
        className="w-full h-3 bg-[#E6EFE7] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clamped} percent`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
