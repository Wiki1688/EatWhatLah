/**
 * src/theme.ts
 * Every colour used in EatWhatLah?
 * No hex code should ever be typed inside a component.
 */

// Interface colours — exact specification palette
export const THEME_COLORS = {
  background: '#FAF7F2',
  cardSurface: '#FFFFFF',
  border: '#E8E2D9',
  primaryText: '#2B2B2B',
  secondaryText: '#6F6A63',
  brand: '#E8692B',
  brandDark: '#C9501A',
  brandLight: '#FDEBDD',
  success: '#2E9E5B',
  caution: '#E3A008',
  stop: '#D64545',
} as const;

// 3D icon base colours — exact specification
export const ICON_BASE_COLORS = {
  // Craving
  noodles: '#F2B134',
  rice: '#F5E6C8',
  riceBowl: '#E8692B',
  soup: '#E0523A',
  snacks: '#C97B3A',
  kopiTeh: '#8B5A2B',
  bubbleTea: '#B98AD9',
  surpriseMe: '#F06292',

  // Budget
  budgetAny: '#A0A0A0',
  budgetUnder5: '#7DBE5A',
  budget5to12: '#5A9E4B',
  budgetAbove12: '#3E7C3A',

  // Dietary
  dietaryAny: '#9B8EC4',
  halal: '#2F9E8F',
  vegetarian: '#58B368',
  noNuts: '#A8653A',

  // Wait
  waitAny: '#3567A8',
  waitUnder10: '#6BB7E8',
  waitUpTo20: '#4B8FD1',

  // Card Marks
  spicy: '#D9482B',

  // Empty state icon
  emptyQuestion: '#6F6A63',
} as const;

// Utility to mix color towards white (highlight) and black (shade)
// Base mixed 35% toward white: channel * 0.65 + 255 * 0.35
// Base mixed 30% toward black: channel * 0.70
export function get3DTones(hex: string): { base: string; highlight: string; shade: string } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const rHigh = Math.min(255, Math.max(0, Math.round(r * 0.65 + 255 * 0.35)));
  const gHigh = Math.min(255, Math.max(0, Math.round(g * 0.65 + 255 * 0.35)));
  const bHigh = Math.min(255, Math.max(0, Math.round(b * 0.65 + 255 * 0.35)));

  const rShade = Math.min(255, Math.max(0, Math.round(r * 0.70)));
  const gShade = Math.min(255, Math.max(0, Math.round(g * 0.70)));
  const bShade = Math.min(255, Math.max(0, Math.round(b * 0.70)));

  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  return {
    base: hex,
    highlight: `#${toHex(rHigh)}${toHex(gHigh)}${toHex(bHigh)}`,
    shade: `#${toHex(rShade)}${toHex(gShade)}${toHex(bShade)}`,
  };
}

// Shadows
export const THEME_SHADOWS = {
  card: '0 2px 8px rgba(43, 43, 43, 0.06)',
  iconDrop: 'drop-shadow(0px 2px 2px rgba(43, 43, 43, 0.15))',
} as const;
