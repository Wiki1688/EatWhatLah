/**
 * src/components/Tile.tsx
 * Large tappable filter tile with 3D icon, white circle background, label,
 * 16px rounded corners, and 150ms press scale (0.97).
 * Uses only colors from src/theme.ts.
 */

import React, { useState } from 'react';
import { THEME_COLORS } from '../theme';

interface TileProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

export function Tile({
  id,
  label,
  icon,
  isSelected,
  onClick,
  ariaLabel,
  className = '',
}: TileProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Background color determination
  const getBackgroundColor = () => {
    if (isSelected) return THEME_COLORS.brand;
    if (isHovered) return THEME_COLORS.brandLight;
    return THEME_COLORS.cardSurface;
  };

  return (
    <button
      key={id}
      id={id}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isSelected}
      aria-label={ariaLabel || label}
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: isSelected ? THEME_COLORS.brand : THEME_COLORS.border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 16,
        color: isSelected ? THEME_COLORS.cardSurface : THEME_COLORS.primaryText,
        transition: 'all 150ms ease-out',
        minHeight: 104,
        boxShadow: isSelected ? 'none' : '0 2px 6px rgba(43, 43, 43, 0.04)',
      }}
      className={`flex flex-col items-center justify-center p-3 text-center cursor-pointer active:scale-97 select-none w-full ${className}`}
    >
      <div className="mb-2 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span
        style={{
          color: isSelected ? THEME_COLORS.cardSurface : THEME_COLORS.primaryText,
          fontSize: 14,
          lineHeight: 1.3,
        }}
        className="font-medium tracking-tight line-clamp-2 px-1"
      >
        {label}
      </span>
    </button>
  );
}
