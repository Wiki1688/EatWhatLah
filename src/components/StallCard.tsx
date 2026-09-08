/**
 * src/components/StallCard.tsx
 * Card and compact row displays for Top Picks and Alternatives.
 * Includes rank ribbon (1, 2, 3), unit number (44px bold under "Walk to"),
 * crowd level & wait badges, craving & dietary icons (28px), spicy chilli mark,
 * "What it is" and "How to order it" (shown only in "I'm new here" mode),
 * and sold-out states.
 * All colors from src/theme.ts, all copy from src/copy.ts.
 */

import React from 'react';
import { Stall } from '../data/venues';
import { THEME_COLORS, THEME_SHADOWS } from '../theme';
import { COPY } from '../copy';
import { renderFilterIcon, SpicyMarkIcon } from '../icons';

interface StallCardProps {
  id: string;
  stall: Stall;
  rank?: 1 | 2 | 3;
  mode: 'new' | 'know';
  onChangeMind?: () => void;
  variant?: 'pick' | 'alternative';
}

export function StallCard({
  id,
  stall,
  rank,
  mode,
  onChangeMind,
  variant = 'pick',
}: StallCardProps) {
  const isPick1 = rank === 1;
  const isSoldOut = stall.isSoldOut;

  // Crowd level styling
  const getCrowdStyle = () => {
    switch (stall.crowdLevel) {
      case 'Low':
        return { color: THEME_COLORS.success, bg: '#EAF7EE' };
      case 'Medium':
        return { color: THEME_COLORS.caution, bg: '#FDF7E7' };
      case 'High':
        return { color: THEME_COLORS.stop, bg: '#FCEBEB' };
    }
  };

  // Wait minutes styling (under 10 min: Success, 10-20 min: Caution)
  const getWaitStyle = () => {
    if (stall.waitMinutes < 10) {
      return { color: THEME_COLORS.success };
    }
    return { color: THEME_COLORS.caution };
  };

  // Rank ribbon styling
  const getRibbonStyle = () => {
    if (rank === 1) {
      return {
        bg: THEME_COLORS.brand,
        color: THEME_COLORS.cardSurface,
        label: '#1 Top Pick',
      };
    }
    if (rank === 2) {
      return {
        bg: THEME_COLORS.brandDark,
        color: THEME_COLORS.cardSurface,
        label: '#2 Pick',
      };
    }
    return {
      bg: THEME_COLORS.brandLight,
      color: THEME_COLORS.primaryText,
      label: '#3 Pick',
    };
  };

  const crowdStyle = getCrowdStyle();
  const waitStyle = getWaitStyle();

  // Pick matched dietary icon (first tag that is Halal, Vegetarian, or No nuts)
  const matchedDietaryTag = stall.dietaryTags[0] || 'Any';

  // Compact Alternative Row
  if (variant === 'alternative') {
    return (
      <div
        id={id}
        style={{
          backgroundColor: isSoldOut ? THEME_COLORS.border : THEME_COLORS.cardSurface,
          borderColor: THEME_COLORS.border,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 16,
          boxShadow: THEME_SHADOWS.card,
          opacity: isSoldOut ? 0.75 : 1,
        }}
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full"
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            {renderFilterIcon('craving', stall.craving, 28)}
            {renderFilterIcon('dietary', matchedDietaryTag, 28)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                style={{ color: THEME_COLORS.primaryText }}
                className="font-bold text-base leading-tight truncate"
              >
                {stall.name}
              </h4>
              <span
                style={{ color: THEME_COLORS.secondaryText }}
                className="text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-black/5"
              >
                {stall.unit}
              </span>
              {stall.isSpicy && <SpicyMarkIcon size={18} />}
              {isSoldOut && (
                <span
                  style={{
                    backgroundColor: THEME_COLORS.stop,
                    color: THEME_COLORS.cardSurface,
                  }}
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                >
                  {COPY.soldOutLabel}
                </span>
              )}
            </div>

            <p
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-sm mt-0.5 truncate"
            >
              {stall.dish}
            </p>

            {mode === 'new' && !isSoldOut && (
              <div className="mt-2 text-xs space-y-1">
                <p
                  style={{ color: THEME_COLORS.primaryText }}
                  className="whitespace-pre-line leading-relaxed"
                >
                  {stall.whatItIs}
                </p>
                <p
                  style={{ color: THEME_COLORS.brandDark }}
                  className="font-medium italic"
                >
                  {stall.howToOrderIt}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5">
          <div className="flex items-center gap-3">
            <span
              style={{ color: THEME_COLORS.primaryText }}
              className="font-bold text-base tabular-nums"
            >
              ${stall.price.toFixed(2)}
            </span>
            <span
              style={{ color: waitStyle.color }}
              className="text-xs font-semibold tabular-nums"
            >
              ~{stall.waitMinutes} min
            </span>
            <span
              style={{ color: crowdStyle.color }}
              className="text-xs font-medium"
            >
              {COPY.crowdLevelLabels[stall.crowdLevel]}
            </span>
          </div>

          <span
            style={{
              color: THEME_COLORS.brand,
              fontSize: 18,
              fontWeight: 700,
            }}
            className="font-mono tabular-nums"
          >
            {stall.unit}
          </span>
        </div>
      </div>
    );
  }

  // Regular Pick Card (Rank 1, 2, or 3)
  const ribbon = rank ? getRibbonStyle() : null;

  return (
    <article
      id={id}
      style={{
        backgroundColor: isSoldOut ? THEME_COLORS.border : THEME_COLORS.cardSurface,
        borderColor: isPick1 ? THEME_COLORS.brand : THEME_COLORS.border,
        borderWidth: isPick1 ? 2 : 1,
        borderStyle: 'solid',
        borderRadius: 16,
        boxShadow: THEME_SHADOWS.card,
        opacity: isSoldOut ? 0.75 : 1,
      }}
      className={`relative flex flex-col justify-between overflow-hidden transition-all duration-150 w-full ${
        isPick1 ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
      }`}
    >
      {/* Top Section: Ribbon & Tags */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {ribbon ? (
            <div
              style={{
                backgroundColor: ribbon.bg,
                color: ribbon.color,
                borderRadius: 999,
              }}
              className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              {ribbon.label}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            {renderFilterIcon('craving', stall.craving, 28)}
            {renderFilterIcon('dietary', matchedDietaryTag, 28)}
            {stall.isSpicy && <SpicyMarkIcon size={22} />}
            {isSoldOut && (
              <span
                style={{
                  backgroundColor: THEME_COLORS.stop,
                  color: THEME_COLORS.cardSurface,
                }}
                className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              >
                {COPY.soldOutLabel}
              </span>
            )}
          </div>
        </div>

        {/* Stall Name & Unit */}
        <div className="flex items-baseline justify-between gap-2">
          <h3
            style={{
              color: THEME_COLORS.primaryText,
              fontSize: isPick1 ? 24 : 20,
              lineHeight: 1.25,
            }}
            className="font-bold tracking-tight"
          >
            {stall.name}
          </h3>
          <span
            style={{ color: THEME_COLORS.secondaryText }}
            className="text-xs font-mono font-semibold shrink-0"
          >
            {stall.unit}
          </span>
        </div>

        {/* Signature Dish Name */}
        <div className="mt-1">
          <h4
            style={{
              color: THEME_COLORS.brandDark,
              fontSize: isPick1 ? 18 : 16,
            }}
            className="font-semibold"
          >
            {stall.dish}
          </h4>
        </div>

        {/* Pricing, Rating, Wait, and Crowd */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 pt-3 border-t border-black/5">
          <span
            style={{
              color: THEME_COLORS.primaryText,
              fontSize: isPick1 ? 22 : 18,
            }}
            className="font-extrabold tabular-nums tracking-tight"
          >
            ${stall.price.toFixed(2)}
          </span>

          <span
            style={{ color: THEME_COLORS.secondaryText }}
            className="text-sm font-semibold tabular-nums flex items-center gap-1"
          >
            ★ {stall.rating.toFixed(1)}
          </span>

          <span
            style={{ color: waitStyle.color }}
            className="text-sm font-semibold tabular-nums"
          >
            ~{stall.waitMinutes} {COPY.waitMinutesSuffix}
          </span>

          <span
            style={{
              color: crowdStyle.color,
              backgroundColor: crowdStyle.bg,
            }}
            className="text-xs font-bold px-2 py-0.5 rounded-md"
          >
            {COPY.crowdLevelLabels[stall.crowdLevel]}
          </span>
        </div>

        {/* "I'm new here" Explanations */}
        {mode === 'new' && !isSoldOut && (
          <div
            style={{
              backgroundColor: THEME_COLORS.background,
              borderRadius: 12,
              borderColor: THEME_COLORS.border,
            }}
            className="mt-4 p-3.5 border text-sm space-y-2"
          >
            <div>
              <span
                style={{ color: THEME_COLORS.secondaryText }}
                className="text-xs font-bold uppercase tracking-wider block mb-0.5"
              >
                {COPY.whatItIsHeading}
              </span>
              <p
                style={{ color: THEME_COLORS.primaryText }}
                className="whitespace-pre-line leading-relaxed text-sm"
              >
                {stall.whatItIs}
              </p>
            </div>

            <div>
              <span
                style={{ color: THEME_COLORS.secondaryText }}
                className="text-xs font-bold uppercase tracking-wider block mb-0.5"
              >
                {COPY.howToOrderHeading}
              </span>
              <p
                style={{ color: THEME_COLORS.brandDark }}
                className="font-medium text-sm italic"
              >
                {stall.howToOrderIt}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action & Unit Navigation (Walk to) */}
      <div
        style={{
          borderTopWidth: 1,
          borderTopColor: THEME_COLORS.border,
          borderTopStyle: 'solid',
        }}
        className="mt-6 pt-4 flex items-end justify-between gap-4"
      >
        <div>
          <span
            style={{ color: THEME_COLORS.secondaryText }}
            className="text-xs uppercase font-bold tracking-wider block"
          >
            {COPY.walkToLabel}
          </span>
          <span
            style={{
              color: THEME_COLORS.brand,
              fontSize: 44,
              lineHeight: 1,
              fontFamily: 'monospace',
            }}
            className="font-extrabold tracking-tight"
          >
            {stall.unit}
          </span>
        </div>

        {onChangeMind && (
          <button
            id={`btn-change-mind-${stall.id}`}
            type="button"
            onClick={onChangeMind}
            style={{
              color: THEME_COLORS.brand,
              minHeight: 48,
              minWidth: 48,
            }}
            className="text-sm font-semibold hover:underline cursor-pointer flex items-center justify-center select-none"
          >
            {COPY.changeMindButton}
          </button>
        )}
      </div>
    </article>
  );
}
