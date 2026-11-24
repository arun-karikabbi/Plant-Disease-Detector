import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { HealthStatus } from '../types/leafcare';

interface StatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  HealthStatus,
  {
    label: string;
    containerClass: string;
    Icon: typeof CheckCircle2;
  }
> = {
  healthy: {
    label: 'Healthy',
    containerClass:
      'bg-[#E8F5E9] text-[#1B5E20] border border-[#2E7D32]/25',
    Icon: CheckCircle2,
  },
  caution: {
    label: 'Caution',
    containerClass:
      'bg-[#FFF8E1] text-[#8D5B00] border border-[#F9A825]/40',
    Icon: AlertTriangle,
  },
  urgent: {
    label: 'Urgent',
    containerClass:
      'bg-[#FFEBEE] text-[#B71C1C] border border-[#C62828]/30',
    Icon: ShieldAlert,
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { label, containerClass, Icon } = STATUS_CONFIG[status] || STATUS_CONFIG.caution;

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-1.5 rounded-lg font-semibold whitespace-nowrap shrink-0 ${containerClass} ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
    >
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5 shrink-0' : 'w-4 h-4 shrink-0'} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
