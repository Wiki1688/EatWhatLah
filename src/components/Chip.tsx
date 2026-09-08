/**
 * src/components/Chip.tsx
 * Compact pill/chip component with 999px rounded corners and 48px minimum touch target.
 * Uses only colors from src/theme.ts.
 */

import React from 'react';
import { THEME_COLORS } from '../theme';

interface ChipProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export function Chip({
  id,
  label,
  icon,
  isSelected = false,
  onClick,
  ariaLabel,
  className = '',
}: ChipProps) {
  return (
    <button
      key={id}
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={ariaLabel || label}
      style={{
        backgroundColor: isSelected ? THEME_COLORS.brand : THEME_COLORS.cardSurface,
        color: isSelected ? THEME_COLORS.cardSurface : THEME_COLORS.primaryText,
        borderColor: isSelected ? THEME_COLORS.brand : THEME_COLORS.border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 999,
        transition: 'all 150ms ease-out',
        minHeight: 48,
        minWidth: 48,
      }}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer active:scale-95 select-none ${className}`}
    >
      {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
      <span className="leading-tight">{label}</span>
    </button>
  );
}
