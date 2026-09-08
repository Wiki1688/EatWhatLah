/**
 * src/lib/recommend.ts
 * The whole recommendation rule as pure functions with no React in them.
 * Computed numbers for wait and budget bands, never stored twice.
 * Fully deterministic logic for recommendations.
 */

import { Stall, CravingType, DietaryTag, VENUES } from '../data/venues';
import { COPY } from '../copy';

export type BudgetFilter = 'Any' | 'Under $5' | '$5–$12' | 'Above $12';
export type DietaryFilter = 'Any' | 'Halal' | 'Vegetarian' | 'No nuts';
export type WaitFilter = 'Any' | 'Under 10 min' | 'Up to 20 min';
export type CravingFilter = CravingType | 'Surprise me';

export interface FilterState {
  venueId: string;
  craving: CravingFilter | null;
  budget: BudgetFilter;
  dietary: DietaryFilter;
  wait: WaitFilter;
}

export interface RecommendationResult {
  picks: Stall[];
  alternatives: Stall[];
  relaxed: 'budget' | 'wait' | 'both' | null;
  strictMatches: number;
  reason: string;
}

/**
 * Compute budget band from a price number.
 */
export function budgetBandOf(price: number): 'Under $5' | '$5–$12' | 'Above $12' {
  if (price < 5.0) {
    return 'Under $5';
  }
  if (price <= 12.0) {
    return '$5–$12';
  }
  return 'Above $12';
}

/**
 * Compute wait band from wait minutes number.
 */
export function waitBandOf(minutes: number): 'Under 10 min' | 'Up to 20 min' {
  if (minutes < 10) {
    return 'Under 10 min';
  }
  return 'Up to 20 min';
}

/**
 * Deterministic Day of Year calculation for rotating "Surprise me"
 */
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Check if a stall matches the budget filter
 */
export function matchesBudget(stall: Stall, budget: BudgetFilter): boolean {
  if (budget === 'Any') return true;
  if (budget === 'Under $5') return stall.price < 5.0;
  if (budget === '$5–$12') return stall.price >= 5.0 && stall.price <= 12.0;
  if (budget === 'Above $12') return stall.price > 12.0;
  return true;
}

/**
 * Check if a stall matches the wait filter
 */
export function matchesWait(stall: Stall, wait: WaitFilter): boolean {
  if (wait === 'Any') return true;
  if (wait === 'Under 10 min') return stall.waitMinutes < 10;
  if (wait === 'Up to 20 min') return stall.waitMinutes <= 20;
  return true;
}

/**
 * Check if a stall matches the dietary filter
 */
export function matchesDietary(stall: Stall, dietary: DietaryFilter): boolean {
  if (dietary === 'Any') return true;
  return stall.dietaryTags.includes(dietary as DietaryTag);
}

/**
 * Check if a stall matches the craving filter
 */
export function matchesCraving(stall: Stall, craving: CravingFilter | null): boolean {
  if (!craving || craving === 'Surprise me') return true;
  return stall.craving === craving;
}

/**
 * Pure recommendation engine
 */
export function recommendStall(
  stalls: Stall[],
  filters: FilterState,
  date: Date = new Date()
): RecommendationResult {
  const venue = VENUES.find((v) => v.id === filters.venueId);
  const venueName = venue ? venue.shortName : 'this venue';

  // 1. Filter by venue
  const venueStalls = stalls.filter((s) => s.venueId === filters.venueId);

  // 2. Craving & Dietary (CRITICAL: These two are NEVER relaxed)
  const cravingDietaryStalls = venueStalls.filter(
    (s) => matchesCraving(s, filters.craving) && matchesDietary(s, filters.dietary)
  );

  // If no stalls at all match Craving + Dietary, return empty
  if (cravingDietaryStalls.length === 0) {
    return {
      picks: [],
      alternatives: [],
      relaxed: null,
      strictMatches: 0,
      reason: '',
    };
  }

  // 3. Strict match checking against Budget and Wait
  const strictStalls = cravingDietaryStalls.filter(
    (s) => matchesBudget(s, filters.budget) && matchesWait(s, filters.wait)
  );
  const strictMatches = strictStalls.length;

  let chosenPool: Stall[] = [];
  let relaxed: 'budget' | 'wait' | 'both' | null = null;

  // Check if strict matches contain any available (non sold-out) stalls
  const strictAvailable = strictStalls.filter((s) => !s.isSoldOut);

  if (strictAvailable.length > 0) {
    // We have available stalls under strict conditions!
    chosenPool = strictStalls;
  } else {
    // Need to attempt relaxation if user set budget or wait
    const userSetBudget = filters.budget !== 'Any';
    const userSetWait = filters.wait !== 'Any';

    let foundRelaxedPool = false;

    // Step 1: Relax Budget first (if user set it)
    if (userSetBudget) {
      const budgetRelaxedPool = cravingDietaryStalls.filter((s) =>
        matchesWait(s, filters.wait)
      );
      if (budgetRelaxedPool.some((s) => !s.isSoldOut)) {
        chosenPool = budgetRelaxedPool;
        relaxed = 'budget';
        foundRelaxedPool = true;
      }
    }

    // Step 2: Relax Wait next (if user set it and budget relaxation wasn't enough or wasn't set)
    if (!foundRelaxedPool && userSetWait) {
      const waitRelaxedPool = cravingDietaryStalls.filter((s) =>
        matchesBudget(s, filters.budget)
      );
      if (waitRelaxedPool.some((s) => !s.isSoldOut)) {
        chosenPool = waitRelaxedPool;
        relaxed = 'wait';
        foundRelaxedPool = true;
      }
    }

    // Step 3: Relax Both (if both were set and neither alone yielded available stalls)
    if (!foundRelaxedPool && userSetBudget && userSetWait) {
      if (cravingDietaryStalls.some((s) => !s.isSoldOut)) {
        chosenPool = cravingDietaryStalls;
        relaxed = 'both';
        foundRelaxedPool = true;
      }
    }

    // Fallback: If still nothing available (e.g. all stalls in category are sold out)
    if (!foundRelaxedPool) {
      chosenPool = strictStalls.length > 0 ? strictStalls : cravingDietaryStalls;
    }
  }

  // 4. Sort chosenPool deterministically
  // RULE: Sold out stalls NEVER pick 1 while an available one exists!
  const availableStalls = chosenPool.filter((s) => !s.isSoldOut);
  const soldOutStalls = chosenPool.filter((s) => s.isSoldOut);

  // Sort available stalls
  if (filters.craving === 'Surprise me') {
    // Deterministic rotation by day of year for Surprise me
    // Sort available by rating desc, then id asc
    availableStalls.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.id.localeCompare(b.id);
    });

    if (availableStalls.length > 0) {
      const dayOfYear = getDayOfYear(date);
      const offset = dayOfYear % availableStalls.length;
      // Rotate array so pick 1 rotates daily
      const rotatedAvailable = [
        ...availableStalls.slice(offset),
        ...availableStalls.slice(0, offset),
      ];
      availableStalls.splice(0, availableStalls.length, ...rotatedAvailable);
    }
  } else {
    // Normal craving: sort by rating desc, then waitMinutes asc, then price asc, then id asc
    availableStalls.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (a.waitMinutes !== b.waitMinutes) return a.waitMinutes - b.waitMinutes;
      if (a.price !== b.price) return a.price - b.price;
      return a.id.localeCompare(b.id);
    });
  }

  // Sort sold out stalls similarly
  soldOutStalls.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.id.localeCompare(b.id);
  });

  // Combine: available stalls first, sold-out stalls last
  const sortedPicksCandidates = [...availableStalls, ...soldOutStalls];
  const picks = sortedPicksCandidates.slice(0, 3);

  // 5. Alternatives: up to 6 stalls from cravingDietaryStalls not in picks
  const pickIds = new Set(picks.map((p) => p.id));
  const remainingStalls = cravingDietaryStalls.filter((s) => !pickIds.has(s.id));

  const remainingAvailable = remainingStalls.filter((s) => !s.isSoldOut);
  const remainingSoldOut = remainingStalls.filter((s) => s.isSoldOut);

  remainingAvailable.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (a.waitMinutes !== b.waitMinutes) return a.waitMinutes - b.waitMinutes;
    return a.id.localeCompare(b.id);
  });

  remainingSoldOut.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.id.localeCompare(b.id);
  });

  const alternatives = [...remainingAvailable, ...remainingSoldOut].slice(0, 6);

  // 6. Build the Reason Sentence
  let reason = '';
  if (picks.length > 0) {
    const pick1 = picks[0];

    if (filters.craving === 'Surprise me') {
      reason = COPY.reasonSurpriseMe({
        venueName,
        stallName: pick1.name,
        dietary: filters.dietary,
        waitMinutes: pick1.waitMinutes,
      });
    } else if (relaxed !== null) {
      reason = COPY.reasonRelaxed({
        relaxedType: relaxed,
        originalBudget: filters.budget,
        originalWait: filters.wait,
        price: pick1.price,
        dietary: filters.dietary,
        craving: filters.craving,
        venueName,
        waitMinutes: pick1.waitMinutes,
      });
    } else if (strictMatches === 1) {
      reason = COPY.reasonOneQualifies({
        dietary: filters.dietary,
        craving: filters.craving,
        budget: filters.budget,
        venueName,
        waitMinutes: pick1.waitMinutes,
      });
    } else {
      reason = COPY.reasonSeveralQualify({
        dietary: filters.dietary,
        craving: filters.craving,
        budget: filters.budget,
        venueName,
        waitMinutes: pick1.waitMinutes,
      });
    }
  }

  return {
    picks,
    alternatives,
    relaxed,
    strictMatches,
    reason,
  };
}
