# EatWhatLah? 🍜

Front-end web application for a hungry, indecisive diner standing at the entrance of a hawker centre, food court, or café street.

Built for **MGMT 6110 Human-AI Collaboration at SMU**.

---

## Key Features

1. **Screen 1: Where & What**
   - **Venue Selector**: Choose between Sunrise Lane Hawker Centre, Clover Garden Food Court, or Breeze Promenade Café Street with one-line descriptions.
   - **Diner Modes**: Switch between *"I'm new here"* (shows dish background and ordering guidance) and *"I know this place"* (streamlined view).
   - **Tappable Filter Tiles**: 3D vector icons on circular white backings across Craving, Budget, Dietary, and Max Wait.
   - **Sticky Find Bar**: Live count of matching stalls, active choice chips, and intelligent disabled states with instant alternative suggestions when combinations yield no stalls.

2. **Screen 2: Top Picks**
   - **Personalized Reason Sentence**: 22–24px semibold card reflecting back the user's chosen filters and ranking factors.
   - **Ranked Top Picks**: Pick 1 emphasized with 2px brand border and rank ribbons.
   - **Glanceable Unit Numbers**: 44px bold unit numbers under "Walk to" for reading while walking through crowded corridors.
   - **Alternative Suggestions**: Up to 6 secondary options meeting the same craving and dietary parameters.
   - **Amber Relaxation Notices**: Clear feedback whenever a budget or wait band was relaxed.

---

## Technical Constraints Respected

- **No external services**: Uses the system font stack and code-drawn vector SVGs. No outside fonts, image URLs, CDNs, or APIs.
- **Zero non-determinism**: Deterministic Day-of-Year rotation for "Surprise me" ensures identical picks across devices on the same day.
- **No real-world business names**: All stalls and venues are invented and verified against a blocklist.
- **Strict single sources of truth**: All colors in `src/theme.ts`, all copy in `src/copy.ts`, all icons in `src/icons.tsx`, and all data in `src/data/venues.ts`.

---

## Development & Testing

### Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the application.

### Run Acceptance Check
```bash
npm run check
```
Walks all 1,008 combinations of venue, craving, budget, dietary, and wait filters, validating craving/dietary invariant preservation, availability prioritization, stall metadata, and determinism.

### Build Production Bundle
```bash
npm run build
```
