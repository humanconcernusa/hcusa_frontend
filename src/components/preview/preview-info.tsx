"use client";

import {
  AboutHero,
  ImpactGrid,
  Partners,
  Stories,
  Timeline,
} from "@/components/about/about-static";
import { Approach, WhatDrivesUs } from "@/components/about/about-interactive";
import { BlogsBody, type BlogList } from "@/components/blogs/blogs-body";
import { CareersHero } from "@/components/careers/careers-hero";
import { FeaturedJobOpenings, WhyHcusa } from "@/components/careers/careers-sections";
import { ResumeForm } from "@/components/careers/resume-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { SendMessage } from "@/components/contact/contact-form";
import { HowCanWeHelp } from "@/components/contact/contact-sections";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import {
  BoardSection,
  Integrity,
  JoinBand,
  StandFor,
  TeamHero,
  TeamSection,
} from "@/components/our-team/our-team-sections";
import { PolicyAccordion, PrivacyHero } from "@/components/privacy/privacy-sections";
import {
  GlobalMap,
  ReportsHero,
  ReportsIntro,
  ReportsList,
} from "@/components/reports/reports-sections";
import { TravelDiscover } from "@/components/travel/travel-discover";
import { TravelExperiences } from "@/components/travel/travel-experiences";
import { TravelForm } from "@/components/travel/travel-form";
import { TravelHero } from "@/components/travel/travel-hero";
import { AboutTravel, HowItWorks } from "@/components/travel/travel-sections";
import { VolunteerHero } from "@/components/volunteer/volunteer-hero";
import {
  ExpectSteps,
  Opportunities,
  VolunteerExperiences,
  WhyYourTime,
} from "@/components/volunteer/volunteer-sections";

import type { AboutPageContent } from "@/content/about";
import type { BlogsPageContent } from "@/content/blogs";
import type { CareerPageContent } from "@/content/careers";
import type { ContactPageContent } from "@/content/contact";
import type { OurTeamPageContent } from "@/content/our-team";
import type { PrivacyPageContent } from "@/content/privacy";
import type { ReportsPageContent } from "@/content/reports";
import type { TravelPageContent } from "@/content/travel";
import type { VolunteerPageContent } from "@/content/volunteer";

import { CTA_BAND, Shell, type Chrome } from "./preview-shell";

/*
  The information and company pages, drawn from a draft.

  Each one repeats its real page's composition. The pages that do not show the Quick Donate tab
  say so, so the preview matches the live page rather than a generic frame.
*/

function AboutPreview({ content, chrome }: { content: AboutPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome} padTop={!content.visible.hero} quickDonate={false}>
      {content.visible.hero ? <AboutHero content={content.hero} /> : null}
      {content.visible.timeline ? <Timeline content={content.timeline} /> : null}
      {content.visible.drives ? <WhatDrivesUs content={content.drives} /> : null}
      {content.visible.impact ? <ImpactGrid content={content.impact} /> : null}
      {content.visible.approach ? <Approach content={content.approach} /> : null}
      {content.visible.stories ? <Stories content={content.stories} /> : null}
      {content.visible.partners ? <Partners content={content.partners} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function BlogsPreview({
  content,
  posts,
  chrome,
}: {
  content: BlogsPageContent;
  posts?: unknown;
  chrome: Chrome;
}) {
  const list = (posts as BlogList | undefined) ?? { items: [], page: 1, pageCount: 1 };

  return (
    <Shell chrome={chrome}>
      <BlogsBody content={content} posts={list} />
    </Shell>
  );
}

function CareersPreview({ content, chrome }: { content: CareerPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <CareersHero content={content.hero} /> : null}
      {content.visible.why ? <WhyHcusa content={content.why} /> : null}
      {content.visible.jobs ? <FeaturedJobOpenings content={content.jobs} /> : null}
      {content.visible.resume ? <ResumeForm content={content.resume} /> : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function ContactPreview({ content, chrome }: { content: ContactPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <ContactHero content={content.hero} />
      <HowCanWeHelp content={content.help} />
      <SendMessage content={content.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function OurTeamPreview({ content, chrome }: { content: OurTeamPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome} padTop={!content.visible.hero} quickDonate={false}>
      {content.visible.hero ? <TeamHero content={content.hero} /> : null}
      {content.visible.integrity ? <Integrity content={content.integrity} /> : null}
      {content.visible.team ? <TeamSection content={content.team} /> : null}
      {content.visible.board ? <BoardSection content={content.board} /> : null}
      {content.visible.standFor ? <StandFor content={content.standFor} /> : null}
      {content.visible.join ? <JoinBand content={content.join} /> : null}
    </Shell>
  );
}

function PrivacyPreview({ content, chrome }: { content: PrivacyPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome} padTop={!content.visible.hero} quickDonate={false}>
      {content.visible.hero ? <PrivacyHero content={content.hero} /> : null}
      {content.visible.policy ? <PolicyAccordion content={content.policy} /> : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function ReportsPreview({ content, chrome }: { content: ReportsPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome} padTop={!content.visible.hero} quickDonate={false}>
      {content.visible.hero ? <ReportsHero content={content.hero} /> : null}
      {content.visible.intro ? <ReportsIntro content={content.intro} /> : null}
      {content.visible.list ? <ReportsList content={content.list} /> : null}
      {content.visible.choose ? (
        /* This page draws the band without its button, as the live page does. */
        <ChooseBand content={{ ...content.choose, cta: "" }} formId={content.choose.form} />
      ) : null}
      {content.visible.global ? <GlobalMap content={content.global} /> : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function TravelPreview({ content, chrome }: { content: TravelPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <TravelHero content={content.hero} /> : null}
      {content.visible.about ? <AboutTravel content={content.about} /> : null}
      {content.visible.how ? <HowItWorks content={content.how} /> : null}
      {content.visible.discover ? <TravelDiscover content={content.discover} /> : null}
      {content.visible.experiences ? (
        <TravelExperiences content={content.experiences} />
      ) : null}
      {content.visible.form ? <TravelForm content={content.form} /> : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function VolunteerPreview({
  content,
  chrome,
}: {
  content: VolunteerPageContent;
  chrome: Chrome;
}) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <VolunteerHero content={content.hero} /> : null}
      {content.visible.why ? <WhyYourTime content={content.why} /> : null}
      {content.visible.opportunities ? (
        <Opportunities content={content.opportunities} />
      ) : null}
      {content.visible.experiences ? (
        <VolunteerExperiences content={content.experiences} />
      ) : null}
      {content.visible.steps ? <ExpectSteps content={content.steps} /> : null}
    </Shell>
  );
}

export function InfoPreview({
  page,
  content,
  chrome,
  posts,
}: {
  page: string;
  content: unknown;
  chrome: Chrome;
  posts?: unknown;
}) {
  switch (page) {
    case "about":
      return <AboutPreview content={content as AboutPageContent} chrome={chrome} />;
    case "blogs":
      return (
        <BlogsPreview
          content={content as BlogsPageContent}
          posts={posts}
          chrome={chrome}
        />
      );
    case "careers":
      return <CareersPreview content={content as CareerPageContent} chrome={chrome} />;
    case "contact":
      return <ContactPreview content={content as ContactPageContent} chrome={chrome} />;
    case "our-team":
      return <OurTeamPreview content={content as OurTeamPageContent} chrome={chrome} />;
    case "privacy":
      return <PrivacyPreview content={content as PrivacyPageContent} chrome={chrome} />;
    case "reports":
      return <ReportsPreview content={content as ReportsPageContent} chrome={chrome} />;
    case "travel":
      return <TravelPreview content={content as TravelPageContent} chrome={chrome} />;
    case "volunteer":
      return <VolunteerPreview content={content as VolunteerPageContent} chrome={chrome} />;
    default:
      return (
        <div className="mx-auto max-w-[34rem] p-10 text-center">
          <p className="text-body">Preview is not ready for this page yet.</p>
          <p className="mt-2 text-[0.875rem] text-body">
            The page key is <code>{page}</code>. Its editor and draft work; only the preview
            drawing is missing.
          </p>
        </div>
      );
  }
}
