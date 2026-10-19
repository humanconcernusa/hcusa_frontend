import Image from "next/image";
import { Button } from "@/components/ui";
import {
  FOOTER_CONTACT_ROWS,
  FOOTER_SOCIAL_MARKS,
  type FooterContactIcon,
} from "@/content/footer";
import { getPublishedFooter } from "@/content/published";

/*
  The footer, which shows on every page. It reads its own content, so the pages render it with no
  props and every page picks up an edit.

  The names, the icons and the link rules come from src/content/footer.ts, paired with the values
  by position, so the admin edits words and nothing is ever left half-filled.
*/

/* Turns a contact line into the link it should be. */
function contactHref(link: string, value: string): string {
  if (link === "email") return `mailto:${value}`;
  if (link === "phone") return `tel:${value.replace(/[^\d+]/g, "")}`;

  return "";
}

function ContactIcon({ name }: { name: FooterContactIcon }) {
  const shared = "size-[18px] stroke-current fill-none stroke-[1.6]";

  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
        <path d="M6.6 3.5a1.7 1.7 0 012.4.2l1.6 2a1.7 1.7 0 01-.1 2.2l-1 1a12 12 0 005.6 5.6l1-1a1.7 1.7 0 012.2-.1l2 1.6a1.7 1.7 0 01.2 2.4l-1 1.3a2.6 2.6 0 01-2.7.9C11.6 18.4 5.6 12.4 4.3 6.7a2.6 2.6 0 01.9-2.7l1.4-1z" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
        <path d="M12 2.5a7 7 0 00-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 00-7-7zm0 9.6a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2z" />
      </svg>
    );
  }

  if (name === "doc") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={shared} strokeLinecap="round">
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={shared}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.8 7.2l8.2 5.6 8.2-5.6" strokeLinecap="round" />
    </svg>
  );
}

export async function SiteFooter() {
  const content = await getPublishedFooter();
  const { visible, brand, contact, newsletter, socials, copyright } = content;

  return (
    <footer className="bg-surface">
      {/*
        On a phone the extra bottom space is for the back-to-top button, which is fixed to the
        bottom right and would otherwise land on the copyright. From sm up the screen is wide
        enough that a centred line never reaches it.
      */}
      <div className="container-page pt-16 pb-24 sm:pb-8 lg:pt-20">
        {/*
          Phones follow the reference site: smaller body text so each contact line fits on one
          line, and a grey filled email field. Both column headings are the same size at every
          width, and the social icons line up with the text above them. From sm up the rest of
          the sizes are the original ones.
        */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            {visible.logo ? (
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                width={860}
                height={216}
                className="h-12 w-auto"
              />
            ) : null}

            {visible.blurb ? (
              <p className="mt-5 max-w-[34ch] text-[0.875rem] leading-relaxed text-body sm:text-[0.9375rem] sm:leading-normal">
                {brand.blurb}
              </p>
            ) : null}
          </div>

          {visible.contact ? (
            <div>
              <h2 className="text-lg font-semibold">{contact.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3.5">
                {FOOTER_CONTACT_ROWS.map((row, index) => {
                  const value = contact.values[index] ?? "";
                  const href = contactHref(row.link, value);

                  const body = (
                    <>
                      <span className="mt-0.5 text-action">
                        <ContactIcon name={row.icon} />
                      </span>
                      <span className="text-[0.875rem] sm:text-[0.9375rem]">{value}</span>
                    </>
                  );

                  return (
                    <li key={row.label}>
                      {href ? (
                        <a
                          href={href}
                          className="flex gap-3 text-ink transition-colors hover:text-action"
                        >
                          {body}
                        </a>
                      ) : (
                        <span className="flex gap-3 text-ink">{body}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div>
            {visible.newsletter ? (
              <>
                <h2 className="text-lg font-semibold">
                  {newsletter.heading}
                </h2>

                <form className="field-pill mt-4 flex items-center gap-2 rounded-full bg-band p-1.5 pl-5 shadow-[0_2px_6px_rgb(10_10_10_/_0.06)] sm:mt-5 sm:max-w-sm sm:border sm:border-line sm:bg-surface sm:p-1.5 sm:pl-5 sm:shadow-none">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    required
                    placeholder={newsletter.placeholder}
                    autoComplete="email"
                    className="min-h-11 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-[#8a8a8a] sm:text-[0.9375rem]"
                  />
                  <Button
                    type="submit"
                    variant="dark"
                    className="shrink-0 max-sm:min-h-11 max-sm:bg-ink max-sm:font-semibold"
                  >
                    {newsletter.joinLabel}
                  </Button>
                </form>
              </>
            ) : null}

            {visible.socials ? (
              <ul
                className={`flex flex-wrap items-center gap-1 sm:-ml-3 ${
                  visible.newsletter ? "mt-7" : ""
                }`}
              >
                {FOOTER_SOCIAL_MARKS.map((mark, index) => (
                  <li key={mark.name}>
                    <a
                      href={socials.links[index] ?? ""}
                      aria-label={mark.name}
                      className="grid size-11 place-items-center text-action transition-opacity hover:opacity-70"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        strokeLinejoin="round"
                        className="size-6 fill-current stroke-current stroke-[0.75]"
                      >
                        <path d={mark.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {visible.copyright ? (
          <>
            <hr className="mt-8 border-divider sm:mt-14" />

            <p className="pt-6 pb-4 text-center text-[0.75rem] text-ink sm:pb-0 sm:text-[0.875rem] sm:text-body">
              {copyright}
            </p>
          </>
        ) : null}
      </div>
    </footer>
  );
}
