/*
  The Work With Us (Careers) page wording, taken from the four reference screenshots.

  This page has its own shape rather than the shared appeal shape: hero, why, jobs, resume form.
  Openings live in an array, so a second one needs no layout work.
*/

export type JobOpening = {
  eyebrow: string;
  headingStart: string;
  headingAccent: string;
  hours: string;
  location: string;
  paragraphs: string[];
  quote: string;
  deadline: string;
  cta: string;
  /* The role's job description, a Google Drive PDF, opened in a new tab. */
  url: string;
};

export type CareerPageContent = {
  visible: Record<"hero" | "why" | "jobs" | "resume" | "ctaBand", boolean>;

  hero: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  why: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    lead: string;
    points: string[];
    image: string;
    imageAlt: string;
  };

  jobs: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    items: JobOpening[];
  };

  resume: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    title: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    rolesLabel: string;
    roles: string[];
    uploadBold: string;
    uploadRest: string;
    uploadHint: string;
    cta: string;
  };
};

/* The page's own artwork, saved under public/images/careers. */
const ASSETS = "/images/careers";

export const careerDefaults: CareerPageContent = {
  visible: {
    hero: true,
    why: true,
    jobs: true,
    resume: true,
    ctaBand: true,
  },

  hero: {
    eyebrow: "Join a mission-driven team",
    headingStart: "Build Your Career With",
    headingAccent: "Human Concern",
    headingEnd: "USA",
    body: "Become part of a global effort dedicated to saving lives, empowering communities, and creating long-term change. Explore meaningful roles where your work truly matters.",
    cta: "View Featured Roles",
    image: `${ASSETS}/hero.png`,
    imageAlt: "Human Concern USA volunteers packing food boxes in a warehouse",
  },

  why: {
    eyebrow: "Make a difference, find purpose",
    headingStart: "Why You'll",
    headingAccent: "Love Working",
    headingEnd: "at HCUSA",
    lead: "Join Human Concern USA",
    points: [
      "You will be part of a mission that transforms lives across the globe.",
      "You will experience steady growth through training and programs.",
      "You will collaborate with teams who share a commitment to service.",
      "You will see the impact of your work on the families we serve.",
      "You will receive competitive compensation and comprehensive benefits.",
      "You will be recognized for your contributions and encouraged to innovate.",
    ],
    image: `${ASSETS}/why-hcusa.webp`,
    imageAlt: "Children supported by Human Concern USA",
  },

  jobs: {
    headingStart: "Featured",
    headingAccent: "Job",
    headingEnd: "Openings",
    items: [
      {
        eyebrow: "Make a difference, find purpose",
        headingStart: "Fundraising",
        headingAccent: "Officer",
        hours: "Full time — 37.5 hrs/week",
        location: "Indiana, USA",
        paragraphs: [
          "Are you someone who enjoys getting involved in the community and is passionate about humanitarian work?",
          "Then this position is for you!",
          "As a Fundraising Officer, you will be HC USA's focal point of contact in the community with the goal of increasing brand awareness, building partnerships, and raising funds for causes that matter.",
        ],
        quote:
          "You are someone who has a friendly and outgoing personality who loves to connect with people and motivate them towards doing good.",
        deadline: "Apply by 30 May",
        cta: "View Role",
        url: "https://drive.google.com/",
      },
    ],
  },

  resume: {
    eyebrow: "Join Human Concern USA",
    headingStart: "Didn't Find the",
    headingAccent: "Right",
    headingEnd: "Role?",
    title: "Submit Your Resume",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    rolesLabel: "Fundraising",
    roles: ["Fundraising"],
    uploadBold: "Upload a file",
    uploadRest: "or drag and drop",
    uploadHint: "PDF, DOC, DOCX up to 10MB",
    cta: "Submit Resume",
  },
};
