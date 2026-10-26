/*
  The Gaza Scholarship page wording.

  This page had its copy baked into the components; it lives here now, so the admin can edit it
  like every other page. Headings keep their red words as their own fields, because the design
  sets a different face on them.
*/

import type { HealthcarePageContent } from "./healthcare";

export type GazaStep = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type GazaStat = { value: number; label: string };
export type GazaItem = { line1: string; line2: string };
export type GazaGivingLevel = { amount: string; text: string };

export type GazaPageContent = {
  hero: {
    badge: string;
    headingStart: string;
    headingAccent: string;
    headingAccentTwo: string;
    headingMiddle: string;
    headingEnd: string;
    body: string;
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
  alert: string;
  why: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    cta: string;
    form: string;
    image: string;
    imageAlt: string;
  };
  helps: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: GazaItem[];
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
    steps: GazaStep[];
  };
  stats: GazaStat[];
  giving: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    levels: GazaGivingLevel[];
    cta: string;
    form: string;
  };
  video: { image: string; imageAlt: string; videoId: string };
  choose: HealthcarePageContent["choose"];
};

const ASSETS = "/images/gaza-scholarship";

export const gazaScholarshipDefaults: GazaPageContent = {
  hero: {
    badge: "Emergency Relief",
    headingStart: "Palestine",
    headingAccent: "Hardship",
    headingAccentTwo: "",
    headingMiddle: "Fund",
    headingEnd: "",
    body: "Amid crisis and destruction, thousands of students in Gaza are fighting to continue their education. You can help restore hope and rebuild lives by supporting emergency scholarship assistance.",
    cta: "Donate Now",
    form: "gaza",
    image: `${ASSETS}/hero.png`,
    imageAlt: "Scholarship recipients and staff at the Gaza medical student programme",
  },

  alert: "Alert - Immediate Help Needed",

  why: {
    eyebrow: "Education Interrupted — Futures at Risk",
    headingStart: "Why This",
    headingAccent: "Scholarship",
    headingEnd: "Matters",
    body: "Due to ongoing conflict, thousands of students have lost access to schools, universities, and educational resources. Many have lost family support and financial ability to continue their studies. Without emergency assistance, a generation may lose its future.",
    cta: "Provide Lifesaving Support",
    form: "gaza",
    image: `${ASSETS}/why-matters.png`,
    imageAlt: "Medical students working in a teaching laboratory in Gaza",
  },

  helps: {
    headingStart: "How Your",
    headingAccent: "Donation",
    headingEnd: "Helps",
    items: [
      { line1: "Emergency", line2: "Food Packs" },
      { line1: "Clean Water", line2: "& Filtration" },
      { line1: "Medical Aid", line2: "& Treatment" },
      { line1: "Shelter & Basic", line2: "Survival Kits" },
      { line1: "Child & Family", line2: "Support" },
      { line1: "Hygiene &", line2: "Emergency Kits" },
    ],
    image: `${ASSETS}/how-donation-helps.png`,
    imageAlt: "Smoke rising over buildings in Gaza",
    cta: "Provide Lifesaving Support",
    form: "gaza",
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

  stats: [
    { value: 1096, label: "Medical Students" },
    { value: 44, label: "Faculty Members Helped" },
  ],

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
    form: "gaza",
  },

  video: {
    image: `${ASSETS}/video.png`,
    imageAlt: "Video: the Gaza Scholarship appeal",
    videoId: "wWFgSIV26aE",
  },

  choose: {
    headingStart: "Why",
    headingAccent: "Choose",
    headingEnd: "Human Concern USA?",
    cta: "Provide Lifesaving Support",
    form: "gaza",
    image: `${ASSETS}/choose.png`,
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
