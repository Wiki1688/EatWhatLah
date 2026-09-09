# PROMPTS.md — EatWhatLah?

**Team:** Group 1 — Ang Wee Khee, Ayumi Liow, Macolin, Rohith, Tusti · **Course:** MGMT 6110 Human-AI Collaboration · **Group product, Week 3 session**
**User sentence:** A hungry, indecisive diner standing at the entrance of a hawker centre opens this screen to decide what to eat in two taps, and knows it worked when a stall unit number is on screen big enough to read while walking.
**User kind:** A · External — a customer who can walk away.
**Builder:** Gemini in Google AI Studio → GitHub → Vercel
**Live link:** https://eatwhatlah-two.vercel.app/
**Repository:** https://github.com/Wiki1688/EatWhatLah

Every prompt we sent, in order, exactly as sent, including the one the tool sent on its own behalf. Under each: what came back, in plain words, and what we changed next and why. One variable per prompt where we could manage it; where we could not, we say so.

---

## Prompt 1 — the master prompt (R·G·O·G·C, with a DESIGN section added)

```
ROLE: You are a senior front-end developer and visual designer, building a React web app
for a client who is not a programmer, who would rather be asked a one-line question than be handed a
feature they did not order, and who will read your DECISIONS.md more carefully than your code.

GOAL: Build the front end of EatWhatLah?, a web product for a hungry, indecisive person standing at
the entrance of a place with too many food choices: a hawker centre, a food court, or a street of
cafés. They may have a craving, or none at all. Their job, in their words: "Tell it where I am and
what I can't eat, then either say what I feel like or let it decide for me, and get one stall I can
trust and understand before I walk over." Two screens. Two done properly beat three half-built.

1) WHERE & WHAT
a. Venue: a single row of three compact chips from an invented list (one hawker centre, one food
   court, one café street). The selected chip shows its one-line description.
b. Filters as large tappable tiles, each with a coloured 3D icon and a label (icon table under
   DESIGN):
   Craving   Noodles · Rice · Soup · Snacks · Kopi & Teh · Bubble Tea · Surprise me
   Budget    Any · Under $5 · $5–$12 · Above $12
   Dietary   Any · Halal · Vegetarian · No nuts
   Max wait  Any · Under 10 min · Up to 20 min
   Defaults: Craving unselected, everything else "Any". "Surprise me" means the diner has no
   craving and asks the app to decide: it is a valid choice that enables the Find button.
c. A sticky bar at the bottom shows the choices as small chips with the same icons at half size,
   a live count of stalls that pass, and the Find button. Find is disabled until a craving (or
   Surprise me) is chosen AND at least one stall passes craving + dietary at the chosen venue.
   If none does, the bar says so in one sentence ("No Vegetarian Soup at Sunrise Lane today —
   try Rice or Snacks") and recommends nothing.
   The diner knows it worked when the count is a real number, and a visitor knows it worked when
   every filter can be read from its icon and label without knowing a single local dish name.

2) TOP PICKS
a. Up to three ranked picks (1, 2, 3 ribbons), each a card with: rank, stall name, unit number,
   dish, price, rating, wait minutes, crowd level, the craving icon and dietary icon it matched,
   and a spicy chilli mark when the dish is spicy. Pick 1 is larger than picks 2 and 3.
b. One reason sentence above the picks, built from the diner's own filters and the result:
   several qualify → "Highest-rated Halal Noodles under $5 at Sunrise Lane, wait about 7 min"
   one qualifies   → "The only Halal Noodles under $5 at Sunrise Lane today, wait about 7 min"
   Surprise me     → "Decided for you: today's pick at Sunrise Lane is ..., because it is the
                      highest-rated Halal stall with a wait under 10 min"
   a band relaxed  → the sentence says so: "... nothing under $5 today, this one is $6.50 ..."
   Budget, then wait, may be relaxed one at a time, and only when the diner chose them; an amber
   line also says what was relaxed. Craving and dietary are never relaxed.
c. Below the picks, up to six alternatives that satisfy the same craving and dietary rule, as
   compact rows. Sold-out stalls appear, greyed, with a "Sold out" pill, never as pick 1.
d. In "I'm new here" mode every card carries a two-line plain-English "What it is" and one
   "How to order it" line (e.g. say "dry" or "soup"); in "I know this place" mode both are hidden.
e. Each pick ends with its unit number in very large type under the words "Walk to", and a
   "Change my mind" link back to screen 1 without a page reload. Nothing is ordered or paid for.
   "Surprise me" must be deterministic: the same venue, filters and calendar date always give the
   same pick (rotate by day of year), so a second phone shows the same answer as the first.
   The diner knows it worked when the reason sentence repeats back their own choices and the unit
   number is readable while walking.

OUTPUT: A running app, in this file layout, so that a script and a non-programmer can find things:
src/data/venues.ts   Every invented value. Three venues; at least 20 stalls per venue; every stall
                     with id, venueId, name, unit, dish, whatItIs, howToOrderIt, price, rating,
                     waitMinutes (never above 20), crowdLevel, isSpicy, dietaryTags, allergenFlags,
                     isSoldOut. At least two sold-out stalls per venue. Every craving × dietary pair
                     that exists at a venue represented at least once, and at least one craving ×
                     dietary pair at each venue with NO stall, so the empty state is reachable.
                     Sold-out status lives only in isSoldOut, never in the name.
src/lib/recommend.ts The whole recommendation rule as pure functions with no React in them:
                     recommendStall(stalls, filters, date) → { picks, alternatives, relaxed,
                     strictMatches, reason }; waitBandOf(minutes); budgetBandOf(price). Wait and
                     budget bands are computed from numbers, never stored twice.
src/copy.ts          Every word the diner sees: screen titles, tile labels, button text, the empty-
                     state sentence, the reason-sentence templates. No user-facing string typed
                     inside a component. (We will swap this file to show the same engine in another
                     industry.)
src/theme.ts         Every colour. No hex code typed inside a component.
src/icons.tsx        Every icon, one exported component per tile, each taking a size prop.
src/components/      One component per screen, plus small shared pieces (Tile, Chip, StallCard).
scripts/check.ts     An acceptance check runnable with `npm run check` (add the script and tsx as a
                     devDependency). It walks every venue × craving × budget × dietary × wait
                     combination and fails with exit code 1, printing each failure, if: a pick or
                     alternative breaks the craving or dietary rule; a sold-out stall is pick 1
                     while an available one exists; any stall has waitMinutes over 20, price of 0
                     or less, or "(Sold Out)" in its name; the same inputs and date give different
                     picks on two runs; or a name matches a BLOCKLIST array of real business names
                     at the top of the file that I will maintain. On success it prints the counts
                     of combinations, empty states and relaxations, then PASS.
DECISIONS.md         Every choice you made that I did not specify (defaults, tie-breaks, layout,
                     wording, dependencies), one line each, written as you go and finished at the
                     end. Also print this list in the chat under "DECISIONS I MADE FOR YOU".
README.md            Product name, the one-sentence job above, a placeholder line for the four
                     group members' names, how to run locally and how to run the check, and one
                     paragraph stating that the app calls no model and no outside service and that
                     every venue, stall, dish, price and rating is invented.
Readable on a phone at arm's length: on a 390 px screen, every filter group and the Find bar must be
reachable within two thumb-scrolls. When you are done, list every file you created and what each
holds.

DESIGN: Warm, generous, mobile-first, and calm: the food is the colour, the interface is the plate.
Type: the system font stack (-apple-system, "Segoe UI", Roboto, sans-serif) — no web fonts, because
a font is an outside service. Screen titles 28–32 px bold; the reason sentence 22–24 px semibold and
the largest text after the title; body 16 px; labels 14 px; unit number under "Walk to" 44 px bold.
Line height 1.4. Prices and wait minutes in tabular figures.
Interface colours — use exactly this palette and nothing outside it.
  Background #FAF7F2 · Card surface #FFFFFF · Border #E8E2D9 · Primary text #2B2B2B
  Secondary text #6F6A63 · Brand #E8692B (selected tile fill, primary buttons, rank-1 ribbon, links)
  Brand dark #C9501A (pressed state, rank-2 ribbon) · Brand light #FDEBDD (sticky bar, reason card,
  tile hover, rank-3 ribbon) · Success #2E9E5B (wait under 10 min, Low crowd)
  Caution #E3A008 (relaxed-filter line, wait 10–20 min, Medium crowd) · Stop #D64545 (sold out, High crowd)
3D icon colours — one icon per tile, drawn in code, exactly these base colours
  Craving  Noodles #F2B134 golden noodles lifted from a bowl by chopsticks · Rice #F5E6C8 rice mound
           in a #E8692B bowl · Soup #E0523A bowl with two pale steam curls · Snacks #C97B3A three
           golden pieces on a plate · Kopi & Teh #8B5A2B traditional cup and saucer · Bubble Tea
           #B98AD9 tall cup, wide straw, pearls at the bottom · Surprise me #F06292 closed gift box
           with a question mark on the lid
  Budget   Any #A0A0A0 open hand · Under $5 #7DBE5A one coin · $5–$12 #5A9E4B two coins ·
           Above $12 #3E7C3A three coins
  Dietary  Any #9B8EC4 open plate · Halal #2F9E8F crescent on a plate · Vegetarian #58B368 leaf ·
           No nuts #A8653A peanut with a slash
  Wait     Any #3567A8 clock, full face filled · Under 10 min #6BB7E8 clock, quarter face filled ·
           Up to 20 min #4B8FD1 clock, half face filled
  Card marks  Spicy #D9482B small chilli (card mark only, never a tile)
Rules for the 3D look: each icon is an inline SVG built from its base colour in three tones — base,
a lighter top-left highlight (base mixed 35% toward white), and a darker bottom-right shade (base
mixed 30% toward black) — plus a soft drop shadow (#2B2B2B at 15% opacity, 2 px down). Every icon
sits on a white circle so it stays readable on a filled tile. Icons are 56 px on tiles, 28 px on
chips and cards. No icon fonts, no image files, no emoji, and no icon may use the exact Success,
Caution or Stop hex codes. On a selected tile the circle stays white and the label turns white; on
an unselected tile the label is Primary text.
Layout and feel: one column on phones, tiles in a two-column grid (Craving in a horizontally
scrolling row of seven so the group stays one screen tall), card grid and four-column tiles from
768 px up. Rounded corners 16 px on cards and tiles, 999 px on chips and pills. Cards have a 1 px
Border and a soft shadow (#2B2B2B at 6%, 8 px blur); the rank-1 card has a 2 px Brand border.
Tap targets at least 48 px. Motion with CSS transitions only, 150 ms: tiles scale to 0.97 when
pressed, screens cross-fade, the reason sentence fades in. Respect prefers-reduced-motion.
Primary button Brand fill with white text; disabled Border fill with Secondary text and one
sentence beneath saying why. Secondary button white fill with Brand outline and text. Sold-out card
Border-grey background, "Sold out" pill in Stop, no action. Empty state: the sticky bar turns Brand
light with the one-sentence explanation and a drawn-in-code plate-with-question-mark icon. Green,
amber and red carry meaning only; never use them for decoration.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any model, any outside
service, or any URL — no web fonts, no CDN, no image URLs. No server, no Express, no dotenv, no
@google/genai dependency, no API key anywhere, no .env file, no majorCapabilities in metadata.json,
no database, no login, no accounts, no ordering, no cart, no quantity, no order number, no payment,
no order slip, no analytics, no GPS, no maps, no distances. No feature I did not list above — no
directory, no favourites, no timer, no buzzer, no notification, no share button, no badge that says
"live", no animation library, no icon library, no dark mode, no language switcher. No Math.random
anywhere. No word on screen that claims something the product does not do: not "live", not "paid",
not "certified", not "real-time", not "verified", not "nearby". No real venue, stall, company, brand,
logo or trademark — invent every name, number and date, and if a name you write could belong to a
real business, change it. Never put example people's names or our names on screen. Never silently
relax a filter the diner set. Never change a colour outside src/theme.ts, an icon outside
src/icons.tsx, or a user-facing word outside src/copy.ts. If the specification is silent on a
behaviour (empty list, very long name, tie in rating, no spicy dish), choose the safest option for
the diner and record it in DECISIONS.md rather than burying it.

CONTEXT: Group 1's shared build for MGMT 6110 Human-AI Collaboration at SMU, demonstrated live in
Week 3 on a projector and on classmates' phones from a public Vercel URL, with the code public on
GitHub. In front of the class we will do a live demonstration, and open DECISIONS.md to show
what you decided without us. None of us is a programmer; we will judge the result by clicking the
lettered Goal items above and by running that check, so keep every rule where the check can reach it.
```
**What came back:** A running two-screen app in one build: 24 files, including the six we named (`venues.ts` with 67 stalls and 6 sold-out, `recommend.ts`, `copy.ts`, `theme.ts`, `icons.tsx`, `scripts/check.ts` with a 47-name blocklist), plus `DECISIONS.md` and a README. `npm run check` reported PASS over 1,008 combinations, 36 empty states, 404 relaxations. It also produced things we did not ask for: `@types/express` in `package.json` (we had said "no Express"), the project still named `react-example`, HMR settings commented as being for "agent edits", and a README that claims zero non-determinism and a blocklist check without saying who maintains the list.
**What we changed next and why:** We pushed to GitHub and deployed to Vercel first, because the brief says a step is done when you have seen the result at the destination. The build was green and the page was not blank — our Guardrails had kept the Gemini client out, so there was no key to remove. Then we opened it on a phone and found the problem that became the next entry.

---

## Review — the missing title (a check, not a prompt)

**What we did:** Opened the live URL on a phone, tapped "Find my stall". Screen 2 had **no title** and the alternatives section had **no heading**. Ran `npm run check` on the same code: **PASS**. Ran the TypeScript checker (`npm run lint`): **9 errors** — three of them `Property 'topPicksTitle' does not exist` and the like. The screen asks `copy.ts` for three labels that were never written.
**What came back:** Nothing from the AI. A human looked at the phone.
**What we changed next and why:** We stopped treating PASS as "done". The check verifies the ranking rules, because that is exactly what we asked it to verify, and nothing about the screen. From this point a human opens the phone after every prompt, and the next two prompts fix the bug and widen the check so it cannot happen silently again.

---

## Prompt 2 — put the missing words back on Screen 2

```
Screen 2 renders an empty <h1> and an empty Alternatives heading because
src/components/ScreenTopPicks.tsx references COPY.topPicksTitle,
COPY.alternativesTitle and COPY.alternativesSubtitle, which do not exist in
src/copy.ts. Add exactly those three keys to src/copy.ts:
  topPicksTitle: 'Your Top Picks'
  alternativesTitle: 'Also worth a look'
  alternativesSubtitle: 'Same craving and diet, ranked next'
Do not rename or remove any existing key. Change nothing else.
```
**What came back:** One file touched, `src/copy.ts`, three keys added exactly as written. The AI reported that "both the application build and acceptance checks compile and pass cleanly" — which was already true before the fix, and is the point.
**What we changed next and why:** Confirmed the title on the phone after pushing. Then moved to widening the check, because a PASS that could not see this bug is not a check we can present.

---

## Prompt 3 — make the check catch what it missed

```
`npm run check` passed while Screen 2 had blank headings, so the check is
incomplete. Make two changes to verification only:
1) In package.json, change the "check" script to run `tsc --noEmit` first and
   then `tsx scripts/check.ts`, so a type error fails the check.
2) Fix the 6 remaining TypeScript errors where `key` is passed inside the
   props type: in Chip.tsx, Tile.tsx and StallCard.tsx the `key` prop must
   be given to the element directly, not typed in ChipProps/TileProps/
   StallCardProps.
Do not touch src/lib/recommend.ts, src/data/venues.ts or any copy strings.
Change nothing else.
```
**What came back:** `check` is now `tsc --noEmit && tsx scripts/check.ts`. The `key` props were moved onto the root elements in `Chip.tsx`, `Tile.tsx`, `StallCard.tsx`, and the duplicate keys removed at the call sites. It also did one thing we did not ask for — "resolved the undefined copy reference in `ScreenTopPicks.tsx` to reference `COPY.changeMindButton`" — a fourth missing label we had not spotted.
**What we changed next and why:** Accepted the extra fix, but wrote it down here because it means our own review of Screen 2 missed one. This is the entry where a Guardrail grew from a failure: "the check must cover the screen, not only the ranking" exists because the review above found the gap.

---

## Prompt 3b — sent by AI Studio itself, not by us

```
Fix the errors in the app
```
**What came back:** AI Studio raised this on its own after Prompt 3 (a "missing key warning"). Its fix installed **two new dependencies** — `@types/react` and `@types/react-dom` — and added `key={…}` to every list in `ScreenWhereWhat.tsx` and `ScreenTopPicks.tsx`. It reported `npm run check` and `compile_applet` both passing.
**What we changed next and why:** We let it stand, because the check still passes and the change is confined to type definitions and keys. But we record it as the tool acting without a prompt from us: a four-word instruction we did not write added two packages to our project. This is the clearest example in the log of a decision being made where nobody was watching, and it goes on our oversight slide as the step we would now want to approve rather than discover.

---

## Prompt 4 — a live-demo control that proves the sold-out rule

```
On Screen 2, under the #1 Top Pick card, add one small outlined button
labelled "Demo: mark this stall sold out". Tapping it sets that stall's
isSoldOut to true for this session only (React state, not the data file),
re-runs recommendStall, and the screen re-ranks so a different open stall
becomes Pick 1 and the old one drops down greyed with the Sold out pill.
Tapping it again reverses it. Keep all ranking logic inside
src/lib/recommend.ts; App.tsx should pass an overrides map into it.
No persistence, no new screen. Change nothing else.
```
**What came back:** `recommendStall` now accepts an optional overrides map, applied to in-memory clones so `venues.ts` is untouched; `App.tsx` holds the overrides as session state; a small outlined button sits under Pick 1 and the list re-ranks on tap, reversing on a second tap. Three files touched, as asked.
**What we changed next and why:** Nothing to the code. This button exists for the classroom, not for the diner: it turns "a sold-out stall is never Pick 1" from a sentence into something the room watches happen. We will say that out loud when we use it, because it is a feature the user would never need.

---

## Prompt 5 — remember venue and mode (a toggle that is remembered)

```
Remember the diner's last venue and familiarity mode ("I'm new here" / "I
know this place") in localStorage under the key "eatwhatlah.prefs", and
restore them on load. Craving, budget, diet and wait must NOT be remembered
— they reset every visit. Wrap every localStorage read and write in
try/catch so the app still works if storage is blocked. Change nothing else.
```
**What came back:** Venue and mode are saved under `eatwhatlah.prefs` and restored on load; an invalid or missing venue falls back to the default; every read and write is wrapped in try/catch. The four food filters are not stored.
**What we changed next and why:** Nothing. We deliberately excluded the food filters because a diner wants something different every day. On our oversight slide this is the one step we are comfortable leaving fully out of the loop: undone in one tap, nothing lost, the diner fixes it herself.

---

## Prompt 6 — clean the kitchen and name the user in the README

```
Housekeeping only, no UI changes:
1) package.json: rename "react-example" to "eatwhatlah", remove
   "@types/express" and "autoprefixer" (neither is used), and remove the
   duplicated "vite" entry in devDependencies.
2) README.md: add, directly under the title, a section "Who this is for"
   containing this exact sentence: "A hungry, indecisive diner standing at
   the entrance of a hawker centre opens this screen to decide what to eat
   in two taps, and knows it worked when a stall unit number is on screen
   big enough to read while walking." Label the user as external (kind A),
   list the team members [FILL NAMES], and add a "How to verify" section
   that shows `npm run check`.
Change nothing else.
```
**What came back:** `package.json` renamed to `eatwhatlah`, `@types/express` and `autoprefixer` removed, duplicate `vite` removed. README gained "Who this is for" with the exact sentence, the External (kind A) label, a `[FILL NAMES]` placeholder and a "How to verify" section.
**What we changed next and why:** Replaced `[FILL NAMES]` with our names by hand on GitHub. The `@types/express` line is our cleanest answer to "what did it build that you never sketched": our Guardrails said "no server, no Express", and a server type-package still arrived in the first build. The rule was there; the tool did not fully obey it; only reading `package.json` caught it.

---

## Prompt 7 — the banner and logo (annotation mode)

*Sent by clicking the title in AI Studio's annotate tool, then "Add to chat".*

```
Enhance the Webapp Design for banner EatWhatLah to have an appealing feel and
include an attractive logo with a wow factor. Change nothing else.
```
**What came back:** A new `AppLogo` component in `src/icons.tsx` — a bowl with chopsticks and noodles on a "terracotta gradient squircle badge (#FF7E36 to #E8692B)" with highlights and a drop shadow — and a reworked `h1` in `ScreenWhereWhat.tsx` with "Lah?" in the brand colour.
**What we changed next and why:** This is our weakest prompt and we are keeping it in the log for that reason. "Appealing", "attractive" and "wow factor" are not specifications — they hand the design decision to the model, which is exactly what Step 1 of the brief warns about. Two things to check before the session, because the response suggests the Guardrails bent: **(a)** `#FF7E36` is not in our palette, and the DESIGN section says "use exactly this palette and nothing outside it"; **(b)** the logo uses a gradient, which the master prompt never allowed. [DECIDE AND RECORD: either keep the logo and add `#FF7E36` to `theme.ts` with a line in DECISIONS.md, or send a one-variable follow-up: "Replace the gradient on AppLogo with the flat Brand colour #E8692B from src/theme.ts. Change nothing else."] Whichever we choose, the lesson is the same: a vague prompt produced a rule break that the check cannot see, because colours are not in the check.

---

## What we would add to the check next

The check walks the ranking rules and the blocklist. After this log it should also:
- fail if any hex code appears outside `src/theme.ts` (Prompt 7 showed colours can drift);
- fail if any user-facing string is typed inside a component (the master prompt's rule, never enforced);
- fail if `package.json` contains `express`, `genai` or `dotenv` (Prompt 1 showed a Guardrail in prose is not a Guardrail in code).

---

## Where the split between us and the AI moved

- **Prompt 1:** we wrote the most detailed brief we could, including a check the AI would write for itself. The AI built everything and graded itself PASS. We accepted.
- **The review:** a human opened the phone and found a blank title that PASS could not see. The check was right about the rules and blind to the screen — because the screen was never in what we asked it to check.
- **Prompts 2–3:** we took back the definition of "done". The AI still writes every line; we decide what the check must cover, and someone opens the phone after every prompt.
- **Prompt 3b:** the tool prompted itself and added two packages. We noticed only because we were reading responses, not just results.
- **Prompt 7:** we relaxed our own discipline ("wow factor"), and the model relaxed the palette in return. The log shows the split moving both ways.

## Guardrails that grew during the build

| Rule | Added after | Why |
|---|---|---|
| The check runs the type checker first | The review | PASS with a blank title |
| Read `package.json` after every build, not only the screen | Prompt 1 / 3b | `@types/express` arrived despite "no Express"; `@types/react` arrived without a prompt from us |
| One variable per prompt, "Change nothing else" on every one | Prompt 1 | So each entry here can say what changed |
| No adjectives as specifications ("appealing", "wow") | Prompt 7 | The model filled the gap with a colour outside the palette |
| Whoever prompts also pushes, then opens the phone | After the first deploy | Edits in AI Studio do not reach Vercel by themselves, and PASS does not reach the screen |
