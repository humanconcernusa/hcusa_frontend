/*
  The Sudan Emergency Relief page wording. The two component files under
  src/components/sudan-relief read from here, so the admin can edit this page's copy without
  touching code.

  Every donate button on this page carries a `form`: the donation popup it opens. The admin
  picks it from a dropdown, which appears automatically beside any `cta` that has a `form`
  next to it.
*/

import type { HealthcarePageContent } from "./healthcare";

export type SudanCard = {
  title: string;
  body: string;
};

export type SudanReliefItem = {
  line1: string;
  line2: string;
  /* The saved icon for this tile. Empty on the last two, which keep the drawn one. */
  icon: string;
};

export type SudanStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type SudanStat = {
  value: number;
  label: string;
};

export type SudanGivingLevel = {
  amount: string;
  text: string;
};

export type SudanPageContent = {
  hero: {
    badge: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
  alert: string;
  happening: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    cards: SudanCard[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  helps: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: SudanReliefItem[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  responds: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    subtitle: string;
    steps: SudanStep[];
  };
  stats: SudanStat[];
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: SudanGivingLevel[];
    cta: string;
    form: string;
  };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/sudan-relief";

export const sudanDefaults: SudanPageContent = {
  hero: {
    badge: "Emergency Relief",
    headingAccent: "Stand",
    headingEnd: "with Sudan",
    paragraphs: [
      "Sudan is facing one of the world's most severe humanitarian catastrophes.",
      "Fighting between the Sudanese Armed Forces (SAF) and the Rapid Support Forces (RSF) now in its third year has displaced millions and disrupted essential systems and services that sustain daily life.",
    ],
    cta: "Donate Now",
    form: "sudan",
    image: `${ASSETS}/hero.png`,
    imageAlt: "Human Concern USA workers preparing hot meals for families in Sudan",
  },

  alert: "Alert - Immediate Help Needed",

  happening: {
    eyebrow: "Emergency relief is urgent",
    headingStart: "What's",
    headingAccent: "Happening",
    headingEnd: "in Sudan",
    cards: [
      {
        title: "Evidence of Atrocities",
        body: "Verified reports confirm mass violence, killings, and graves alongside ethnic cleansing. Documentation: BBC, Yale University's Humanitarian Research Lab, and The Guardian.",
      },
      {
        title: "Critical Pediatric Malnutrition",
        body: "75% of children under 5 arriving from El Fasher show signs of malnutrition. Local hospitals are critically strained. Source: BBC / MSF.",
      },
      {
        title: "A Historic Warning",
        body: "The scale of the current situation has reached a catastrophic comparison. Source: Yale's Humanitarian Research Lab.",
      },
    ],
    image: `${ASSETS}/whats-happening.webp`,
    imageAlt: "Children carrying relief supplies at a camp in Sudan",
    cta: "Provide Lifesaving Support",
    form: "sudan",
  },

  helps: {
    headingStart: "How Your",
    headingAccent: "Donation",
    headingEnd: "Helps",
    items: [
      { line1: "Emergency", line2: "Food Packs", icon: `${ASSETS}/relief-food-packs.svg` },
      { line1: "Clean Water", line2: "& Filtration", icon: `${ASSETS}/relief-water.svg` },
      { line1: "Medical Aid", line2: "& Treatment", icon: `${ASSETS}/relief-medical.svg` },
      {
        line1: "Shelter & Basic",
        line2: "Survival Kits",
        icon: `${ASSETS}/relief-shelter.svg`,
      },
      { line1: "Child & Family", line2: "Support", icon: "" },
      { line1: "Hygiene &", line2: "Emergency Kits", icon: "" },
    ],
    image: `${ASSETS}/how-donation-helps.png`,
    imageAlt: "A health worker caring for a patient in Sudan",
    cta: "Provide Lifesaving Support",
    form: "sudan",
  },

  responds: {
    eyebrow: "Rapid, local-partner supported",
    headingStart: "How Human Concern",
    headingAccent: "USA Responds",
    headingEnd: "to Crisis",
    subtitle: "Accountable action",
    steps: [
      {
        number: "01",
        title: "Identify Rapid Needs Assessment",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-1.png`,
      },
      {
        number: "02",
        title: "Emergency Distribution",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-2.png`,
      },
      {
        number: "03",
        title: "Long-term Recovery Support",
        text: "Deploy Emergency Supplies",
        image: `${ASSETS}/step-3.png`,
      },
    ],
  },

  stats: [
    { value: 924, label: "Water wells to be completed in 2026" },
    { value: 340, label: "Hand pumps to be completed in 2026" },
  ],

  giving: {
    eyebrow: "Your gift powers emergencies where it's needed most",
    headingStart: "Food &",
    headingAccent: "Hygiene",
    headingEnd: "Assistance",
    levels: [
      { amount: "60", text: "Emergency meals for a family" },
      { amount: "100", text: "Clean water for multiple families" },
      { amount: "250", text: "Medical aid & critical care support" },
      { amount: "500", text: "Emergency shelter & survival kit" },
    ],
    cta: "Donate Now",
    form: "sudan",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "sudan",
    image: `${ASSETS}/choose.png`,
    imageAlt: "Human Concern USA volunteers packing food boxes",
    points: [
      "45+ years of trusted humanitarian service.",
      "Rapid emergency relief deployment",
      "Local partner networks for access & accuracy",
      "Transparent reporting & donor accountability",
      "Faith-driven humanitarian values",
    ],
  },
};
