/*
  The Travel With Us page wording, taken from the seven reference screenshots.

  The three letters are transcribed from the screenshots, where they are small — worth a read
  against the originals.
*/

export type TravelExperience = {
  name: string;
  programme: string;
  letter: string;
  image: string;
  imageAlt: string;
};

export type TravelFormField = {
  name: string;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  half?: boolean;
};

export type TravelPageContent = {
  visible: Record<"hero" | "about" | "how" | "discover" | "experiences" | "form" | "ctaBand", boolean>;

  hero: {
    headingAccent: string;
    headingEnd: string;
    body: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  about: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    cta: string;
    image: string;
    imageAlt: string;
  };

  how: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    steps: { title: string; body: string }[];
  };

  discover: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };

  experiences: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    items: TravelExperience[];
  };

  form: {
    eyebrow: string;
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    panelTitle: string;
    panelSubtitle: string;
    fields: TravelFormField[];
    healthLabel: string;
    healthHint: string;
    cta: string;
  };
};

/* The page's own artwork, saved under public/images/travel. */
const ASSETS = "/images/travel";

export const travelDefaults: TravelPageContent = {
  visible: {
    hero: true,
    about: true,
    how: true,
    discover: true,
    experiences: true,
    form: true,
    ctaBand: true,
  },

  hero: {
    headingAccent: "Travel",
    headingEnd: "With Us",
    body: "Experience a Transformative Journey of Service, Learning, and Global Impact.",
    cta: "Apply to Join a Trip",
    image: `${ASSETS}/hero.jpg`,
    imageAlt: "Human Concern USA volunteers carrying food boxes at a camp",
  },

  about: {
    headingStart: "About",
    headingAccent: "Travel",
    headingEnd: "With Human Concern USA",
    body: "Travel With gives participants a rare opportunity to witness firsthand the impact of humanitarian work, engage with local teams, and support sustainable projects in underserved regions around the world. Each trip is designed around learning, service, cultural immersion, and personal transformation.",
    cta: "Learn About Our Work",
    image: `${ASSETS}/about.png`,
    imageAlt: "Volunteers packing meal trays at a community kitchen",
  },

  how: {
    eyebrow: "Our streamlined process ensures a safe, supported, and meaningful experience.",
    headingStart: "How It",
    headingAccent: "Works",
    steps: [
      {
        title: "Initial Contact",
        body: "Our team will personally reach out to you to establish a connection and discuss your involvement.",
      },
      {
        title: "Coaching and Training",
        body: "We will provide personalized coaching and training on effective fundraising strategies to help you meet your goal.",
      },
      {
        title: "Set Fundraising Goal",
        body: "You will receive a specific fundraising target to achieve before your chosen trip.",
      },
      {
        title: "Trip Planning",
        body: "Once you reach your fundraising target, we will proceed with further discussions to finalize your trip details.",
      },
    ],
  },

  discover: {
    eyebrow: "Travel With Us",
    headingStart: "Discover a",
    headingAccent: "Transformative Experience",
    headingEnd: "to Learn, Understand, and Give Back",
    paragraphs: [
      "Our program invites community members to embark on a life-changing journey with Human Concern USA, offering a unique opportunity to contribute to humanitarian efforts in developing regions. Participants will work closely with our dedicated staff to implement and sustain impactful projects in these communities. Central to our approach is the principle of Ihsan—striving for excellence in every action while fostering a deep commitment to ethical and compassionate engagement.",
      "This journey goes beyond successful fundraising; it is an immersive experience that embodies the values of Ihsan, encouraging participants to engage with mindfulness and dedication, thereby making a meaningful difference in the lives we touch.",
    ],
    image: `${ASSETS}/map.png`,
    imageAlt: "World map showing the countries where Human Concern USA works",
  },

  experiences: {
    eyebrow: "Real stories from the field.",
    headingStart: "Travel",
    headingAccent: "Experiences",
    items: [
      {
        name: "Rifat, Bangladesh CSP",
        programme: "Recipient",
        letter:
          "Assalamu Alaikum. I am Rifat Hasan (Child ID: HEIBD-008), a Grade 6 student. I received my Eid gift through Human Concern USA and I feel very happy and grateful. Thank you for your kindness and support. May Allah bless and reward you always.",
        image: `${ASSETS}/experience-rifat.webp`,
        imageAlt: "Rifat, a sponsored child in Bangladesh, holding her Eid gift",
      },
      {
        name: "Somira, Rohingya CSP",
        programme: "Recipient",
        letter:
          "Assalamu Alaikum, I am Somira (HCI ID: 366). Thank you to Human Concern USA and the generous donors for your lovely gift. My family and I are very grateful. May Allah bless you for supporting children like me.",
        image: `${ASSETS}/experience-somira.webp`,
        imageAlt: "Somira, a sponsored child, holding up her thank-you note",
      },
      {
        name: "Shofut, Rohingya CSP",
        programme: "Recipient",
        letter:
          "Assalamu Alaikum. My name is Shofiul Kader (ID: 395). Thank you to Human Concern USA and my donors for the Ramadan gift. Your kindness brought joy to my family. May Allah (swt) bless you and accept your good deeds.",
        image: `${ASSETS}/experience-shofut.webp`,
        imageAlt: "Shofiul Kader holding up his thank-you letter",
      },
    ],
  },

  form: {
    eyebrow: "Be the first to know when a trip is coming",
    headingStart: "Register Your",
    headingAccent: "Interest",
    headingEnd: "",
    panelTitle: "Travel with HC USA",
    panelSubtitle: "Registration Form",
    fields: [
      { name: "firstName", label: "First Name", half: true, required: true },
      { name: "lastName", label: "Last Name", half: true, required: true },
      {
        name: "phone",
        label: "Phone Number",
        half: true,
        required: true,
        placeholder: "(000) 000-0000",
      },
      {
        name: "email",
        label: "Email",
        half: true,
        required: true,
        placeholder: "example@example.com",
      },
      {
        name: "gender",
        label: "Gender",
        half: true,
        required: true,
        hint: "Male/Female",
      },
      {
        name: "country",
        label: "Country of Residence",
        half: true,
        required: true,
      },
      {
        name: "citizenship",
        label: "Citizenship (listed on passport)",
        half: true,
        required: true,
      },
      { name: "occupation", label: "Occupation", half: true, required: true },
    ],
    healthLabel: "Do you have any Health Concerns/Mental Health Disorders we should know of?",
    healthHint: "If YES please explain",
    cta: "Submit",
  },
};
