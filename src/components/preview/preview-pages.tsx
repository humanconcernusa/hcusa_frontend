"use client";

import { AlertBar } from "@/components/alert-bar";
import {
  DonationHelps as FloodDonationHelps,
  Giving as FloodGiving,
  RespondSteps as FloodRespondSteps,
  StatsBand as FloodStatsBand,
  WhatsHappening as FloodWhatsHappening,
} from "@/components/flood-relief/flood-relief-sections";
import { FloodHero } from "@/components/flood-relief/flood-relief-hero";
import { GazaHero } from "@/components/gaza-scholarship/gaza-scholarship-hero";
import {
  DonationHelps as GazaDonationHelps,
  Giving as GazaGiving,
  RespondSteps as GazaRespondSteps,
  StatsBand as GazaStatsBand,
  WhyScholarship as GazaWhyScholarship,
} from "@/components/gaza-scholarship/gaza-scholarship-sections";
import { ChildSponsorshipHero } from "@/components/child-sponsorship/child-sponsorship-hero";
import {
  Faq,
  GlobalLocations,
  WhySponsor,
} from "@/components/child-sponsorship/child-sponsorship-sections";
import { FoodAidHero } from "@/components/food-aid/food-aid-hero";
import { WhyFoodAid } from "@/components/food-aid/food-aid-sections";
import { HealthcareHero } from "@/components/healthcare/healthcare-hero";
import {
  ChooseBand,
  CounterBand,
  GivingLevels,
  StoriesVideo,
  WhyHealthcare,
} from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { CeoMessage } from "@/components/home/ceo-message";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Programs } from "@/components/home/programs";
import { Testimonial } from "@/components/home/testimonial";
import { VideoBanner } from "@/components/home/video-banner";
import { LebanonHero } from "@/components/lebanon-emergency/lebanon-emergency-hero";
import {
  DonationHelps as LebanonDonationHelps,
  Giving as LebanonGiving,
  RespondSteps as LebanonRespondSteps,
  StatsBand as LebanonStatsBand,
  WhatsHappening as LebanonWhatsHappening,
} from "@/components/lebanon-emergency/lebanon-emergency-sections";
import { PalestineHero } from "@/components/palestine-relief/palestine-relief-hero";
import {
  DonationHelps as PalestineDonationHelps,
  Giving as PalestineGiving,
  RespondSteps as PalestineRespondSteps,
  WhatsHappening as PalestineWhatsHappening,
} from "@/components/palestine-relief/palestine-relief-sections";
import { SadaqahHero } from "@/components/sadaqah/sadaqah-hero";
import { WhySadaqah } from "@/components/sadaqah/sadaqah-sections";
import { WaterAidHero } from "@/components/water-aid/water-aid-hero";
import { WhyWaterAid } from "@/components/water-aid/water-aid-sections";
import { YouthAnnouncement } from "@/components/youth/youth-announcement";
import { YouthFaq } from "@/components/youth/youth-faq";
import { YouthHero } from "@/components/youth/youth-hero";
import {
  Benefits,
  Closing,
  Intro,
  MoreThan,
  Phases,
  Turkey,
} from "@/components/youth/youth-sections";
import { YouthTimeline } from "@/components/youth/youth-timeline";
import { ZakatHero } from "@/components/zakat/zakat-hero";
import {
  CalculatorBanner,
  WhereZakatGoes,
  WhoCanReceive,
  WhyZakat,
} from "@/components/zakat/zakat-sections";
import {
  DonationHelps as SudanDonationHelps,
  Giving as SudanGiving,
  RespondSteps as SudanRespondSteps,
  StatsBand as SudanStatsBand,
  WhatsHappening as SudanWhatsHappening,
} from "@/components/sudan-relief/sudan-relief-sections";
import { SudanHero } from "@/components/sudan-relief/sudan-relief-hero";
import {
  ReliefGrid,
  RespondSteps as AfricaRespondSteps,
  SupportGiving,
  WhyNeeded,
} from "@/components/support-africa/support-africa-sections";
import { SupportAfricaHero } from "@/components/support-africa/support-africa-hero";

import type { ChildSponsorshipPageContent } from "@/content/child-sponsorship";
import type { FloodReliefPageContent } from "@/content/flood-relief";
import type { FoodAidPageContent } from "@/content/food-aid";
import type { FooterContent } from "@/content/footer";
import type { HealthcarePageContent } from "@/content/healthcare";
import type { GazaPageContent } from "@/content/gaza-scholarship";
import type { HeaderContent } from "@/content/header";
import type { HomePageContent } from "@/content/home";
import type { LebanonPageContent } from "@/content/lebanon-emergency";
import type { PalestineHardshipPageContent } from "@/content/palestine-hardship-fund";
import type { PalestinePageContent } from "@/content/palestine-relief";
import type { SadaqahPageContent } from "@/content/sadaqah";
import type { SudanPageContent } from "@/content/sudan-relief";
import type { SupportAfricaPageContent } from "@/content/support-africa";
import type { WaterAidPageContent } from "@/content/water-aid";
import type { YouthPageContent } from "@/content/youth";
import type { ZakatPageContent } from "@/content/zakat";

import { InfoPreview } from "./preview-info";
import { CTA_BAND, Shell, type Chrome } from "./preview-shell";

/*
  The pages the preview tab can draw. Each one repeats the composition of the real page, but takes
  the content and the header/footer as props instead of reading the published files.

  Every page with a draft is covered: the appeal and program pages here, the information pages in
  preview-info.tsx. A new page needs a case in one of the two, and until then the tab says so
  instead of drawing something wrong.
*/

/* The frame and the shared closing band live in preview-shell.tsx. */

function HomePreview({ content, chrome }: { content: HomePageContent; chrome: Chrome }) {
  return (
    <Shell
      chrome={chrome}
      home={content.visible}
      padTop={!content.visible.hero}
    >
      {content.visible.hero ? <Hero content={content.hero} /> : null}
      {content.visible.videoBanner ? <VideoBanner content={content.videoBanner} /> : null}
      {content.visible.impact ? <Impact content={content.impact} /> : null}
      {content.visible.programs ? <Programs content={content.programs} /> : null}
      {content.visible.testimonial ? <Testimonial content={content.testimonial} /> : null}
      {content.visible.ceoMessage ? <CeoMessage content={content.ceoMessage} /> : null}
      {content.visible.ctaBand ? <CtaBand content={content.ctaBand} /> : null}
    </Shell>
  );
}

function FloodPreview({ content, chrome }: { content: FloodReliefPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <FloodHero content={content.hero} />
      <AlertBar text={content.alert} />
      <FloodWhatsHappening content={content.happening} />
      <FloodDonationHelps content={content.helps} />
      <FloodRespondSteps content={content.responds} />
      <FloodStatsBand content={content.stats} />
      <FloodGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function LebanonPreview({ content, chrome }: { content: LebanonPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <LebanonHero content={content.hero} />
      <AlertBar text={content.alert} />
      <LebanonWhatsHappening content={content.happening} />
      <LebanonDonationHelps content={content.helps} />
      <LebanonRespondSteps content={content.responds} />
      <LebanonStatsBand content={content.stats} />
      <LebanonGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function PalestinePreview({ content, chrome }: { content: PalestinePageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <PalestineHero content={content.hero} />
      <AlertBar text={content.alert} />
      <PalestineWhatsHappening content={content.happening} />
      <PalestineDonationHelps content={content.helps} />
      <PalestineRespondSteps content={content.responds} />
      <VideoBanner content={content.video} />
      <CounterBand content={content.counters} />
      <PalestineGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function SudanPreview({ content, chrome }: { content: SudanPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <SudanHero content={content.hero} />
      <AlertBar text={content.alert} />
      <SudanWhatsHappening content={content.happening} />
      <SudanDonationHelps content={content.helps} />
      <SudanRespondSteps content={content.responds} />
      <SudanStatsBand content={content.stats} />
      <SudanGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function AfricaPreview({
  content,
  chrome,
}: {
  content: SupportAfricaPageContent;
  chrome: Chrome;
}) {
  return (
    <Shell chrome={chrome}>
      <SupportAfricaHero content={content.hero} />
      <AlertBar text={content.alert} />
      <WhyNeeded content={content.why} />
      <ReliefGrid content={content.relief} />
      <AfricaRespondSteps content={content.responds} />
      <VideoBanner content={content.video} />
      <SupportGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

/* The Gaza Scholarship page and the Palestine Hardship Fund page share one layout. */
function ScholarshipPreview({
  content,
  chrome,
}: {
  content: GazaPageContent | PalestineHardshipPageContent;
  chrome: Chrome;
}) {
  return (
    <Shell chrome={chrome}>
      <GazaHero content={content.hero} />
      <AlertBar text={content.alert} />
      <GazaWhyScholarship content={content.why} />
      <GazaDonationHelps content={content.helps} />
      <GazaRespondSteps content={content.responds} />
      <VideoBanner content={content.video} />
      <GazaStatsBand content={content.stats} />
      <GazaGiving content={content.giving} />
      <ChooseBand content={content.choose} formId={content.choose.form} />
      <CtaBand content={CTA_BAND} />
    </Shell>
  );
}

function FoodAidPreview({ content, chrome }: { content: FoodAidPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <FoodAidHero content={content.hero} /> : null}
      {content.visible.why ? <WhyFoodAid content={content.why} /> : null}
      {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
      {content.visible.counters ? <CounterBand content={content.counters} /> : null}
      {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function WaterAidPreview({ content, chrome }: { content: WaterAidPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <WaterAidHero content={content.hero} /> : null}
      {content.visible.why ? <WhyWaterAid content={content.why} /> : null}
      {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
      {content.visible.counters ? <CounterBand content={content.counters} /> : null}
      {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function HealthcarePreview({
  content,
  chrome,
}: {
  content: HealthcarePageContent;
  chrome: Chrome;
}) {
  return (
    <Shell
      chrome={chrome}
      padTop={!content.visible.hero}
      /* The real page has no Quick Donate tab. */
      quickDonate={false}
    >
      {content.visible.hero ? <HealthcareHero content={content.hero} /> : null}
      {content.visible.why ? <WhyHealthcare content={content.why} /> : null}
      {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
      {content.visible.counters ? <CounterBand content={content.counters} /> : null}
      {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function SponsorshipPreview({
  content,
  chrome,
}: {
  content: ChildSponsorshipPageContent;
  chrome: Chrome;
}) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <ChildSponsorshipHero content={content.hero} /> : null}
      {content.visible.why ? <WhySponsor content={content.why} /> : null}
      {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
      {content.visible.counters ? <CounterBand content={content.counters} /> : null}
      {content.visible.global ? <GlobalLocations content={content.global} /> : null}
      {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
      {content.visible.faq ? <Faq content={content.faq} /> : null}
    </Shell>
  );
}

function ZakatPreview({ content, chrome }: { content: ZakatPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <ZakatHero content={content.hero} /> : null}
      {content.visible.why ? (
        <WhyZakat content={content.why} rates={content.calculator} />
      ) : null}
      {content.visible.stories ? (
        <StoriesVideo content={content.stories} className="py-14 lg:py-20" />
      ) : null}
      {content.visible.giving ? (
        <GivingLevels content={content.giving} className="pb-20 lg:pb-28" />
      ) : null}
      {content.visible.who ? <WhoCanReceive content={content.who} /> : null}
      {content.visible.calculator ? <CalculatorBanner content={content.calculator} /> : null}
      {content.visible.where ? <WhereZakatGoes content={content.where} /> : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function SadaqahPreview({ content, chrome }: { content: SadaqahPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      {content.visible.hero ? <SadaqahHero content={content.hero} /> : null}
      {content.visible.why ? <WhySadaqah content={content.why} /> : null}
      {content.visible.stories ? (
        <StoriesVideo content={content.stories} className="pt-14 pb-20 lg:pt-20 lg:pb-28" />
      ) : null}
      {content.visible.giving ? (
        <GivingLevels content={content.giving} className="pt-8 pb-20 lg:pt-12 lg:pb-28" />
      ) : null}
      {content.visible.choose ? (
        <ChooseBand content={content.choose} formId={content.choose.form} />
      ) : null}
      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </Shell>
  );
}

function YouthPreview({ content, chrome }: { content: YouthPageContent; chrome: Chrome }) {
  return (
    <Shell chrome={chrome}>
      <YouthHero content={content.hero} />
      <YouthAnnouncement content={content.announcement} />
      <Intro content={content.intro} />
      <Benefits content={content.benefits} />
      <Turkey content={content.turkey} />
      <YouthTimeline content={content.timeline} />
      <Phases content={content.phases} />
      {/* The bar appears a second time here, as the reference has it. */}
      <YouthAnnouncement content={content.announcement} />
      <MoreThan content={content.more} />
      <YouthFaq content={content.faq} />
      <Closing content={content.closing} />
    </Shell>
  );
}

export function PreviewPage({
  page,
  payload,
}: {
  page: string;
  payload: {
    content: unknown;
    header: HeaderContent;
    footer: FooterContent;
    /* The blogs listing draws real posts; every other page ignores this. */
    posts?: unknown;
  };
}) {
  const chrome = { header: payload.header, footer: payload.footer };

  switch (page) {
    case "home":
      return <HomePreview content={payload.content as HomePageContent} chrome={chrome} />;
    case "flood-relief":
      return <FloodPreview content={payload.content as FloodReliefPageContent} chrome={chrome} />;
    case "lebanon-emergency":
      return <LebanonPreview content={payload.content as LebanonPageContent} chrome={chrome} />;
    case "palestine-relief":
      return (
        <PalestinePreview content={payload.content as PalestinePageContent} chrome={chrome} />
      );
    case "sudan-relief":
      return <SudanPreview content={payload.content as SudanPageContent} chrome={chrome} />;
    case "support-africa":
      return (
        <AfricaPreview content={payload.content as SupportAfricaPageContent} chrome={chrome} />
      );
    case "gaza-scholarship":
      return <ScholarshipPreview content={payload.content as GazaPageContent} chrome={chrome} />;
    case "palestine-hardship-fund":
      return (
        <ScholarshipPreview
          content={payload.content as PalestineHardshipPageContent}
          chrome={chrome}
        />
      );
    case "food-aid":
      return <FoodAidPreview content={payload.content as FoodAidPageContent} chrome={chrome} />;
    case "water-aid":
      return <WaterAidPreview content={payload.content as WaterAidPageContent} chrome={chrome} />;
    case "healthcare":
      return (
        <HealthcarePreview content={payload.content as HealthcarePageContent} chrome={chrome} />
      );
    case "child-sponsorship":
      return (
        <SponsorshipPreview
          content={payload.content as ChildSponsorshipPageContent}
          chrome={chrome}
        />
      );
    case "zakat":
      return <ZakatPreview content={payload.content as ZakatPageContent} chrome={chrome} />;
    case "sadaqah":
      return <SadaqahPreview content={payload.content as SadaqahPageContent} chrome={chrome} />;
    case "youth":
      return <YouthPreview content={payload.content as YouthPageContent} chrome={chrome} />;
    default:
      return (
        <InfoPreview
          page={page}
          content={payload.content}
          chrome={chrome}
          posts={payload.posts}
        />
      );
  }
}
