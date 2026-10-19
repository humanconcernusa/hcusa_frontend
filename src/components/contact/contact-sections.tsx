import Image from "next/image";
import type { ReactElement } from "react";
import type { ContactPageContent } from "@/content/contact";

/*
  How Can We Help You? The five rows carry drawn glyphs — the folder has no icons of its own — each
  a red mark inside a pale disc on a pink bar.
*/
type IconProps = { className?: string };

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HeadsetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M4.5 14v-1.8a7.5 7.5 0 0 1 15 0V14" {...stroke} />
      <rect x="2.8" y="13.5" width="4" height="6" rx="1.6" {...stroke} />
      <rect x="17.2" y="13.5" width="4" height="6" rx="1.6" {...stroke} />
      <path d="M19.2 19.5c0 1.6-1.6 2.5-4.2 2.5" {...stroke} />
    </svg>
  );
}

function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="9" cy="8.5" r="3.2" {...stroke} />
      <path d="M3.6 19.4c0-3 2.5-5 5.4-5s5.4 2 5.4 5" {...stroke} />
      <path d="M16 6a3 3 0 0 1 0 5.8M17 14.6c2 .6 3.4 2.2 3.4 4.6" {...stroke} />
    </svg>
  );
}

function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0 1 12 8.4a3.9 3.9 0 0 1 7 2.4C19 15.6 12 20 12 20Z"
        {...stroke}
      />
    </svg>
  );
}

function DesktopIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="2.8" y="4.5" width="18.4" height="12" rx="2" {...stroke} />
      <path d="M9 20h6M12 16.5V20" {...stroke} />
    </svg>
  );
}

function QuestionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.6v.3" {...stroke} />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

const HELP_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  headset: HeadsetIcon,
  people: PeopleIcon,
  heart: HeartIcon,
  desktop: DesktopIcon,
  question: QuestionIcon,
};

export function HowCanWeHelp({ content }: { content: ContactPageContent["help"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <h2 className="text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mx-auto mt-5 max-w-[46rem] text-center text-[0.9375rem] leading-relaxed text-body">
          {content.body}
        </p>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="space-y-4">
            {content.rows.map((row) => {
              const Icon = HELP_ICONS[row.icon] ?? HeartIcon;

              return (
                <li
                  key={row.label}
                  className="flex items-center gap-4 rounded-full bg-tint py-3 pr-5 pl-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface">
                    <Icon className="size-4 text-action" />
                  </span>

                  <span className="text-[0.9375rem] font-semibold text-ink">{row.label}</span>
                </li>
              );
            })}
          </ul>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
