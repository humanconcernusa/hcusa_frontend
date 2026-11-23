/*
  The Water Aid page wording.

  It follows the food-aid and healthcare pages' shape exactly, because the page renders those
  pages' sections. The values below are the shipped wording: with no admin screen, the page
  renders these directly.

  Every button opens the "general" popup for now. The amount and wording inside it are edited on
  the admin forms screen.
*/

import type { HealthcarePageContent } from "./healthcare";

export type WaterAidPageContent = Omit<HealthcarePageContent, "why"> & {
  /* Which donation popup the "Why" band's button opens. */
  why: HealthcarePageContent["why"] & { form: string };
};

/* The page's own artwork, saved under public/images/water-aid. */
const ASSETS = "/images/water-aid";

export const waterAidDefaults: WaterAidPageContent = {
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
    /* Two red words here: the heading sets them both in the accent face, and the narrow card
       wraps them onto two lines. */
    eyebrow: "Water Aid",
    headingStart: "Clean Water",
    headingAccent: "Changes Everything",
    body: "For millions without safe water your support builds wells, restores health, and transforms entire communities.",
    cta: "Make A Donation",
    form: "water-aid",
    image: `${ASSETS}/hero.webp`,
    imageAlt: "A woman drawing water from a hand pump",
  },

  why: {
    eyebrow: "Water is the foundation",
    headingStart: "Why",
    headingAccent: "Access",
    headingEnd: "to Clean Water is Essential",
    lead: "Health, education, stability, and dignity.",
    body: "Millions of families struggle every day without access to safe drinking water. Contaminated water causes preventable illness, keeps children out of school, and traps communities in poverty. With sustainable water systems, families stay healthy, children stay in school, and communities grow stronger.",
    cta: "Donate to our Cause",
    form: "water-aid",
    cards: [
      { title: "Safe Drinking Water" },
      { title: "Health & Hygiene" },
      { title: "Education & Stability" },
      { title: "Economic & Agricultural" },
    ],
  },

  stories: {
    eyebrow: "Protecting families and restoring dignity",
    headingStart: "Your",
    headingAccent: "Support",
    headingEnd: "Creates Real Impact",
    videoId: "AFxUBKVJn68",
    image: `${ASSETS}/video.jpg`,
    imageAlt:'Protecting families and restoring dignity'
  },

  counters: {
    firstCaption: "Impacted",
    firstLabel: "People",
    firstValue: 111334,
    secondCaption: "Delivered",
    secondLabel: "Projects",
    secondValue: 10,
  },

  giving: {
    eyebrow: "Transform a community",
    headingStart: "Ways",
    headingAccent: "to Give",
    levels: [
      {
        amount: "60",
        text: "Emergency meals for a family",
        cta: "Donate Now",
        form: "water-aid",
      },
      {
        amount: "100",
        text: "Clean water for multiple families",
        cta: "Donate Now",
        form: "water-aid",
      },
      {
        amount: "250",
        text: "Medical aid & critical care support",
        cta: "Donate Now",
        form: "water-aid",
      },
      {
        amount: "500",
        text: "Emergency shelter & survival kit",
        cta: "Donate Now",
        form: "water-aid",
      },
    ],
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "water-aid",
    image: `${ASSETS}/why-choose.jpg`,
    imageAlt: "A Human Concern USA field worker sitting with a family",
    points: [
      "46 years of trusted humanitarian service",
      "Transparent & Accountable",
      "Partnered with certified medical organizations",
      "Rapid crisis response teams",
      "Serving globally & locally",
    ],
  },
};
