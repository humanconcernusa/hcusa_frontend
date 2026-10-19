import { DonateButton } from "@/components/donate/donate-button";
import { Badge, ButtonLink, Media, Tag } from "@/components/ui";
import type { HomeContent } from "@/content/home";

/* The three tag icons are fixed by position. The admin edits the labels. */
const TAG_ICONS = ["water", "care", "food"] as const;
type TagIconName = (typeof TAG_ICONS)[number];

function TagIcon({ name }: { name: TagIconName }) {
  const stroke = "size-4 shrink-0 fill-none stroke-current stroke-[1.5]";

  if (name === "water") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path
          d="M12 3.4c-3.3 4-5.5 6.8-5.5 9.4a5.5 5.5 0 1 0 11 0c0-2.6-2.2-5.4-5.5-9.4z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "care") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path
          d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
      <path d="M4.8 15.5a7.2 7.2 0 0 1 14.4 0" strokeLinecap="round" />
      <path d="M3.2 18.4h17.6" strokeLinecap="round" />
    </svg>
  );
}

export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <section id="top" className="relative isolate bg-inverse">
      {/*
        On phones the card covers most of the photo, so the background becomes a blurred,
        darkened wash behind it. It is scaled up a touch so the blur does not leave soft
        light edges at the sides.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="h-full w-full max-sm:scale-110 max-sm:blur-md">
          <Media src={content.image} alt={content.imageAlt} sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/35 sm:hidden" />
      </div>

      <div className="container-page pt-28 pb-12 max-sm:px-2.5 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-4 pt-6 shadow-raised sm:p-7 lg:p-8">
          <Badge
            icon={
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0">
                <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="8" cy="8" r="2.5" fill="currentColor" />
              </svg>
            }
          >
            {content.badge}
          </Badge>

          <h1 className="mt-3 text-[2.125rem] leading-[1.08] font-semibold sm:mt-5 sm:text-[2.75rem] sm:leading-[1.12] lg:text-[3.125rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h1>

          <p className="mt-4 max-w-[34rem] border-l-4 border-action bg-tint px-4 py-3 text-[0.9375rem] text-ink sm:mt-6 sm:text-[1rem]">
            {content.callout}
          </p>

          {/* Side by side on phones too, so the card stays short. */}
          <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
            <DonateButton formId={content.form} className="sm:min-h-12 sm:px-8 sm:text-base">
              {content.primaryCta}
            </DonateButton>
            <ButtonLink
              href="/improving-healthcare"
              variant="secondary"
              className="sm:min-h-12 sm:px-8 sm:text-base"
            >
              {content.secondaryCta}
            </ButtonLink>
          </div>

          {/*
            Below 390 they stay as they were, wrapping if they need to. From 390 up the three
            sit in even columns, so they always hold one row. From sm up they spread out again
            as plain tags.
          */}
          <ul className="mt-4 flex flex-wrap gap-1.5 min-[390px]:grid min-[390px]:grid-cols-3 sm:mt-7 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
            {content.tags.map((label, index) => (
              <li
                key={label}
                className="rounded-full px-2.5 py-1 [&>span]:text-[0.75rem] min-[390px]:flex min-[390px]:min-w-0 min-[390px]:justify-center min-[390px]:whitespace-nowrap min-[390px]:px-1 min-[390px]:[&>span]:text-[0.8125rem] sm:justify-start sm:p-0 sm:[&>span]:text-[0.8125rem]"
              >
                <Tag icon={<TagIcon name={TAG_ICONS[index] ?? "water"} />}>{label}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
