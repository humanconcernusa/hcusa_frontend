/*
  The Palestine Emergency Relief page wording. The two component files under
  src/components/palestine-relief read from here, so the admin can edit this page's copy
  without touching code.

  Every donate button on this page carries a `form`: the donation popup it opens. The admin
  picks it from a dropdown, which appears automatically beside any `cta` that has a `form`
  next to it.
*/

import type { HealthcarePageContent } from "./healthcare";

export type PalestineCard = {
  title: string;
  body: string;
};

export type PalestineReliefItem = {
  line1: string;
  line2: string;
  icon: string;
};

export type PalestineStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type PalestineGivingLevel = {
  amount: string;
  text: string;
};

export type PalestinePageContent = {
  hero: {
    badge: string;
    headingLine: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
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
    cards: PalestineCard[];
    image: string;
    imageAlt: string;
    cta: string;
    form: string;
  };
  helps: {
    headingStart: string;
    headingAccent: string;
    headingAccentTwo: string;
    headingEnd: string;
    items: PalestineReliefItem[];
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
    steps: PalestineStep[];
  };
  video: {
    image: string;
    imageAlt: string;
    videoId: string;
  };
  counters: HealthcarePageContent["counters"];
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: PalestineGivingLevel[];
    cta: string;
    form: string;
  };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/palestine-relief";

export const palestineDefaults: PalestinePageContent = {
  hero: {
    badge: "Emergency Relief",
    headingLine: "Palestine",
    headingAccent: "Emergency",
    headingEnd: "Relief",
    body: "Provide immediate life-saving food, medical aid, and clean water to families facing the humanitarian catastrophe in Palestine.",
    cta: "Donate Now",
    form: "palestine",
    image: `${ASSETS}/hero.webp`,
    imageAlt: "A family in Palestine supported by the Palestine Emergency Relief appeal",
  },

  alert: "Alert - Immediate Help Needed",

  happening: {
    eyebrow: "Severe humanitarian emergency impacting millions.",
    headingStart: "What's",
    headingAccent: "Happening",
    headingEnd: "in Palestine",
    cards: [
      {
        title: "Catastrophic Conditions",
        body: "Ongoing violence has left thousands of families vulnerable. Immediate action is the only way to save lives.",
      },
      {
        title: "Overcrowded Shelters",
        body: "With homes destroyed, many are forced into shelters without electricity or basic safety.",
      },
      {
        title: "Food & Clean Water",
        body: "Access to nutrition and clean water is non-existent for many living in overcrowded conditions.",
      },
      {
        title: "Medical Access",
        body: "Hospitals are unreachable for many, and medicine and professional healthcare are in critically short supply.",
      },
    ],
    image: `${ASSETS}/whats-happening.jpg`,
    imageAlt: "Children in Gaza standing among the rubble of destroyed homes",
    cta: "Provide Lifesaving Support",
    form: "palestine",
  },

  helps: {
    headingStart: "How",
    headingAccent: "Your",
    headingAccentTwo: "Donation",
    headingEnd: "Helps",
    items: [
      {
        line1: "Emergency",
        line2: "Food Packs",
        icon: `${ASSETS}/relief-food-packs.svg`,
      },
      { line1: "Clean Water", line2: "& Filtration", icon: `${ASSETS}/relief-water.svg` },
      { line1: "Medical Aid", line2: "& Treatment", icon: `${ASSETS}/relief-medical.svg` },
      { line1: "Shelter & Basic", line2: "Survival Kits", icon: `${ASSETS}/relief-shelter.svg` },
      { line1: "Child & Family", line2: "Support", icon: "" },
      { line1: "Hygiene &", line2: "Emergency Kits", icon: "" },
    ],
    image: `${ASSETS}/how-donation-helps.jpg`,
    imageAlt: "Families waiting for hot meals in Gaza",
    cta: "Provide Lifesaving Support",
    form: "palestine",
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
        title: "Identify Critical Needs",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-1.png`,
      },
      {
        number: "02",
        title: "Deploy Emergency Supplies",
        text: "Begin the journey of change",
        image: `${ASSETS}/step-2.png`,
      },
      {
        number: "03",
        title: "Sustain and Rebuild",
        text: "Deploy Emergency Supplies",
        image: `${ASSETS}/step-3.png`,
      },
    ],
  },

  video: {
    image: `${ASSETS}/video.png`,
    imageAlt: "Video: the Gaza emergency appeal",
    videoId: "rCMwyQKI64Q",
  },

  counters: {
    firstCaption: "Reached",
    firstLabel: "Individuals",
    firstValue: 500000,
    secondCaption: "Delivered",
    secondLabel: "kg of Food Aid",
    secondValue: 1576080,
  },

  giving: {
    eyebrow: "Every gift helps save lives",
    headingStart: "How You Can",
    headingAccent: "Help",
    headingEnd: "Right Now",
    levels: [
      { amount: "60", text: "Emergency meals for a family" },
      { amount: "100", text: "Clean water for multiple families" },
      { amount: "250", text: "Medical aid & critical care support" },
      { amount: "500", text: "Emergency shelter & survival kit" },
    ],
    cta: "Donate Now",
    form: "palestine",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "palestine",
    image: `${ASSETS}/choose.jpg`,
    imageAlt: "Human Concern USA volunteers packing food boxes",
    points: [
      "Serving vulnerable communities with transparency and dignity.",
      "Rapid emergency relief deployment",
      "Local partner networks for access & accuracy",
      "Transparent reporting & donor accountability",
      "Faith-driven humanitarian values",
    ],
  },
};
