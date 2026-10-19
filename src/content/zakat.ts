/*
  The Zakat page wording.

  It follows the other appeal pages' shape, plus four bands of its own: What is Zakat?, Who Can
  Receive Zakat?, the calculator banner and Where Your Zakat Goes.

  Every button opens the "zakat" popup, except the two in the first band: one opens the Zakat
  calculator, the other scrolls down to the eight categories.
*/

import type { HealthcarePageContent } from "./healthcare";

export type ZakatPageContent = Omit<HealthcarePageContent, "visible" | "why" | "counters"> & {
  visible: Record<
    "hero" | "why" | "stories" | "giving" | "who" | "calculator" | "where" | "choose" | "ctaBand",
    boolean
  >;
  why: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    /* The word after the red one, punctuation included. */
    headingEnd: string;
    lead: string;
    body: string;
    cta: string;
    secondCta: string;
    cards: { title: string }[];
  };
  who: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: { name: string; caption: string }[];
  };
  calculator: {
    headingStart: string;
    headingAccent: string;
    body: string;
    cta: string;
    /*
      The nisab is the threshold below which no Zakat is due, and it moves with the metal price,
      so these are held here and have to be refreshed. The weight and rate are only shown to the
      reader; the value is what the calculator compares against.
    */
    gold: { value: number; weight: string; rate: string };
    silver: { value: number; weight: string; rate: string };
  };
  where: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    lead: string;
    points: string[];
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
};

/* The page's own artwork, saved under public/images/zakat. */
const ASSETS = "/images/zakat";

export const zakatDefaults: ZakatPageContent = {
  visible: {
    hero: true,
    why: true,
    stories: true,
    giving: true,
    who: true,
    calculator: true,
    where: true,
    choose: true,
    ctaBand: true,
  },

  hero: {
    eyebrow: "Zakat",
    headingStart: "Purifying Wealth",
    headingAccent: "Empowering Lives",
    body: "Through Zakat, we transform compassion into action supporting families in crisis, sustaining orphans, building communities, and restoring dignity.",
    cta: "Make A Donation",
    form: "zakat",
    image: `${ASSETS}/hero.png`,
    imageAlt: "A child drinking clean water provided by Human Concern USA",
  },

  why: {
    eyebrow: "A divine obligation",
    headingStart: "What is",
    headingAccent: "Zakat",
    headingEnd: "?",
    lead: "A transformative act of worship.",
    body: "Zakat is one of the Five Pillars of Islam—an obligatory form of charity that purifies wealth and redistributes resources to those most in need. By giving Zakat, Muslims support vulnerable families, uplift communities, and enable long-term sustainability.",
    cta: "Calculate Zakat",
    secondCta: "See who receives Zakat",
    cards: [
      { title: "Pillar of Islam" },
      { title: "Purification of Wealth" },
      { title: "Community Welfare" },
      { title: "Empowerment" },
    ],
  },

  stories: {
    eyebrow: "Real stories of change made possible through your support",
    headingStart: "Your",
    headingAccent: "Zakat",
    headingEnd: "in Action",
    videoId: "WxNO-E8aUaY",
  },

  giving: {
    eyebrow: "Fulfil your sacred obligation and provide a life-saving lifeline to those most in need",
    headingStart: "Giving",
    headingAccent: "Levels",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "zakat",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "zakat",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "zakat",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "zakat",
      },
    ],
  },

  who: {
    eyebrow: "Understanding the categories defined in the Qur'an.",
    headingStart: "Who Can Receive",
    headingAccent: "Zakat",
    headingEnd: "?",
    items: [
      { name: "Fuqara", caption: "The poor" },
      { name: "Masakeen", caption: "The needy" },
      { name: "Aamileen", caption: "Administrators of Zakat" },
      { name: "Muallafatul", caption: "New Muslims" },
      { name: "Riqab", caption: "Those in bondage" },
      { name: "Gharimeen", caption: "Those in debt" },
      { name: "Fisabilillah", caption: "In the cause of Allah" },
      { name: "Ibnus Sabeel", caption: "The traveler in need" },
    ],
  },

  calculator: {
    headingStart: "Zakat",
    headingAccent: "Calculator",
    body: "Calculate your Zakat with our Zakat Calculator Tool",
    cta: "Calculator",
    gold: { value: 7251, weight: "87.48g", rate: "$167.56 / gram" },
    silver: { value: 557.25, weight: "612.36g", rate: "$0.91 / gram" },
  },

  where: {
    eyebrow: "Transparent, accountable and impact-driven",
    headingStart: "Where Your",
    headingAccent: "Zakat",
    headingEnd: "Goes",
    lead: "Distribution aligned with Islamic principles.",
    points: [
      "Emergency Relief & Food Security",
      "Orphan Support & Education",
      "Clean Water & Healthcare",
      "Sustainable Livelihood Projects",
    ],
    cta: "Give Zakat",
    form: "zakat",
    image: `${ASSETS}/where-zakat-goes.png`,
    imageAlt: "Families collecting food baskets from a Human Concern USA distribution in Yemen",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "zakat",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
    points: [
      "Serving vulnerable communities with transparency and dignity",
      "Zakat distributed in full, by the eight categories",
      "Zakat-eligible programs, audited and reported",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};
