/**
 * scripts/check.ts
 * Acceptance check runnable with `npm run check`.
 * Walks every venue × craving × budget × dietary × wait combination and fails with exit code 1 if:
 *  - a pick or alternative breaks the craving or dietary rule
 *  - a sold-out stall is pick 1 while an available one exists
 *  - any stall has waitMinutes over 20, price of 0 or less, or "(Sold Out)" in its name
 *  - the same inputs and date give different picks on two runs
 *  - or a name matches a BLOCKLIST array of real business names at the top of the file
 * On success it prints counts of combinations, empty states and relaxations, then PASS.
 */

import { STALLS, VENUES, CravingType, DietaryTag } from '../src/data/venues';
import {
  recommendStall,
  FilterState,
  BudgetFilter,
  DietaryFilter,
  WaitFilter,
  CravingFilter,
} from '../src/lib/recommend';

// Blocklist of real business names that must never be matched
export const BLOCKLIST: string[] = [
  'Maxwell',
  'Amoy Street',
  'Lau Pa Sat',
  'Newton Food Centre',
  'Old Airport Road',
  'Chinatown Complex',
  'Chomp Chomp',
  'Tiong Bahru',
  'Adam Road',
  'Tekka Centre',
  'Golden Mile',
  'Zion Riverside',
  'Hong Lim',
  'Bedok 85',
  'Whampoa',
  'Hill Street Tai Hwa',
  'Tian Tian',
  'Hawker Chan',
  'Liao Fan',
  '328 Katong Laksa',
  'Outram Park Char Kway Teow',
  'A Noodle Story',
  'Song Fa',
  'Ya Kun',
  'Toast Box',
  'LiHO',
  'KOI Thé',
  'Gong Cha',
  'Heytea',
  'ChiCha San Chen',
  'Swee Choon',
  'Din Tai Fung',
  'Jumbo Seafood',
  'Boon Tong Kee',
  'Eng Wantan Mee',
  'Suntec',
  'Marina Bay',
  'Koufu',
  'Food Republic',
  'Kopitiam',
  'Cantine',
  'Food Junction',
  'Malaysia Boleh',
  'Tim Ho Wan',
  'Shake Shack',
  'McDonalds',
  'KFC',
  'Subway',
];

const CRAVINGS: CravingFilter[] = [
  'Noodles',
  'Rice',
  'Soup',
  'Snacks',
  'Kopi & Teh',
  'Bubble Tea',
  'Surprise me',
];

const BUDGETS: BudgetFilter[] = ['Any', 'Under $5', '$5–$12', 'Above $12'];
const DIETARIES: DietaryFilter[] = ['Any', 'Halal', 'Vegetarian', 'No nuts'];
const WAITS: WaitFilter[] = ['Any', 'Under 10 min', 'Up to 20 min'];

function runChecks() {
  const failures: string[] = [];

  console.log('Running EatWhatLah? acceptance checks...');

  // 1. Data Integrity checks
  for (const venue of VENUES) {
    // Check blocklist on venue name
    for (const blocked of BLOCKLIST) {
      if (venue.name.toLowerCase().includes(blocked.toLowerCase())) {
        failures.push(`Venue name "${venue.name}" matches blocked name "${blocked}"`);
      }
    }

    const venueStalls = STALLS.filter((s) => s.venueId === venue.id);
    if (venueStalls.length < 20) {
      failures.push(
        `Venue "${venue.name}" has ${venueStalls.length} stalls, required at least 20.`
      );
    }

    const soldOutCount = venueStalls.filter((s) => s.isSoldOut).length;
    if (soldOutCount < 2) {
      failures.push(
        `Venue "${venue.name}" has only ${soldOutCount} sold-out stalls, required at least 2.`
      );
    }
  }

  for (const stall of STALLS) {
    if (stall.waitMinutes > 20) {
      failures.push(
        `Stall "${stall.name}" (${stall.id}) has waitMinutes ${stall.waitMinutes} > 20`
      );
    }
    if (stall.price <= 0) {
      failures.push(`Stall "${stall.name}" (${stall.id}) has price ${stall.price} <= 0`);
    }
    if (stall.name.toLowerCase().includes('sold out')) {
      failures.push(
        `Stall "${stall.name}" contains "(Sold Out)" or "sold out" in its name.`
      );
    }
    for (const blocked of BLOCKLIST) {
      if (stall.name.toLowerCase().includes(blocked.toLowerCase())) {
        failures.push(`Stall "${stall.name}" matches blocklist entry "${blocked}"`);
      }
    }
  }

  // 2. Combination checks
  let totalCombinations = 0;
  let emptyStatesCount = 0;
  let relaxationsCount = 0;

  const testDate = new Date('2026-09-08T12:00:00Z');

  for (const venue of VENUES) {
    for (const craving of CRAVINGS) {
      for (const budget of BUDGETS) {
        for (const dietary of DIETARIES) {
          for (const wait of WAITS) {
            totalCombinations++;

            const filters: FilterState = {
              venueId: venue.id,
              craving,
              budget,
              dietary,
              wait,
            };

            const res1 = recommendStall(STALLS, filters, testDate);
            const res2 = recommendStall(STALLS, filters, testDate);

            // Check determinism
            const picks1 = res1.picks.map((p) => p.id).join(',');
            const picks2 = res2.picks.map((p) => p.id).join(',');
            if (picks1 !== picks2) {
              failures.push(
                `Non-deterministic picks for venue=${venue.id}, craving=${craving}, budget=${budget}, dietary=${dietary}, wait=${wait}`
              );
            }

            if (res1.picks.length === 0) {
              emptyStatesCount++;
            }

            if (res1.relaxed !== null) {
              relaxationsCount++;
            }

            // Check craving and dietary rules on all picks and alternatives
            const allRecommended = [...res1.picks, ...res1.alternatives];
            for (const stall of allRecommended) {
              if (craving !== 'Surprise me' && stall.craving !== craving) {
                failures.push(
                  `Stall "${stall.name}" has craving "${stall.craving}" but filter was "${craving}"`
                );
              }
              if (
                dietary !== 'Any' &&
                !stall.dietaryTags.includes(dietary as DietaryTag)
              ) {
                failures.push(
                  `Stall "${stall.name}" lacks dietary tag "${dietary}" (has: ${stall.dietaryTags.join(', ')})`
                );
              }
            }

            // Check: A sold-out stall is NEVER pick 1 while an available one exists!
            if (res1.picks.length > 0) {
              const pick1 = res1.picks[0];
              if (pick1.isSoldOut) {
                // Check if any available stall existed in craving + dietary at this venue
                const venueStalls = STALLS.filter((s) => s.venueId === venue.id);
                const availableExisting = venueStalls.filter(
                  (s) =>
                    !s.isSoldOut &&
                    (craving === 'Surprise me' || s.craving === craving) &&
                    (dietary === 'Any' || s.dietaryTags.includes(dietary as DietaryTag))
                );
                if (availableExisting.length > 0) {
                  failures.push(
                    `Sold-out stall "${pick1.name}" was pick 1 while ${availableExisting.length} available stall(s) exist! Filters: venue=${venue.id}, craving=${craving}, budget=${budget}, dietary=${dietary}, wait=${wait}`
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  // 3. Report Results
  if (failures.length > 0) {
    console.error(`\nFAILED with ${failures.length} issue(s):`);
    for (const f of failures) {
      console.error(` - ${f}`);
    }
    process.exit(1);
  }

  console.log(`\nChecked ${totalCombinations} combinations across ${VENUES.length} venues.`);
  console.log(`Empty state scenarios: ${emptyStatesCount}`);
  console.log(`Relaxation scenarios: ${relaxationsCount}`);
  console.log('PASS');
}

runChecks();
