/**
 * src/App.tsx
 * EatWhatLah? Main Application
 * Coordinates two screens:
 * 1) WHERE & WHAT (Venue, Mode, Filters, Sticky Count & Find Bar)
 * 2) TOP PICKS (Ranked Picks, Reason Sentence, Alternatives, Unit Navigation)
 * Seamless 150ms cross-fade transition without page reload.
 */

import React, { useState, useEffect, useTransition } from 'react';
import { ScreenWhereWhat } from './components/ScreenWhereWhat';
import { ScreenTopPicks } from './components/ScreenTopPicks';
import { FilterState, recommendStall } from './lib/recommend';
import { STALLS, VENUES } from './data/venues';
import { THEME_COLORS } from './theme';

const PREFS_STORAGE_KEY = 'eatwhatlah.prefs';

interface StoredPrefs {
  venueId?: string;
  venue?: string;
  mode?: string;
}

// Safely load stored diner preferences (venue and familiarity mode)
function loadStoredPrefs(): { venueId: string; mode: 'new' | 'know' } {
  const fallback = {
    venueId: VENUES[0].id,
    mode: 'new' as const,
  };

  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: StoredPrefs = JSON.parse(raw);

    const candidateVenueId = parsed.venueId || parsed.venue;
    const venueId =
      typeof candidateVenueId === 'string' &&
      VENUES.some((v) => v.id === candidateVenueId)
        ? candidateVenueId
        : fallback.venueId;

    const mode: 'new' | 'know' =
      parsed.mode === 'know' || parsed.mode === 'I know this place'
        ? 'know'
        : 'new';

    return { venueId, mode };
  } catch {
    return fallback;
  }
}

export default function App() {
  // Navigation Screen State
  const [screen, setScreen] = useState<'where-what' | 'top-picks'>('where-what');
  const [isFading, setIsFading] = useState(false);
  const [, startTransition] = useTransition();

  // Filters State: venue restored from prefs; craving, budget, diet, wait reset every visit
  const [filters, setFilters] = useState<FilterState>(() => {
    const prefs = loadStoredPrefs();
    return {
      venueId: prefs.venueId,
      craving: null,
      budget: 'Any',
      dietary: 'Any',
      wait: 'Any',
    };
  });

  // Mode: familiarity mode restored from prefs ("I'm new here" / "I know this place")
  const [mode, setMode] = useState<'new' | 'know'>(() => {
    const prefs = loadStoredPrefs();
    return prefs.mode;
  });

  // Persist venue and familiarity mode to localStorage under key "eatwhatlah.prefs"
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          PREFS_STORAGE_KEY,
          JSON.stringify({
            venueId: filters.venueId,
            venue: filters.venueId,
            mode,
          })
        );
      }
    } catch {
      // Safely ignore if storage is blocked or full
    }
  }, [filters.venueId, mode]);

  // Session overrides map for stalls (e.g. demo sold-out toggles)
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [demoSoldOutStallId, setDemoSoldOutStallId] = useState<string | null>(null);

  // Compute recommendation passing session overrides map into recommendStall
  const recommendation = recommendStall(STALLS, filters, new Date(), overrides);

  // Tapping demo button sets that stall's isSoldOut to true; tapping again reverses it
  const handleToggleSoldOut = (currentPick1Id: string) => {
    if (demoSoldOutStallId) {
      const prevId = demoSoldOutStallId;
      setDemoSoldOutStallId(null);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[prevId];
        return next;
      });
    } else {
      setDemoSoldOutStallId(currentPick1Id);
      setOverrides((prev) => ({
        ...prev,
        [currentPick1Id]: true,
      }));
    }
  };

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
            onToggleSoldOut={handleToggleSoldOut}
          />
        )}
      </div>
    </main>
  );
}
