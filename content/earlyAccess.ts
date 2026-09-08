/**
 * Early-access qualification. Five questions after the email, one optional free-text.
 * Keep ids stable: they are the keys stored with each submission.
 */
export type Question = {
  id: string;
  title: string;
  hint?: string;
  type: "single" | "multi";
  options: string[];
};

export const QUESTIONS: Question[] = [
  {
    id: "role",
    title: "What best describes you?",
    hint: "So we know which side of the router you are on.",
    type: "single",
    options: [
      "I build agents that need to pay for things",
      "I run an API, data or tool service I want agents to pay for",
      "I sell compute or GPU time",
      "I am on an enterprise team evaluating agent payments",
      "Investor, press or just curious",
    ],
  },
  {
    id: "spend",
    title: "What should your agents pay for first?",
    hint: "Pick everything that applies.",
    type: "multi",
    options: ["Data and API calls", "GPU or compute", "Other agents' services", "Search, SaaS and tools", "We mainly want to get paid", "Not sure yet"],
  },
  {
    id: "today",
    title: "How do your agents pay today?",
    type: "single",
    options: [
      "They don't yet",
      "Cards or prepaid credits that a person manages",
      "x402 or another stablecoin rail",
      "Stripe MPP or Google AP2",
      "A wallet integration we built ourselves",
    ],
  },
  {
    id: "stack",
    title: "Which agent stack do you use?",
    hint: "Pick everything that applies.",
    type: "multi",
    options: ["Claude, Claude Code or MCP", "OpenAI Agents or Codex", "LangChain or LangGraph", "ElizaOS or Virtuals", "CrewAI, AutoGen or custom", "No framework yet"],
  },
  {
    id: "stage",
    title: "How far along are you?",
    type: "single",
    options: ["Exploring", "Prototype or hackathon project", "In production, under 1,000 payments a month", "In production, over 1,000 payments a month"],
  },
];

/** Each successful referral moves the referrer up this many places in line. */
export const PLACES_PER_REFERRAL = 3;
/** Added to every displayed position. Set to 0 to show the raw sign-up order. */
export const POSITION_OFFSET = 1000;

export const FREE_TEXT = {
  id: "wish",
  title: "Anything your agent should be able to buy that it can't today?",
  hint: "Optional. A sentence is plenty.",
};
