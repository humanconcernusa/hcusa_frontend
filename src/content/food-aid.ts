/*
  The Food Aid page wording.

  It follows the healthcare page's shape exactly, because the page renders that page's
  sections. The values below are the shipped wording: with no admin screen yet, the page
  renders these directly.

  Every button opens the "general" popup for now. The amount and wording inside it are edited
  on the admin forms screen.
*/

import type { HealthcarePageContent } from "./healthcare";

export type FoodAidPageContent = Omit<HealthcarePageContent, "why"> & {
  /* Which donation popup the "Why" band's button opens. */
  why: HealthcarePageContent["why"] & { form: string };
};

/* The page's own artwork, saved under public/images/food-aid. */
const ASSETS = "/images/food-aid";

export const foodAidDefaults: FoodAidPageContent = {
  visible: {
    hero: true,
    why: true,
    stories: true,
    counters: true,
    giving: true,
    choose: true,
    ctaBand: true,
  },

  hero: {
    eyebrow: "Food Aid",
    headingStart: "Nourishing Lives",
    headingAccent: "Restoring Hope",
    body: "Your support provides essential food packs, meals, and sustainable nourishment to families facing hunger and crisis worldwide.",
    cta: "Make A Donation",
    form: "food-aid",
    image: `${ASSETS}/hero.webp`,
    imageAlt: "A Human Concern USA volunteer handing out food parcels",
  },

  why: {
    eyebrow: "Families struggle to put food on the table",
    headingStart: "Why",
    headingAccent: "Food",
    headingEnd: "Aid is Critical",
    lead: "",
    body: "Hunger affects more than 828 million people globally, including children at risk of acute malnutrition. Human Concern USA delivers emergency food packages, cooked meals, and long-term nutrition programs to support vulnerable communities. Your donation ensures families can survive, rebuild, and thrive.",
    cta: "Help Save Lives",
    form: "food-aid",
    cards: [
      { title: "Medical Treatments" },
      { title: "Child Healthcare" },
      { title: "Medication" },
      { title: "Medical Aid" },
    ],
  },

  stories: {
    eyebrow: "Hunger Relief",
    headingStart: "Lives",
    headingAccent: "Transformed",
    headingEnd: "Through Food Aid",
    videoId: "mLUQCcNoKDg",
  },

  counters: {
    firstLabel: "People",
    firstCaption: "Impacted",
    firstValue: 44826,
    secondLabel: "Households",
    secondCaption: "Reached",
    /* Stand-in until you send the real figure. */
    secondValue: 45280,
  },

  giving: {
    eyebrow: "Every gift puts food on a table",
    headingStart: "Giving",
    headingAccent: "Levels",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "food-aid",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "food-aid",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "food-aid",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "food-aid",
      },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "food-aid",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
    points: [
      "Serving vulnerable communities with transparency and dignity.",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};
