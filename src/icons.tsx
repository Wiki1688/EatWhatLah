/**
 * src/icons.tsx
 * Every icon drawn in code with an inline SVG built from base colour in three tones:
 * base, top-left highlight (base mixed 35% toward white), and bottom-right shade (base mixed 30% toward black).
 * Plus a soft drop shadow (#2B2B2B at 15% opacity, 2 px down).
 * Every icon sits on a white circle so it stays readable on a filled tile.
 * No hex code typed here — all imported from src/theme.ts.
 */

import React, { useId } from 'react';
import { THEME_COLORS, ICON_BASE_COLORS, get3DTones } from './theme';

interface IconProps {
  size?: number;
  className?: string;
}

// Helper SVG Defs for 3D Drop Shadow
function ShadowDef({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow
        dx="0"
        dy="2"
        stdDeviation="1.5"
        floodColor={THEME_COLORS.primaryText}
        floodOpacity="0.15"
      />
    </filter>
  );
}

// 1. Noodles: Golden noodles lifted from a bowl by chopsticks (#F2B134)
export function NoodlesIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.noodles);
  const bowlTones = get3DTones(ICON_BASE_COLORS.riceBowl);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      {/* White circle background */}
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Bowl */}
        <path
          d="M13 32C13 40.5 19.7 44 28 44C36.3 44 43 40.5 43 32H13Z"
          fill={bowlTones.base}
        />
        <path
          d="M13 32C13 36 18 41 26 43C19 41 15 36 13 32Z"
          fill={bowlTones.highlight}
        />
        <path
          d="M43 32C43 36 38 41 30 43C37 41 41 36 43 32Z"
          fill={bowlTones.shade}
        />
        {/* Bowl Rim */}
        <ellipse cx="28" cy="32" rx="15" ry="3.5" fill={bowlTones.highlight} />
        <ellipse cx="28" cy="32.5" rx="14" ry="2.8" fill={tones.shade} />

        {/* Golden Noodles hanging */}
        <path
          d="M20 22C20 27 21 33 22 34"
          stroke={tones.base}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 20C24 26 25 34 26 35"
          stroke={tones.highlight}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M28 20C28 27 29 33 30 35"
          stroke={tones.base}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 21C32 26 34 32 35 34"
          stroke={tones.shade}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Chopsticks lifting noodles */}
        {/* Upper chopstick */}
        <line
          x1="13"
          y1="17"
          x2="41"
          y2="20"
          stroke={tones.shade}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="16.5"
          x2="41"
          y2="19.5"
          stroke={tones.highlight}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Lower chopstick */}
        <line
          x1="12"
          y1="21"
          x2="42"
          y2="21"
          stroke={tones.base}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 2. Rice: Rice mound in a #E8692B bowl (#F5E6C8)
export function RiceIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const riceTones = get3DTones(ICON_BASE_COLORS.rice);
  const bowlTones = get3DTones(ICON_BASE_COLORS.riceBowl);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Rice Mound */}
        <path
          d="M16 30C16 20 22 15 28 15C34 15 40 20 40 30H16Z"
          fill={riceTones.base}
        />
        {/* Highlight on top-left of mound */}
        <path
          d="M20 28C20 21 24 16 27 16C23 18 20 23 20 28Z"
          fill={riceTones.highlight}
        />
        {/* Shade on bottom-right of mound */}
        <path
          d="M36 28C36 22 33 17 29 16C34 18 36 23 36 28Z"
          fill={riceTones.shade}
        />
        {/* Rice texture grains */}
        <ellipse cx="25" cy="20" rx="1.5" ry="0.8" fill={riceTones.highlight} />
        <ellipse cx="31" cy="21" rx="1.5" ry="0.8" fill={riceTones.shade} />
        <ellipse cx="27" cy="24" rx="1.5" ry="0.8" fill={riceTones.highlight} />

        {/* Bowl */}
        <path
          d="M13 29C13 39 19 43 28 43C37 43 43 39 43 29H13Z"
          fill={bowlTones.base}
        />
        <path
          d="M13 29C13 35 18 40 26 42C19 40 15 35 13 29Z"
          fill={bowlTones.highlight}
        />
        <path
          d="M43 29C43 35 38 40 30 42C37 40 41 35 43 29Z"
          fill={bowlTones.shade}
        />
        <ellipse cx="28" cy="29" rx="15" ry="3" fill={bowlTones.highlight} />
      </g>
    </svg>
  );
}

// 3. Soup: Bowl with two pale steam curls (#E0523A)
export function SoupIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.soup);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Steam curls */}
        <path
          d="M23 20C21 17 23 15 22 12"
          stroke={tones.highlight}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 19C30 16 33 14 32 11"
          stroke={tones.highlight}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Soup Bowl */}
        <path
          d="M14 27C14 37 20 42 28 42C36 42 42 37 42 27H14Z"
          fill={tones.base}
        />
        <path
          d="M14 27C14 34 19 39 26 41C19 39 16 34 14 27Z"
          fill={tones.highlight}
        />
        <path
          d="M42 27C42 34 37 39 30 41C37 39 40 34 42 27Z"
          fill={tones.shade}
        />

        {/* Rim and Broth */}
        <ellipse cx="28" cy="27" rx="14" ry="4" fill={tones.highlight} />
        <ellipse cx="28" cy="27.5" rx="12" ry="3" fill={tones.shade} />
        {/* Little spoon resting */}
        <path
          d="M36 25L42 21"
          stroke={tones.highlight}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 4. Snacks: Three golden pieces on a plate (#C97B3A)
export function SnacksIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.snacks);
  const plateTones = get3DTones(ICON_BASE_COLORS.dietaryAny);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Plate */}
        <ellipse cx="28" cy="36" rx="18" ry="6" fill={plateTones.base} />
        <ellipse cx="28" cy="35.5" rx="16" ry="5" fill={plateTones.highlight} />
        <ellipse cx="28" cy="36.5" rx="14" ry="4" fill={plateTones.shade} />

        {/* Piece 1: Left golden piece */}
        <circle cx="22" cy="30" r="5.5" fill={tones.base} />
        <ellipse cx="21" cy="28.5" rx="3.5" ry="2" fill={tones.highlight} />
        <path d="M23 32C25 32 26 34 24 35" stroke={tones.shade} strokeWidth="1.5" />

        {/* Piece 2: Right golden piece */}
        <circle cx="34" cy="30" r="5.5" fill={tones.base} />
        <ellipse cx="33" cy="28.5" rx="3.5" ry="2" fill={tones.highlight} />
        <path d="M35 32C37 32 38 34 36 35" stroke={tones.shade} strokeWidth="1.5" />

        {/* Piece 3: Center golden piece sitting higher */}
        <circle cx="28" cy="24" r="6.5" fill={tones.base} />
        <ellipse cx="26.5" cy="22" rx="4" ry="2.5" fill={tones.highlight} />
        <path
          d="M27 27C30 27 32 29 30 30"
          stroke={tones.shade}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 5. Kopi & Teh: Traditional cup and saucer (#8B5A2B)
export function KopiTehIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.kopiTeh);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Saucer */}
        <ellipse cx="28" cy="40" rx="16" ry="4" fill={tones.base} />
        <ellipse cx="28" cy="39.5" rx="14" ry="3" fill={tones.highlight} />
        <ellipse cx="28" cy="40.5" rx="12" ry="2" fill={tones.shade} />

        {/* Cup body */}
        <path
          d="M17 25C17 35 22 38 28 38C34 38 39 35 39 25H17Z"
          fill={tones.base}
        />
        <path
          d="M17 25C17 32 20 36 26 37C20 36 18 32 17 25Z"
          fill={tones.highlight}
        />
        <path
          d="M39 25C39 32 36 36 30 37C36 36 38 32 39 25Z"
          fill={tones.shade}
        />

        {/* Cup rim & liquid */}
        <ellipse cx="28" cy="25" rx="11" ry="3.5" fill={tones.highlight} />
        <ellipse cx="28" cy="25.5" rx="9" ry="2.5" fill={tones.shade} />

        {/* Handle */}
        <path
          d="M38 27C42 27 44 33 37 35"
          stroke={tones.base}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M38 27.5C41 27.5 42.5 31.5 37.5 34"
          stroke={tones.highlight}
          strokeWidth="1"
          fill="none"
        />

        {/* Gentle steam wisps */}
        <path
          d="M26 19C25 16 27 15 26 13"
          stroke={tones.highlight}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 6. Bubble Tea: Tall cup, wide straw, pearls at the bottom (#B98AD9)
export function BubbleTeaIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.bubbleTea);
  const strawTones = get3DTones(ICON_BASE_COLORS.noodles);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Wide diagonal straw */}
        <line
          x1="32"
          y1="9"
          x2="25"
          y2="38"
          stroke={strawTones.shade}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="31.5"
          y1="9"
          x2="24.5"
          y2="38"
          stroke={strawTones.highlight}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Tall Cup */}
        <path
          d="M19 19L22 43C22.2 44.5 24 45 28 45C32 45 33.8 44.5 34 43L37 19H19Z"
          fill={tones.base}
        />
        <path
          d="M19 19L22 43C22 43.5 24 44 26 44.5L24 19H19Z"
          fill={tones.highlight}
        />
        <path
          d="M37 19L34 43C34 43.5 32 44 30 44.5L32 19H37Z"
          fill={tones.shade}
        />

        {/* Cup domed lid */}
        <ellipse cx="28" cy="19" rx="9" ry="2.5" fill={tones.highlight} />

        {/* Tapioca pearls at the bottom */}
        <circle cx="25" cy="41" r="1.8" fill={tones.shade} />
        <circle cx="28" cy="42" r="1.8" fill={tones.shade} />
        <circle cx="31" cy="41" r="1.8" fill={tones.shade} />
        <circle cx="26.5" cy="38.5" r="1.8" fill={tones.shade} />
        <circle cx="29.5" cy="38.5" r="1.8" fill={tones.shade} />
      </g>
    </svg>
  );
}

// 7. Surprise Me: Closed gift box with a question mark on the lid (#F06292)
export function SurpriseMeIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.surpriseMe);
  const ribbonTones = get3DTones(ICON_BASE_COLORS.rice);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Box base */}
        <rect
          x="16"
          y="27"
          width="24"
          height="16"
          rx="2"
          fill={tones.base}
        />
        {/* Box base left highlight */}
        <rect
          x="16"
          y="27"
          width="5"
          height="16"
          rx="1"
          fill={tones.highlight}
        />
        {/* Box base right shade */}
        <rect
          x="35"
          y="27"
          width="5"
          height="16"
          rx="1"
          fill={tones.shade}
        />

        {/* Box vertical ribbon */}
        <rect x="26.5" y="27" width="3" height="16" fill={ribbonTones.base} />

        {/* Box Lid */}
        <rect
          x="14"
          y="20"
          width="28"
          height="7"
          rx="2"
          fill={tones.highlight}
        />
        <rect
          x="36"
          y="20"
          width="6"
          height="7"
          rx="1"
          fill={tones.shade}
        />
        {/* Lid ribbon */}
        <rect x="26.5" y="20" width="3" height="7" fill={ribbonTones.highlight} />

        {/* Question mark on lid */}
        <path
          d="M26 14C26 12.3 27 11 28.5 11C30 11 31 12 31 13C31 14.5 29 15 28.5 16.5V17"
          stroke={tones.shade}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="28.5" cy="19" r="1.2" fill={tones.shade} />
      </g>
    </svg>
  );
}

// 8. Budget Any: Open hand (#A0A0A0)
export function BudgetAnyIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.budgetAny);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Open welcoming hand */}
        <path
          d="M14 36C18 36 21 34 26 31C29 30 33 29 37 29C40 29 42 30 42 32C42 34 38 36 34 38C28 41 22 43 14 41V36Z"
          fill={tones.base}
        />
        {/* Fingers extending upwards softly */}
        <path
          d="M26 31L34 22C35 21 37 21 38 23C39 25 38 27 36 29"
          stroke={tones.highlight}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M29 30L38 24C39 23 41 24 41 25.5C41 27 39 28.5 37 29.5"
          stroke={tones.base}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M21 33C17 33 15 36 15 39"
          stroke={tones.shade}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 9. Budget Under $5: One coin (#7DBE5A)
export function BudgetUnder5Icon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.budgetUnder5);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Coin edge/depth */}
        <circle cx="28" cy="29" r="14" fill={tones.shade} />
        {/* Coin front surface */}
        <circle cx="28" cy="27" r="14" fill={tones.base} />
        {/* Top-left rim highlight */}
        <circle cx="28" cy="27" r="12" fill={tones.highlight} />
        <circle cx="28" cy="27" r="11" fill={tones.base} />

        {/* Currency symbol '$' */}
        <path
          d="M28 20V34M31 23C31 21.5 29.5 21.5 28 21.5C26 21.5 25 22.5 25 24C25 26.5 31 26.5 31 29C31 30.5 30 31.5 28 31.5C26 31.5 25 30.5 25 29"
          stroke={tones.highlight}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// 10. Budget $5–$12: Two coins (#5A9E4B)
export function Budget5to12Icon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.budget5to12);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Back Coin */}
        <circle cx="23" cy="25" r="11" fill={tones.shade} />
        <circle cx="23" cy="23" r="11" fill={tones.highlight} />
        <circle cx="23" cy="23" r="9" fill={tones.base} />

        {/* Front Coin */}
        <circle cx="33" cy="33" r="12" fill={tones.shade} />
        <circle cx="33" cy="31" r="12" fill={tones.base} />
        <circle cx="33" cy="31" r="10" fill={tones.highlight} />
        <circle cx="33" cy="31" r="9" fill={tones.base} />

        {/* Currency mark on front coin */}
        <path
          d="M33 26V36M35 28C35 27 34 27 33 27C31.5 27 31 27.5 31 28.5C31 30.5 35 30.5 35 32.5C35 33.5 34.5 34 33 34C31.5 34 31 33.5 31 32"
          stroke={tones.highlight}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 11. Budget Above $12: Three coins (#3E7C3A)
export function BudgetAbove12Icon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.budgetAbove12);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Coin 1: Top Left */}
        <circle cx="22" cy="21" r="9" fill={tones.shade} />
        <circle cx="22" cy="20" r="9" fill={tones.base} />
        <circle cx="22" cy="20" r="7.5" fill={tones.highlight} />

        {/* Coin 2: Top Right */}
        <circle cx="34" cy="24" r="9.5" fill={tones.shade} />
        <circle cx="34" cy="23" r="9.5" fill={tones.base} />
        <circle cx="34" cy="23" r="8" fill={tones.highlight} />

        {/* Coin 3: Bottom Center */}
        <circle cx="28" cy="35" r="11" fill={tones.shade} />
        <circle cx="28" cy="33" r="11" fill={tones.base} />
        <circle cx="28" cy="33" r="9" fill={tones.highlight} />
        <circle cx="28" cy="33" r="8" fill={tones.base} />

        {/* Coin 3 Currency Mark */}
        <path
          d="M28 29V37M30 30.5C30 29.8 29 29.8 28 29.8C27 29.8 26.5 30.2 26.5 31C26.5 32.5 30 32.5 30 34C30 34.8 29.5 35.2 28 35.2C27 35.2 26.5 34.8 26.5 33.8"
          stroke={tones.highlight}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 12. Dietary Any: Open plate (#9B8EC4)
export function DietaryAnyIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.dietaryAny);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Outer plate rim */}
        <circle cx="28" cy="29" r="15" fill={tones.shade} />
        <circle cx="28" cy="28" r="15" fill={tones.base} />
        {/* Highlight inner ridge */}
        <circle cx="28" cy="28" r="12" fill={tones.highlight} />
        {/* Center plate well */}
        <circle cx="28" cy="28" r="10" fill={tones.base} />
        {/* Subtle center gleam */}
        <ellipse cx="25" cy="25" rx="4" ry="2" fill={tones.highlight} />
      </g>
    </svg>
  );
}

// 13. Halal: Crescent on a plate (#2F9E8F)
export function HalalIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.halal);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Plate base */}
        <circle cx="28" cy="29" r="15" fill={tones.shade} />
        <circle cx="28" cy="28" r="15" fill={tones.base} />
        <circle cx="28" cy="28" r="13" fill={tones.highlight} />
        <circle cx="28" cy="28" r="11" fill={tones.base} />

        {/* Crescent moon inside */}
        <path
          d="M29 20C24.5 20 21 23.5 21 28C21 32.5 24.5 36 29 36C27 34.5 25.5 31.5 25.5 28C25.5 24.5 27 21.5 29 20Z"
          fill={tones.highlight}
        />
        {/* Small star next to crescent */}
        <path
          d="M32 24L32.7 25.5L34.2 25.7L33.1 26.8L33.4 28.3L32 27.5L30.6 28.3L30.9 26.8L29.8 25.7L31.3 25.5L32 24Z"
          fill={tones.highlight}
        />
      </g>
    </svg>
  );
}

// 14. Vegetarian: Leaf (#58B368)
export function VegetarianIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.vegetarian);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Main curved leaf */}
        <path
          d="M17 39C17 39 19 28 27 20C35 12 41 14 41 14C41 14 42 21 34 29C26 37 17 39 17 39Z"
          fill={tones.base}
        />
        {/* Upper leaf highlight half */}
        <path
          d="M17 39C19 31 25 21 41 14C35 14 27 21 21 30C18 34 17 39 17 39Z"
          fill={tones.highlight}
        />
        {/* Lower leaf shade half */}
        <path
          d="M17 39C26 37 34 29 41 14C38 22 32 30 23 36C20 38 17 39 17 39Z"
          fill={tones.shade}
        />
        {/* Center vein */}
        <path
          d="M17 39C23 33 31 23 41 14"
          stroke={tones.highlight}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 15. No nuts: Peanut with a slash (#A8653A)
export function NoNutsIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.noNuts);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Peanut bottom lobe */}
        <circle cx="25" cy="33" r="8" fill={tones.shade} />
        <circle cx="25" cy="32" r="7.5" fill={tones.base} />
        {/* Peanut top lobe */}
        <circle cx="31" cy="22" r="7.5" fill={tones.highlight} />
        <circle cx="31" cy="22.5" r="7" fill={tones.base} />
        {/* Peanut waist connection */}
        <ellipse cx="28" cy="27" rx="6" ry="7" fill={tones.base} />

        {/* Diagonal prohibition slash */}
        <line
          x1="16"
          y1="16"
          x2="40"
          y2="40"
          stroke={tones.shade}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="15.5"
          x2="40"
          y2="39.5"
          stroke={tones.highlight}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 16. Wait Any: Clock, full face filled (#3567A8)
export function WaitAnyIcon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.waitAny);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Clock edge & depth */}
        <circle cx="28" cy="29" r="15" fill={tones.shade} />
        {/* Clock full face filled */}
        <circle cx="28" cy="28" r="15" fill={tones.base} />
        {/* Inner rim highlight */}
        <circle cx="28" cy="28" r="13" stroke={tones.highlight} strokeWidth="1.5" />

        {/* Hands */}
        <line
          x1="28"
          y1="28"
          x2="28"
          y2="19"
          stroke={tones.highlight}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="28"
          x2="35"
          y2="28"
          stroke={tones.highlight}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="2.2" fill={tones.highlight} />
      </g>
    </svg>
  );
}

// 17. Wait Under 10 min: Clock, quarter face filled (#6BB7E8)
export function WaitUnder10Icon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.waitUnder10);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Clock rim */}
        <circle cx="28" cy="29" r="15" fill={tones.shade} />
        <circle cx="28" cy="28" r="15" fill={tones.highlight} />
        <circle cx="28" cy="28" r="13.5" fill={THEME_COLORS.cardSurface} />

        {/* Quarter face filled (12 to 3) */}
        <path
          d="M28 28V14.5A13.5 13.5 0 0 1 41.5 28H28Z"
          fill={tones.base}
        />

        {/* Clock Hands marking 12 and 3 */}
        <line
          x1="28"
          y1="28"
          x2="28"
          y2="16"
          stroke={tones.shade}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="28"
          x2="39"
          y2="28"
          stroke={tones.shade}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="2" fill={tones.shade} />
      </g>
    </svg>
  );
}

// 18. Wait Up to 20 min: Clock, half face filled (#4B8FD1)
export function WaitUpTo20Icon({ size = 56, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.waitUpTo20);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />

      <g filter={`url(#${filterId})`}>
        {/* Clock rim */}
        <circle cx="28" cy="29" r="15" fill={tones.shade} />
        <circle cx="28" cy="28" r="15" fill={tones.highlight} />
        <circle cx="28" cy="28" r="13.5" fill={THEME_COLORS.cardSurface} />

        {/* Half face filled (12 to 6) */}
        <path
          d="M28 28V14.5A13.5 13.5 0 0 1 28 41.5V28Z"
          fill={tones.base}
        />

        {/* Clock hands marking 12 and 6 */}
        <line
          x1="28"
          y1="28"
          x2="28"
          y2="16"
          stroke={tones.shade}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="28"
          x2="28"
          y2="38"
          stroke={tones.shade}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="2" fill={tones.shade} />
      </g>
    </svg>
  );
}

// 19. Card mark: Spicy Chilli (#D9482B) — card mark only, never a tile
export function SpicyMarkIcon({ size = 20, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.spicy);
  const stemTones = get3DTones(ICON_BASE_COLORS.vegetarian);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Spicy dish"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* Chilli body */}
        <path
          d="M6 18C8 19 13 18 16 14C19 10 18 6 18 6C18 6 14 7 10 11C7 14 5 17 6 18Z"
          fill={tones.base}
        />
        {/* Highlight ridge on top of chilli */}
        <path
          d="M8 16C10 14 13 10 17 7C16 8 13 11 10 14C9 15 8 16 8 16Z"
          fill={tones.highlight}
        />
        {/* Shaded lower belly */}
        <path
          d="M6 18C7 18.5 10 18 13 16C10 17 7 17.5 6 18Z"
          fill={tones.shade}
        />
        {/* Stem */}
        <path
          d="M18 6C19 4 21 3 21 3"
          stroke={stemTones.base}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// 20. Empty state sticky bar icon: Plate with question mark drawn in code
export function EmptyPlateQuestionIcon({ size = 28, className }: IconProps) {
  const filterId = useId();
  const tones = get3DTones(ICON_BASE_COLORS.emptyQuestion);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <ShadowDef id={filterId} />
      </defs>
      <circle cx="28" cy="28" r="26" fill={THEME_COLORS.cardSurface} />
      <g filter={`url(#${filterId})`}>
        <circle cx="28" cy="28" r="16" fill={tones.highlight} />
        <circle cx="28" cy="28" r="13" fill={THEME_COLORS.cardSurface} />
        <path
          d="M25 22C25 20.3 26.3 19 28 19C29.7 19 31 20.3 31 22C31 23.5 29.5 24.5 28.5 26V27"
          stroke={tones.base}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="28.5" cy="31" r="1.5" fill={tones.base} />
      </g>
    </svg>
  );
}

// Helper to render an icon for a given category and filter value
export function renderFilterIcon(category: 'craving' | 'budget' | 'dietary' | 'wait', value: string, size: number = 56) {
  switch (category) {
    case 'craving':
      switch (value) {
        case 'Noodles':
          return <NoodlesIcon size={size} />;
        case 'Rice':
          return <RiceIcon size={size} />;
        case 'Soup':
          return <SoupIcon size={size} />;
        case 'Snacks':
          return <SnacksIcon size={size} />;
        case 'Kopi & Teh':
          return <KopiTehIcon size={size} />;
        case 'Bubble Tea':
          return <BubbleTeaIcon size={size} />;
        case 'Surprise me':
          return <SurpriseMeIcon size={size} />;
        default:
          return <SurpriseMeIcon size={size} />;
      }
    case 'budget':
      switch (value) {
        case 'Any':
          return <BudgetAnyIcon size={size} />;
        case 'Under $5':
          return <BudgetUnder5Icon size={size} />;
        case '$5–$12':
          return <Budget5to12Icon size={size} />;
        case 'Above $12':
          return <BudgetAbove12Icon size={size} />;
        default:
          return <BudgetAnyIcon size={size} />;
      }
    case 'dietary':
      switch (value) {
        case 'Any':
          return <DietaryAnyIcon size={size} />;
        case 'Halal':
          return <HalalIcon size={size} />;
        case 'Vegetarian':
          return <VegetarianIcon size={size} />;
        case 'No nuts':
          return <NoNutsIcon size={size} />;
        default:
          return <DietaryAnyIcon size={size} />;
      }
    case 'wait':
      switch (value) {
        case 'Any':
          return <WaitAnyIcon size={size} />;
        case 'Under 10 min':
          return <WaitUnder10Icon size={size} />;
        case 'Up to 20 min':
          return <WaitUpTo20Icon size={size} />;
        default:
          return <WaitAnyIcon size={size} />;
      }
  }
}

/**
 * App Logo: A vibrant, appetizing hawker noodle bowl icon with chopsticks,
 * steam swirls, and sparkling highlights on a warm brand gradient squircle.
 */
export function AppLogo({ size = 52, className }: IconProps) {
  const filterId = useId();
  const gradId = useId();
  const glossId = useId();
  const steamId = useId();
  const noodleId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Soft warm ambient shadow */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#E8692B"
            floodOpacity="0.32"
          />
        </filter>

        {/* Brand Vermilion / Terracotta Gradient */}
        <linearGradient id={gradId} x1="6" y1="6" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7E36" />
          <stop offset="55%" stopColor="#E8692B" />
          <stop offset="100%" stopColor="#C24E18" />
        </linearGradient>

        {/* Specular Radial Glow */}
        <radialGradient id={glossId} cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Steam Gradient */}
        <linearGradient id={steamId} x1="0" y1="20" x2="0" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>

        {/* Noodle Strand Gradient */}
        <linearGradient id={noodleId} x1="20" y1="16" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE58F" />
          <stop offset="60%" stopColor="#F2B134" />
          <stop offset="100%" stopColor="#D48806" />
        </linearGradient>
      </defs>

      {/* Main Squircle Container with drop shadow */}
      <g filter={`url(#${filterId})`}>
        <rect x="3" y="3" width="50" height="50" rx="15" fill={`url(#${gradId})`} />
        {/* Specular Gloss Overlay */}
        <rect x="3" y="3" width="50" height="50" rx="15" fill={`url(#${glossId})`} />
        {/* Polished Inner Rim */}
        <rect
          x="3.75"
          y="3.75"
          width="48.5"
          height="48.5"
          rx="14.25"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
      </g>

      {/* Steam rising */}
      <path
        d="M21 21C20 18 22 15 21 12C20.5 10.5 21 9 22 8"
        stroke={`url(#${steamId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 20C27 16 29.5 13 28 10C27 8 28 6.5 29 6"
        stroke={`url(#${steamId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M34 22C33 19 35 16 34.5 13C34 11.5 34.5 10 35.5 9"
        stroke={`url(#${steamId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Chopsticks lifting noodles */}
      {/* Back chopstick */}
      <path
        d="M17 19.5L46 12"
        stroke="#4A2511"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Lifted noodle loops over chopsticks */}
      <path
        d="M22 30C21.5 24 23 19.5 26 19.5C28.5 19.5 29 23 29.5 30"
        stroke={`url(#${noodleId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M25 31C24.5 25 26 18.5 29 18.5C31.5 18.5 32 23 32.5 31"
        stroke={`url(#${noodleId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Front chopstick */}
      <path
        d="M16 21L45 14"
        stroke="#6E3719"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Chopstick Gold Band Accent */}
      <path
        d="M40.5 15.2L42.5 14.7"
        stroke="#FFD54F"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Ceramic Hawker Bowl Body */}
      {/* Bowl drop shadow */}
      <ellipse cx="28" cy="42" rx="14" ry="2.5" fill="#000000" fillOpacity="0.18" />

      {/* Bowl Outer Shell */}
      <path
        d="M12 29C12 38.5 19 43 28 43C37 43 44 38.5 44 29H12Z"
        fill="#FFFFFF"
      />
      {/* Bowl 3D side shade */}
      <path
        d="M44 29C44 34.5 39.5 40 31 42.4C38.5 40.5 42.5 35.5 44 29Z"
        fill="#E8E2D9"
      />
      {/* Bowl Rim */}
      <ellipse cx="28" cy="29" rx="16" ry="4" fill="#FFFFFF" />
      {/* Broth / Soup surface */}
      <ellipse cx="28" cy="29.5" rx="14.5" ry="3.2" fill="#E65100" />
      {/* Broth simmer highlight */}
      <ellipse cx="26" cy="29.2" rx="10" ry="1.8" fill="#FF7043" />

      {/* Noodles in broth */}
      <path
        d="M18 29.5C21 31 24 28.5 27 30C30 31.5 34 29 38 30"
        stroke={`url(#${noodleId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Sparkling 4-point magic twinkle at top-right */}
      <g transform="translate(44, 9)">
        <path
          d="M0 -5C0 -2 2 0 5 0C2 0 0 2 0 5C0 2 -2 0 -5 0C-2 0 0 -2 0 -5Z"
          fill="#FFE082"
        />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>
      {/* Smaller twinkle at top-left */}
      <g transform="translate(10, 15) scale(0.65)">
        <path
          d="M0 -4C0 -1.5 1.5 0 4 0C1.5 0 0 1.5 0 4C0 1.5 -1.5 0 -4 0C-1.5 0 0 -1.5 0 -4Z"
          fill="#FFF3C4"
        />
        <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
