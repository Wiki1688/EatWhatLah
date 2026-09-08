/**
 * src/copy.ts
 * Every user-facing word and sentence template the diner sees.
 * No user-facing string should be typed inside a component.
 * This file can be swapped to adapt the engine to another industry.
 */

export const COPY = {
  appTitle: 'EatWhatLah?',
  appTagline: 'Decide your food in two taps before walking in.',

  // Venue section
  venueSectionTitle: 'Where are you right now?',

  // Mode toggle
  modeHeading: 'Your familiarity with this place',
  modeNewHere: "I'm new here",
  modeKnowPlace: 'I know this place',
  modeNewHereHelp: 'Shows dish descriptions and ordering tips',
  modeKnowPlaceHelp: 'Clean view without descriptions',

  // Filter Group Titles
  filtersTitle: 'What do you feel like eating?',
  cravingTitle: 'Craving',
  budgetTitle: 'Budget',
  dietaryTitle: 'Dietary',
  waitTitle: 'Max wait',

  // Tile labels: Craving
  cravingLabels: {
    Noodles: 'Noodles',
    Rice: 'Rice',
    Soup: 'Soup',
    Snacks: 'Snacks',
    'Kopi & Teh': 'Kopi & Teh',
    'Bubble Tea': 'Bubble Tea',
    'Surprise me': 'Surprise me',
  },

  // Tile labels: Budget
  budgetLabels: {
    Any: 'Any budget',
    'Under $5': 'Under $5',
    '$5–$12': '$5–$12',
    'Above $12': 'Above $12',
  },

  // Tile labels: Dietary
  dietaryLabels: {
    Any: 'Any diet',
    Halal: 'Halal',
    Vegetarian: 'Vegetarian',
    'No nuts': 'No nuts',
  },

  // Tile labels: Wait
  waitLabels: {
    Any: 'Any wait',
    'Under 10 min': 'Under 10 min',
    'Up to 20 min': 'Up to 20 min',
  },

  // Sticky bar
  stickyBarLabel: 'Your selection',
  findButtonText: 'Find my stall',
  findButtonDisabledReason: 'Pick a craving (or Surprise me) with available stalls to continue',
  countTemplate: (count: number) =>
    count === 1 ? '1 stall matches' : `${count} stalls match`,

  // Empty state sentence generator
  emptyStateSentence: (dietary: string, craving: string, venueName: string, alternatives: string[]) => {
    const dietPrefix = dietary !== 'Any' ? `${dietary} ` : '';
    const altSuggestion = alternatives.length > 0 ? ` — try ${alternatives.join(' or ')}` : '';
    return `No ${dietPrefix}${craving} at ${venueName} today${altSuggestion}`;
  },

  // Screen 2: Top Picks
  picksScreenTitle: 'Your Top Picks',
  picksScreenSubtitle: 'Hand-picked recommendations based on your preferences',
  changeMindButton: '← Change my mind',
  walkToLabel: 'Walk to',
  whatItIsHeading: 'What it is',
  howToOrderHeading: 'How to order it',
  soldOutLabel: 'Sold out',
  spicyMarkLabel: 'Spicy dish',
  crowdLevelLabels: {
    Low: 'Low crowd',
    Medium: 'Medium crowd',
    High: 'High crowd',
  },
  waitMinutesSuffix: 'min wait',

  // Alternatives section
  alternativesHeading: 'More stalls that match your craving & diet',
  noAlternativesMessage: 'No other stalls match this craving and dietary rule today.',

  // Relaxation explanations
  budgetRelaxedNotice: (originalBudget: string, price: number) =>
    `Budget relaxed: nothing ${originalBudget.toLowerCase()} today, so we expanded to show stalls at $${price.toFixed(2)}.`,
  waitRelaxedNotice: (originalWait: string, waitMinutes: number) =>
    `Wait time relaxed: no stalls under ${originalWait.toLowerCase()} today, showing next best at ${waitMinutes} min wait.`,
  bothRelaxedNotice: (originalBudget: string, price: number, waitMinutes: number) =>
    `Budget and wait time relaxed: showing best match at $${price.toFixed(2)} with ${waitMinutes} min wait.`,

  // Reason sentences
  reasonSeveralQualify: (params: {
    dietary: string;
    craving: string;
    budget: string;
    venueName: string;
    waitMinutes: number;
  }) => {
    const dietStr = params.dietary !== 'Any' ? `${params.dietary} ` : '';
    const budgetStr = params.budget !== 'Any' ? ` ${params.budget.toLowerCase()}` : '';
    return `Highest-rated ${dietStr}${params.craving}${budgetStr} at ${params.venueName}, wait about ${params.waitMinutes} min`;
  },

  reasonOneQualifies: (params: {
    dietary: string;
    craving: string;
    budget: string;
    venueName: string;
    waitMinutes: number;
  }) => {
    const dietStr = params.dietary !== 'Any' ? `${params.dietary} ` : '';
    const budgetStr = params.budget !== 'Any' ? ` ${params.budget.toLowerCase()}` : '';
    return `The only ${dietStr}${params.craving}${budgetStr} at ${params.venueName} today, wait about ${params.waitMinutes} min`;
  },

  reasonSurpriseMe: (params: {
    venueName: string;
    stallName: string;
    dietary: string;
    waitMinutes: number;
  }) => {
    const dietStr = params.dietary !== 'Any' ? `${params.dietary} ` : '';
    const waitThreshold = params.waitMinutes <= 10 ? '10 min' : '20 min';
    return `Decided for you: today's pick at ${params.venueName} is ${params.stallName}, because it is the highest-rated ${dietStr}stall with a wait under ${waitThreshold}`;
  },

  reasonRelaxed: (params: {
    relaxedType: 'budget' | 'wait' | 'both';
    originalBudget: string;
    originalWait: string;
    price: number;
    dietary: string;
    craving: string;
    venueName: string;
    waitMinutes: number;
  }) => {
    const dietStr = params.dietary !== 'Any' ? `${params.dietary} ` : '';
    if (params.relaxedType === 'budget') {
      return `We found nothing ${params.originalBudget.toLowerCase()} today, this one is $${params.price.toFixed(2)} — highest-rated ${dietStr}${params.craving} at ${params.venueName}, wait about ${params.waitMinutes} min`;
    }
    if (params.relaxedType === 'wait') {
      return `We found no stalls under ${params.originalWait.toLowerCase()} today, this one is ${params.waitMinutes} min wait — highest-rated ${dietStr}${params.craving} at ${params.venueName}`;
    }
    return `We relaxed budget and wait time — this one is $${params.price.toFixed(2)} with ${params.waitMinutes} min wait at ${params.venueName}`;
  },
} as const;
