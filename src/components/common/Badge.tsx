import React from 'react';

type BadgeVariant = 'active' | 'critical' | 'stable' | 'discharged' | 'info' | 'warning' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active:     'bg-blue-100 text-blue-700 border border-blue-200',
  critical:   'bg-red-100 text-red-700 border border-red-200',
  stable:     'bg-emerald-100 text-emerald-700 border border-emerald-200',
  discharged: 'bg-slate-100 text-slate-600 border border-slate-200',
  info:       'bg-indigo-100 text-indigo-700 border border-indigo-200',
  warning:    'bg-amber-100 text-amber-700 border border-amber-200',
  default:    'bg-gray-100 text-gray-600 border border-gray-200',
};

export const getStatusVariant = (status: string): BadgeVariant => {
  const map: Record<string, BadgeVariant> = {
    Active: 'active',
    Critical: 'critical',
    Stable: 'stable',
    Discharged: 'discharged',
  };
  return map[status] ?? 'default';
};

const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
    {label}
  </span>
);

export default Badge;