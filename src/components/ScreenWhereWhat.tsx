/**
 * src/components/ScreenWhereWhat.tsx
 * Screen 1: WHERE & WHAT
 * Venue selector, Mode toggle, filter tiles (Craving horizontal scroll, Budget/Dietary/Wait grids),
 * and Sticky Bottom Bar with live count, selected chips, and Find button.
 * All strings from src/copy.ts, all colors from src/theme.ts.
 */

import React, { useMemo } from 'react';
import { VENUES, STALLS, CravingType } from '../data/venues';
import {
  FilterState,
  BudgetFilter,
  DietaryFilter,
  WaitFilter,
  CravingFilter,
  matchesCraving,
  matchesDietary,
  matchesBudget,
  matchesWait,
} from '../lib/recommend';
import { THEME_COLORS, THEME_SHADOWS } from '../theme';
import { COPY } from '../copy';
import { Chip } from './Chip';
import { Tile } from './Tile';
import { renderFilterIcon, EmptyPlateQuestionIcon, AppLogo } from '../icons';

interface ScreenWhereWhatProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  mode: 'new' | 'know';
  onModeChange: (newMode: 'new' | 'know') => void;
  onFind: () => void;
}

const CRAVING_OPTIONS: CravingFilter[] = [
  'Noodles',
  'Rice',
  'Soup',
  'Snacks',
  'Kopi & Teh',
  'Bubble Tea',
  'Surprise me',
];

const BUDGET_OPTIONS: BudgetFilter[] = ['Any', 'Under $5', '$5–$12', 'Above $12'];
const DIETARY_OPTIONS: DietaryFilter[] = ['Any', 'Halal', 'Vegetarian', 'No nuts'];
const WAIT_OPTIONS: WaitFilter[] = ['Any', 'Under 10 min', 'Up to 20 min'];

export function ScreenWhereWhat({
  filters,
  onFilterChange,
  mode,
  onModeChange,
  onFind,
}: ScreenWhereWhatProps) {
  const currentVenue = useMemo(
    () => VENUES.find((v) => v.id === filters.venueId) || VENUES[0],
    [filters.venueId]
  );

  // Stalls at current venue
  const venueStalls = useMemo(
    () => STALLS.filter((s) => s.venueId === filters.venueId),
    [filters.venueId]
  );

  // Stalls passing Craving + Dietary at this venue
  const cravingDietaryStalls = useMemo(() => {
    if (!filters.craving) return [];
    return venueStalls.filter(
      (s) => matchesCraving(s, filters.craving) && matchesDietary(s, filters.dietary)
    );
  }, [venueStalls, filters.craving, filters.dietary]);

  // Strict stalls passing all 4 filters
  const strictStalls = useMemo(() => {
    if (!filters.craving) return [];
    return cravingDietaryStalls.filter(
      (s) => matchesBudget(s, filters.budget) && matchesWait(s, filters.wait)
    );
  }, [cravingDietaryStalls, filters.budget, filters.wait]);

  // Check if craving is selected
  const hasCravingSelected = filters.craving !== null;

  // Empty state condition: Craving selected AND 0 stalls pass craving + dietary at this venue
  const isEmptyState = hasCravingSelected && cravingDietaryStalls.length === 0;

  // Find enabled condition: Craving chosen AND at least 1 stall passes craving + dietary
  const isFindEnabled = hasCravingSelected && cravingDietaryStalls.length > 0;

  // Live count display
  const liveCount = useMemo(() => {
    if (!hasCravingSelected) return 0;
    if (strictStalls.length > 0) return strictStalls.length;
    return cravingDietaryStalls.length;
  }, [hasCravingSelected, strictStalls.length, cravingDietaryStalls.length]);

  // Suggested alternative cravings for empty state sentence
  const alternativeCravings = useMemo(() => {
    if (!isEmptyState || !filters.craving || filters.craving === 'Surprise me') return [];
    const availableCravings = new Set<string>();
    for (const stall of venueStalls) {
      if (stall.craving !== filters.craving && matchesDietary(stall, filters.dietary)) {
        availableCravings.add(stall.craving);
      }
    }
    return Array.from(availableCravings).slice(0, 2);
  }, [isEmptyState, filters.craving, filters.dietary, venueStalls]);

  const emptyStateText = useMemo(() => {
    if (!isEmptyState || !filters.craving) return '';
    return COPY.emptyStateSentence(
      filters.dietary,
      filters.craving,
      currentVenue.shortName,
      alternativeCravings
    );
  }, [isEmptyState, filters.dietary, filters.craving, currentVenue.shortName, alternativeCravings]);

  return (
    <div id="screen-where-what" className="pb-44 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <header className="pt-6 pb-5 text-left border-b border-black/5">
        <h1
          id="app-main-title"
          style={{
            color: THEME_COLORS.primaryText,
            fontSize: 32,
            lineHeight: 1.2,
          }}
          className="font-extrabold tracking-tight flex items-center gap-3.5"
        >
          <AppLogo size={52} className="shrink-0 transition-transform duration-200 hover:scale-105 select-none" />
          <span className="flex items-baseline">
            <span>EatWhat</span>
            <span style={{ color: THEME_COLORS.brand }}>Lah?</span>
          </span>
        </h1>
        <p
          id="app-tagline"
          style={{ color: THEME_COLORS.secondaryText }}
          className="text-base mt-1.5"
        >
          {COPY.appTagline}
        </p>
      </header>

      {/* 1.a Venue Selector */}
      <section id="section-venue" className="mt-6">
        <label
          style={{ color: THEME_COLORS.secondaryText }}
          className="text-xs font-bold uppercase tracking-wider block mb-2.5"
        >
          {COPY.venueSectionTitle}
        </label>

        <div
          id="venue-chips-row"
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {VENUES.map((venue) => {
            const isSelected = venue.id === filters.venueId;
            return (
              <Chip
                key={venue.id}
                id={`chip-venue-${venue.id}`}
                label={venue.shortName}
                isSelected={isSelected}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    venueId: venue.id,
                  })
                }
              />
            );
          })}
        </div>

        {/* Selected Venue One-line Description */}
        <p
          id="venue-description"
          style={{ color: THEME_COLORS.secondaryText }}
          className="text-sm mt-2 italic px-1"
        >
          {currentVenue.description}
        </p>
      </section>

      {/* 1.b Mode Toggle */}
      <section id="section-mode" className="mt-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <label
            style={{ color: THEME_COLORS.secondaryText }}
            className="text-xs font-bold uppercase tracking-wider block"
          >
            {COPY.modeHeading}
          </label>
          <span
            style={{ color: THEME_COLORS.secondaryText }}
            className="text-xs italic"
          >
            {mode === 'new' ? COPY.modeNewHereHelp : COPY.modeKnowPlaceHelp}
          </span>
        </div>

        <div id="mode-toggle-buttons" className="grid grid-cols-2 gap-3">
          {/* "I'm new here" button */}
          <button
            id="btn-mode-new"
            type="button"
            onClick={() => onModeChange('new')}
            style={{
              backgroundColor:
                mode === 'new' ? THEME_COLORS.brand : THEME_COLORS.cardSurface,
              color:
                mode === 'new' ? THEME_COLORS.cardSurface : THEME_COLORS.brand,
              borderColor: THEME_COLORS.brand,
              borderWidth: 1.5,
              borderStyle: 'solid',
              borderRadius: 12,
              minHeight: 48,
              transition: 'all 150ms ease-out',
            }}
            className="font-bold text-sm flex items-center justify-center px-4 py-2.5 cursor-pointer active:scale-97 select-none"
          >
            {COPY.modeNewHere}
          </button>

          {/* "I know this place" button */}
          <button
            id="btn-mode-know"
            type="button"
            onClick={() => onModeChange('know')}
            style={{
              backgroundColor:
                mode === 'know' ? THEME_COLORS.brand : THEME_COLORS.cardSurface,
              color:
                mode === 'know' ? THEME_COLORS.cardSurface : THEME_COLORS.brand,
              borderColor: THEME_COLORS.brand,
              borderWidth: 1.5,
              borderStyle: 'solid',
              borderRadius: 12,
              minHeight: 48,
              transition: 'all 150ms ease-out',
            }}
            className="font-bold text-sm flex items-center justify-center px-4 py-2.5 cursor-pointer active:scale-97 select-none"
          >
            {COPY.modeKnowPlace}
          </button>
        </div>
      </section>

      {/* 1.c Filters */}
      <div id="filter-groups" className="mt-8 space-y-7">
        {/* Craving Group */}
        <section id="group-craving">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              style={{ color: THEME_COLORS.primaryText }}
              className="font-bold text-base tracking-tight"
            >
              {COPY.cravingTitle}
            </h2>
            <span
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-xs"
            >
              {!filters.craving ? 'Required — pick one' : filters.craving}
            </span>
          </div>

          {/* Horizontally scrolling row of seven craving tiles so group stays one screen tall */}
          <div
            id="craving-tiles-scroll"
            className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 px-1 -mx-1 snap-x no-scrollbar"
          >
            {CRAVING_OPTIONS.map((c) => {
              const isSelected = filters.craving === c;
              return (
                <div key={c} className="w-32 sm:w-36 shrink-0 snap-start">
                  <Tile
                    id={`tile-craving-${c.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    label={COPY.cravingLabels[c]}
                    icon={renderFilterIcon('craving', c, 56)}
                    isSelected={isSelected}
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        craving: c,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Budget Group */}
        <section id="group-budget">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              style={{ color: THEME_COLORS.primaryText }}
              className="font-bold text-base tracking-tight"
            >
              {COPY.budgetTitle}
            </h2>
            <span
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-xs"
            >
              {filters.budget}
            </span>
          </div>

          <div
            id="budget-tiles-grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1"
          >
            {BUDGET_OPTIONS.map((b) => {
              const isSelected = filters.budget === b;
              return (
                <Tile
                  key={b}
                  id={`tile-budget-${b.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  label={COPY.budgetLabels[b]}
                  icon={renderFilterIcon('budget', b, 56)}
                  isSelected={isSelected}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      budget: b,
                    })
                  }
                />
              );
            })}
          </div>
        </section>

        {/* Dietary Group */}
        <section id="group-dietary">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              style={{ color: THEME_COLORS.primaryText }}
              className="font-bold text-base tracking-tight"
            >
              {COPY.dietaryTitle}
            </h2>
            <span
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-xs"
            >
              {filters.dietary}
            </span>
          </div>

          <div
            id="dietary-tiles-grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1"
          >
            {DIETARY_OPTIONS.map((d) => {
              const isSelected = filters.dietary === d;
              return (
                <Tile
                  key={d}
                  id={`tile-dietary-${d.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  label={COPY.dietaryLabels[d]}
                  icon={renderFilterIcon('dietary', d, 56)}
                  isSelected={isSelected}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      dietary: d,
                    })
                  }
                />
              );
            })}
          </div>
        </section>

        {/* Max Wait Group */}
        <section id="group-wait">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              style={{ color: THEME_COLORS.primaryText }}
              className="font-bold text-base tracking-tight"
            >
              {COPY.waitTitle}
            </h2>
            <span
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-xs"
            >
              {filters.wait}
            </span>
          </div>

          <div
            id="wait-tiles-grid"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-1"
          >
            {WAIT_OPTIONS.map((w) => {
              const isSelected = filters.wait === w;
              return (
                <Tile
                  key={w}
                  id={`tile-wait-${w.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  label={COPY.waitLabels[w]}
                  icon={renderFilterIcon('wait', w, 56)}
                  isSelected={isSelected}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      wait: w,
                    })
                  }
                />
              );
            })}
          </div>
        </section>
      </div>

      {/* 1.d Sticky Bar at the Bottom */}
      <footer
        id="sticky-find-bar"
        style={{
          backgroundColor: isEmptyState ? THEME_COLORS.brandLight : THEME_COLORS.cardSurface,
          borderColor: THEME_COLORS.border,
          boxShadow: '0 -4px 16px rgba(43, 43, 43, 0.08)',
          transition: 'all 150ms ease-out',
        }}
        className="fixed bottom-0 left-0 right-0 z-30 border-t px-4 py-3 sm:px-6"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
          {/* If Empty state: Sticky bar turns Brand light with one-sentence explanation and drawn plate-with-question-mark icon */}
          {isEmptyState ? (
            <div
              id="sticky-bar-empty-state"
              className="flex items-center gap-3 p-2 rounded-xl"
            >
              <EmptyPlateQuestionIcon size={32} className="shrink-0" />
              <p
                id="empty-state-sentence"
                style={{ color: THEME_COLORS.primaryText }}
                className="text-sm font-semibold leading-snug"
              >
                {emptyStateText}
              </p>
            </div>
          ) : (
            /* Standard selected chips row with half-size icons (28px) */
            <div
              id="sticky-bar-chips"
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs"
            >
              {filters.craving && (
                <div
                  style={{
                    backgroundColor: THEME_COLORS.background,
                    borderColor: THEME_COLORS.border,
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 font-medium text-xs"
                >
                  {renderFilterIcon('craving', filters.craving, 20)}
                  <span>{filters.craving}</span>
                </div>
              )}

              {filters.budget !== 'Any' && (
                <div
                  style={{
                    backgroundColor: THEME_COLORS.background,
                    borderColor: THEME_COLORS.border,
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 font-medium text-xs"
                >
                  {renderFilterIcon('budget', filters.budget, 20)}
                  <span>{filters.budget}</span>
                </div>
              )}

              {filters.dietary !== 'Any' && (
                <div
                  style={{
                    backgroundColor: THEME_COLORS.background,
                    borderColor: THEME_COLORS.border,
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 font-medium text-xs"
                >
                  {renderFilterIcon('dietary', filters.dietary, 20)}
                  <span>{filters.dietary}</span>
                </div>
              )}

              {filters.wait !== 'Any' && (
                <div
                  style={{
                    backgroundColor: THEME_COLORS.background,
                    borderColor: THEME_COLORS.border,
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 font-medium text-xs"
                >
                  {renderFilterIcon('wait', filters.wait, 20)}
                  <span>{filters.wait}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Row: Live count and Find button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span
                id="live-stall-count"
                style={{
                  color: isFindEnabled ? THEME_COLORS.primaryText : THEME_COLORS.secondaryText,
                }}
                className="font-bold text-sm sm:text-base tabular-nums"
              >
                {hasCravingSelected
                  ? COPY.countTemplate(liveCount)
                  : 'Choose craving to start'}
              </span>
              <span
                style={{ color: THEME_COLORS.secondaryText }}
                className="text-xs truncate max-w-[170px] sm:max-w-none"
              >
                at {currentVenue.shortName}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <button
                id="btn-find-stall"
                type="button"
                disabled={!isFindEnabled}
                onClick={onFind}
                style={{
                  backgroundColor: isFindEnabled ? THEME_COLORS.brand : THEME_COLORS.border,
                  color: isFindEnabled ? THEME_COLORS.cardSurface : THEME_COLORS.secondaryText,
                  borderRadius: 12,
                  minHeight: 48,
                  minWidth: 140,
                  transition: 'all 150ms ease-out',
                }}
                className={`font-bold text-sm sm:text-base px-6 py-3 flex items-center justify-center select-none shadow-sm ${
                  isFindEnabled ? 'cursor-pointer active:scale-97' : 'cursor-not-allowed'
                }`}
              >
                {COPY.findButtonText}
              </button>
            </div>
          </div>

          {/* If Find disabled: one sentence beneath saying why */}
          {!isFindEnabled && !isEmptyState && (
            <p
              id="find-disabled-explanation"
              style={{ color: THEME_COLORS.secondaryText }}
              className="text-xs text-right mt-0.5"
            >
              {COPY.findButtonDisabledReason}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
