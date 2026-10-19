/*
  The Volunteer page wording, taken from the five reference screenshots.

  This page has its own shape rather than the shared appeal shape: it has no counters, no video,
  no giving levels and no Why Choose band.
*/

export type VolunteerPageContent = {
  visible: Record<"hero" | "why" | "opportunities" | "experiences" | "steps", boolean>;

  hero: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
  };

  why: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  opportunities: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    cards: { title: string }[];
    cta: string;
  };

  experiences: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };

  steps: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    steps: string[];
    cta: string;
  };
};

/* The page's own artwork, saved under public/images/volunteer. */
const ASSETS = "/images/volunteer";

export const volunteerDefaults: VolunteerPageContent = {
  visible: {
    hero: true,
    why: true,
    opportunities: true,
    experiences: true,
    steps: true,
  },

  hero: {
    eyebrow: "Volunteer with us",
    headingStart: "Serve",
    headingAccent: "Humanity",
    headingEnd: "Create Impact",
    body: "Join a community of compassionate volunteers changing lives through service, dedication, and meaningful action. Together, we can make a difference locally and globally.",
    primaryCta: "Become a Volunteer",
    secondaryCta: "Learn How You Can Help",
    image: `${ASSETS}/hero.jpg`,
    imageAlt: "Children supported by Human Concern USA raising their hands",
  },

  why: {
    headingStart: "Why",
    headingAccent: "Your Time",
    headingEnd: "Matters",
    body: "Volunteers are at the heart of Human Concern USA. From supporting emergency response to organizing community events and fundraising activities, volunteers make real impact every day. Your skills, time, and compassion help uplift families in need and strengthen our communities.",
    cta: "Join the Volunteer Network",
    image: `${ASSETS}/why-time.webp`,
    imageAlt: "Human Concern USA volunteers carrying food parcels at a camp",
  },

  opportunities: {
    eyebrow: "Serve where your passion and skills fit best.",
    headingStart: "Volunteer",
    headingAccent: "Opportunities",
    cards: [
      { title: "Community outreach & support" },
      { title: "Food distribution & meal packing" },
      { title: "Event support & fundraising campaigns" },
      { title: "Emergency Relief Assistance" },
    ],
    cta: "Join the Volunteer Network",
  },

  experiences: {
    eyebrow: "Volunteer with us",
    headingStart: "Real",
    headingAccent: "Experiences",
    headingEnd: "from Our Volunteers",
    paragraphs: [
      "Join Human Concern USA as a volunteer and play a vital role in our global mission to create positive change in underserved communities.",
      "At Human Concern USA, we are committed to your growth and empowerment. Our innovative fundraising strategies and personalized one-on-one training with experienced fundraisers and professional coaches are designed to help you reach your full potential.",
      "We deeply value you, your time, effort, and dedication are vital to who we are.",
      "As a volunteer with Human Concern USA, you're not just participating in our projects; you're a crucial part of our identity and success. Sign up today to embark on this transformative journey.",
    ],
    image: `${ASSETS}/experiences.png`,
    imageAlt: "A volunteer with a young person holding a bowl of food",
  },

  steps: {
    eyebrow: "Simple, supportive, and meaningful process.",
    headingStart: "What to",
    headingAccent: "Expect",
    headingEnd: "When You Join",
    steps: [
      "Submit the volunteer registration form",
      "Attend the orientation session",
      "Complete the background check",
      "Begin your volunteer assignment",
    ],
    cta: "Join the Volunteer Network",
  },
};
