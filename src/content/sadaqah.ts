/*
  The Sadaqah page wording.

  It follows the other appeal pages' shape exactly, so every band is one the site already has.
  Every button opens the "sadaqah" popup.
*/

import type { HealthcarePageContent } from "./healthcare";

export type SadaqahPageContent = Omit<HealthcarePageContent, "visible" | "counters" | "why"> & {
  visible: Record<"hero" | "why" | "stories" | "giving" | "choose" | "ctaBand", boolean>;
  /* Which donation popup the "Why" band's button opens. */
  why: HealthcarePageContent["why"] & { form: string };
};

/* The page's own artwork, saved under public/images/sadaqah. */
const ASSETS = "/images/sadaqah";

export const sadaqahDefaults: SadaqahPageContent = {
  visible: {
    hero: true,
    why: true,
    stories: true,
    giving: true,
    choose: true,
    ctaBand: true,
  },

  hero: {
    eyebrow: "Sadaqah",
    headingStart: "Giving with Compassion",
    headingAccent: "Changing Lives",
    body: "Your Sadaqah provides immediate relief, long-term support, and hope to families facing hardship. Every act of charity brings blessings and transforms lives.",
    cta: "Make A Donation",
    form: "sadaqah",
    image: `${ASSETS}/hero.png`,
    imageAlt: "A child supported by Human Concern USA",
  },

  why: {
    eyebrow: "A voluntary charity",
    headingStart: "What is",
    headingAccent: "Sadaqah",
    headingEnd: "?",
    lead: "Given for the love of Allah.",
    body: "Sadaqah is a voluntary act of giving that reflects compassion and generosity. It supports individuals and families in need providing food, medicine, clean water, shelter, education, and emergency relief. Unlike Zakat, Sadaqah can be given at any time, in any amount, and to anyone facing difficulty.",
    cta: "Give Sadaqah Today",
    form: "sadaqah",
    cards: [
      { title: "Voluntary Charity" },
      { title: "Given Anytime" },
      { title: "Supports All in Need" },
      { title: "Brings Blessings" },
    ],
  },

  stories: {
    eyebrow: "Real people. Real impact. Real gratitude.",
    headingStart: "Lives",
    headingAccent: "Transformed",
    headingEnd: "Through Your Sadaqah",
    videoId: "cHJhSoDDK0g",
  },

  giving: {
    eyebrow: "Feed families in need",
    headingStart: "Giving",
    headingAccent: "Levels",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "sadaqah",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "sadaqah",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "sadaqah",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "sadaqah",
      },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "sadaqah",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
    points: [
      "Serving vulnerable communities with transparency and dignity",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};
