/*
  The Contact Us page wording, taken from the three reference screenshots.
*/

export type HelpRow = {
  label: string;
  icon: string;
};

export type ContactPageContent = {
  hero: {
    headingAccent: string;
    headingEnd: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
  };

  help: {
    headingStart: string;
    headingAccent: string;
    headingEnd: string;
    body: string;
    rows: HelpRow[];
    image: string;
    imageAlt: string;
  };

  form: {
    headingStart: string;
    headingAccent: string;
    note: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    placeholder: string;
    cta: string;
  };
};

const ASSETS = "/images/contact";

export const contactDefaults: ContactPageContent = {
  hero: {
    headingAccent: "Connect",
    headingEnd: "with Us",
    body: "Have a question, need support, or want to get involved? Our team is ready to assist you with care and responsibility.",
    primaryCta: "Get In Touch",
    secondaryCta: "Call or Email Us Directly",
    image: `${ASSETS}/hero.png`,
    imageAlt: "A Human Concern USA worker taking a photo with children",
  },

  help: {
    headingStart: "How Can We",
    headingAccent: "Help",
    headingEnd: "You?",
    body: "We value every inquiry and respond with respect, transparency, and a commitment to serve. Whether you need information about donations, volunteering, partnership opportunities, or general assistance, we're here for you.",
    rows: [
      { label: "Donation or fundraising support", icon: "headset" },
      { label: "Partnership or collaboration requests", icon: "people" },
      { label: "Volunteering information", icon: "heart" },
      { label: "Website or payment support", icon: "desktop" },
      { label: "General questions & feedback", icon: "question" },
    ],
    image: `${ASSETS}/help.png`,
    imageAlt: "Volunteers loading aid sacks into a truck under the Human Concern banner",
  },

  form: {
    headingStart: "Send Us a",
    headingAccent: "Message",
    note: "Fill out the form below and our team will get back to you shortly.",
    nameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    messageLabel: "Message",
    placeholder: "Enter details here",
    cta: "Send Message",
  },
};
