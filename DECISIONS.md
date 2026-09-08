# Design and Logic Decisions — EatWhatLah?

## 1. Architectural Principles

EatWhatLah? is designed for a diner standing at the entrance of a crowded food venue with sensory overload and decision fatigue. The application prioritizes speed, clarity, and trust:
- **Two screens only**: Screen 1 (*Where & What*) captures venue, mode, and diner preferences. Screen 2 (*Top Picks*) delivers a trusted recommendation, plain-English reason sentence, and high-visibility stall unit number.
- **Strict Separation of Concerns**:
  - `src/theme.ts`: Single source of truth for all color constants, shadows, and 3D tone calculations. Zero hex codes are written inside React components.
  - `src/copy.ts`: Single source of truth for all user-facing text, labels, and reason sentence templates.
  - `src/icons.tsx`: 20 vector icons drawn as pure inline SVGs in code. Each icon uses computed highlight (+35% white) and shade (-30% black) tones with a subtle drop shadow on a circular white backing for contrast across any surface.
  - `src/data/venues.ts`: Comprehensive dataset of three invented venues (hawker centre, food court, café street) with 20+ stalls each, including price, wait minutes, crowd levels, dietary tags, spicy indicators, and sold-out states.
  - `src/lib/recommend.ts`: Pure recommendation engine with zero React or DOM dependencies.
  - `scripts/check.ts`: Automated test script validating all 1,008 filter combinations across every venue.

---

## 2. Recommendation Engine & Relaxation Rules

The recommendation algorithm in `src/lib/recommend.ts` adheres to strict diner promises:
1. **Never Relax Craving or Dietary Filters**:
   - If a diner selects *Vegetarian Soup*, they will never be shown a non-vegetarian or non-soup dish.
   - When no stalls qualify, the app triggers an explicit empty state recommending alternative cravings that *do* exist at that venue for that dietary requirement (e.g., "No Vegetarian Soup at Sunrise Lane today — try Rice or Snacks").
2. **Sequential, Transparent Relaxation**:
   - If a diner specified a budget or max wait time and no available stalls match strictly, the app relaxes **Budget first**, and then **Wait time second**.
   - Relaxation occurs *only* if the diner set that filter (never when "Any" was chosen).
   - Any relaxation is explicitly communicated in the reason sentence and highlighted by an amber caution banner (e.g. *Filter relaxed: Budget adjusted from Under $5 because no available stalls matched strictly*).
3. **Availability Guarantee**:
   - A sold-out stall is **never** Pick 1 when an available qualifying stall exists.
   - Sold-out stalls appear greyed out with a high-contrast *Sold out* pill in Stop Red (`#D64545`), disabling action.
4. **Deterministic "Surprise Me"**:
   - "Surprise me" treats all cravings as valid candidates and deterministically selects the top pick using the day of the year (`dayOfYear % available.length`).
   - Two different devices on the same calendar day with identical filters will receive the exact same recommendation.
5. **Computed Bands**:
   - Wait bands (`Under 10 min`, `Up to 20 min`) and budget bands (`Under $5`, `$5–$12`, `Above $12`) are computed dynamically from numbers (`waitMinutes` and `price`) and never stored redundantly.

---

## 3. UI/UX & Sensory Design

- **Glanceable Walking Typography**:
  - Stall unit numbers appear in **44px bold monospace** under the label "Walk to" so diners can read the destination at arm's length while navigating foot traffic.
  - The reason sentence is rendered in **22–24px semibold** inside a Brand Light container (`#FDEBDD`), immediately explaining why the stall was chosen.
- **Two Distinct Modes**:
  - **"I'm new here"**: Every card displays a 2-line plain-English description of the dish ("What it is") and an ordering guide ("How to order it", e.g., specifying chili/soup preferences).
  - **"I know this place"**: Descriptions are hidden for experienced locals to optimize vertical density.
- **Zero Outside Services**:
  - No external web fonts (pure system font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
  - No third-party CDNs, external image hosts, or remote APIs.
  - Fully offline and container-ready.
- **Performance & Micro-interactions**:
  - 150ms CSS transitions for all button/tile presses (scale to 0.97).
  - Clean cross-fade between Screen 1 and Screen 2 without full-page reloads.
  - Full support for `prefers-reduced-motion`.
