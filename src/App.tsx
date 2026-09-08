/**
 * src/App.tsx
 * EatWhatLah? Main Application
 * Coordinates two screens:
 * 1) WHERE & WHAT (Venue, Mode, Filters, Sticky Count & Find Bar)
 * 2) TOP PICKS (Ranked Picks, Reason Sentence, Alternatives, Unit Navigation)
 * Seamless 150ms cross-fade transition without page reload.
 */

import React, { useState, useTransition } from 'react';
import { ScreenWhereWhat } from './components/ScreenWhereWhat';
import { ScreenTopPicks } from './components/ScreenTopPicks';
import { FilterState, recommendStall } from './lib/recommend';
import { STALLS, VENUES } from './data/venues';
import { THEME_COLORS } from './theme';

export default function App() {
  // Navigation Screen State
  const [screen, setScreen] = useState<'where-what' | 'top-picks'>('where-what');
  const [isFading, setIsFading] = useState(false);
  const [, startTransition] = useTransition();

  // Filters State with prescribed defaults: Craving unselected, everything else "Any"
  const [filters, setFilters] = useState<FilterState>({
    venueId: VENUES[0].id,
    craving: null,
    budget: 'Any',
    dietary: 'Any',
    wait: 'Any',
  });

  // Mode: "I'm new here" by default
  const [mode, setMode] = useState<'new' | 'know'>('new');

  // Compute recommendation
  const recommendation = recommendStall(STALLS, filters, new Date());

  // Transition handler between screens with 150ms cross-fade
  const navigateTo = (targetScreen: 'where-what' | 'top-picks') => {
    setIsFading(true);
    setTimeout(() => {
      startTransition(() => {
        setScreen(targetScreen);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsFading(false);
      });
    }, 150);
  };

  const handleFind = () => {
    navigateTo('top-picks');
  };

  const handleChangeMind = () => {
    navigateTo('where-what');
  };

  return (
    <main
      id="eat-what-lah-root"
      style={{
        backgroundColor: THEME_COLORS.background,
        minHeight: '100vh',
        color: THEME_COLORS.primaryText,
      }}
      className="w-full relative transition-colors duration-150 selection:bg-orange-200 selection:text-black"
    >
      <div
        id="screen-transition-wrapper"
        style={{
          opacity: isFading ? 0 : 1,
          transition: 'opacity 150ms ease-in-out',
        }}
        className="w-full"
      >
        {screen === 'where-what' ? (
          <ScreenWhereWhat
            filters={filters}
            onFilterChange={setFilters}
            mode={mode}
            onModeChange={setMode}
            onFind={handleFind}
          />
        ) : (
          <ScreenTopPicks
            filters={filters}
            recommendation={recommendation}
            mode={mode}
            onChangeMind={handleChangeMind}
          />
        )}
      </div>
    </main>
  );
}
