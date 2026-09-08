/**
 * src/components/ScreenTopPicks.tsx
 * Screen 2: TOP PICKS
 * Displays the Reason Sentence (22-24px semibold in Brand light card, with fade-in),
 * optional amber line if a filter was relaxed,
 * up to 3 ranked picks (Pick 1 larger with 2px brand border),
 * and up to 6 alternatives as compact rows below.
 * All strings from src/copy.ts, all colors from src/theme.ts.
 */

import React, { useEffect, useState } from 'react';
import { RecommendationResult, FilterState } from '../lib/recommend';
import { VENUES } from '../data/venues';
import { THEME_COLORS, THEME_SHADOWS } from '../theme';
import { COPY } from '../copy';
import { StallCard } from './StallCard';

interface ScreenTopPicksProps {
  filters: FilterState;
  recommendation: RecommendationResult;
  mode: 'new' | 'know';
  onChangeMind: () => void;
}

export function ScreenTopPicks({
  filters,
  recommendation,
  mode,
  onChangeMind,
}: ScreenTopPicksProps) {
  const [fadedIn, setFadedIn] = useState(false);

  useEffect(() => {
    // Trigger reason sentence fade-in
    const timer = setTimeout(() => {
      setFadedIn(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  const venue = VENUES.find((v) => v.id === filters.venueId) || VENUES[0];

  const { picks, alternatives, relaxed, reason } = recommendation;

  // Amber explanation text for relaxed filters
  const getRelaxedNotice = () => {
    if (!relaxed) return null;
    if (relaxed === 'budget') {
      return `Filter relaxed: Budget adjusted from ${filters.budget} because no available stalls matched strictly.`;
    }
    if (relaxed === 'wait') {
      return `Filter relaxed: Wait time adjusted from ${filters.wait} because no available stalls matched strictly.`;
    }
    return `Filters relaxed: Budget and Wait time adjusted to show the best available stalls.`;
  };

  const relaxedNotice = getRelaxedNotice();

  return (
    <div id="screen-top-picks" className="pb-24 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Navigation & Header */}
      <div className="pt-6 pb-4 flex items-center justify-between">
        <button
          id="btn-back-where-what"
          type="button"
          onClick={onChangeMind}
          style={{
            color: THEME_COLORS.brand,
            minHeight: 48,
          }}
          className="font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer select-none"
        >
          ← {COPY.backToFilters}
        </button>

        <span
          style={{ color: THEME_COLORS.secondaryText }}
          className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5"
        >
          {venue.shortName}
        </span>
      </div>

      <h1
        id="top-picks-title"
        style={{
          color: THEME_COLORS.primaryText,
          fontSize: 32,
          lineHeight: 1.2,
        }}
        className="font-extrabold tracking-tight mt-1 mb-5"
      >
        {COPY.topPicksTitle}
      </h1>

      {/* Reason Sentence Card (22-24px semibold, Brand light background, fades in) */}
      {reason && (
        <section
          id="reason-sentence-card"
          style={{
            backgroundColor: THEME_COLORS.brandLight,
            borderColor: THEME_COLORS.brand,
            borderRadius: 16,
            borderWidth: 1,
            borderStyle: 'solid',
            boxShadow: THEME_SHADOWS.card,
            opacity: fadedIn ? 1 : 0,
            transform: fadedIn ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 250ms ease-out, transform 250ms ease-out',
          }}
          className="p-5 sm:p-6 mb-7"
        >
          <div className="flex items-start gap-2.5">
            <span
              style={{ color: THEME_COLORS.brandDark }}
              className="text-lg font-bold select-none leading-none mt-1"
            >
              “
            </span>
            <p
              id="reason-sentence-text"
              style={{
                color: THEME_COLORS.primaryText,
                fontSize: 22,
                lineHeight: 1.35,
              }}
              className="font-semibold tracking-tight"
            >
              {reason}
            </p>
          </div>

          {/* Amber relaxation warning line */}
          {relaxedNotice && (
            <div
              id="relaxed-filter-notice"
              style={{
                borderColor: THEME_COLORS.caution,
                color: THEME_COLORS.caution,
                backgroundColor: '#FFFDF5',
              }}
              className="mt-4 pt-3 pb-1 border-t flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{relaxedNotice}</span>
            </div>
          )}
        </section>
      )}

      {/* Top Ranked Picks Section */}
      <section id="section-ranked-picks" className="space-y-6">
        {picks.map((stall, index) => {
          const rankNumber = (index + 1) as 1 | 2 | 3;
          return (
            <StallCard
              key={stall.id}
              id={`pick-card-${rankNumber}-${stall.id}`}
              stall={stall}
              rank={rankNumber}
              mode={mode}
              onChangeMind={onChangeMind}
              variant="pick"
            />
          );
        })}
      </section>

      {/* Alternatives Section (Up to 6 stalls matching craving & dietary) */}
      {alternatives.length > 0 && (
        <section id="section-alternatives" className="mt-12">
          <div className="border-t border-black/10 pt-8 mb-4">
            <h2
              id="alternatives-title"
              style={{ color: THEME_COLORS.primaryText }}
              className="text-xl font-bold tracking-tight"
            >
              {COPY.alternativesTitle}
            </h2>
            <p
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-sm mt-0.5"
            >
              {COPY.alternativesSubtitle}
            </p>
          </div>

          <div id="alternatives-list" className="space-y-3">
            {alternatives.map((stall) => (
              <StallCard
                key={stall.id}
                id={`alternative-card-${stall.id}`}
                stall={stall}
                mode={mode}
                onChangeMind={onChangeMind}
                variant="alternative"
              />
            ))}
          </div>
        </section>
      )}

      {/* Bottom Floating/Sticky return link */}
      <div className="mt-10 text-center">
        <button
          id="btn-bottom-change-mind"
          type="button"
          onClick={onChangeMind}
          style={{
            borderColor: THEME_COLORS.brand,
            color: THEME_COLORS.brand,
            backgroundColor: THEME_COLORS.cardSurface,
            minHeight: 48,
          }}
          className="px-6 py-3 border-2 font-bold text-sm rounded-xl cursor-pointer hover:bg-orange-50 active:scale-97 select-none transition-all duration-150"
        >
          {COPY.changeMindButton}
        </button>
      </div>
    </div>
  );
}
