import { Button } from "@/components/ui";
import type { ContactPageContent } from "@/content/contact";

/*
  Send Us a Message: the dark band with the white form card.

  The fields type, but nothing is sent — there is no endpoint behind this form yet. Because it has no
  handler, it stays a Server Component.
*/
export function SendMessage({ content }: { content: ContactPageContent["form"] }) {
  const fieldClass =
    "mt-2 min-h-12 w-full rounded-lg border border-line bg-surface px-4 text-[0.9375rem] text-ink outline-none placeholder:text-body/50 focus:border-action";

  return (
    <section id="send-message" className="scroll-mt-28 bg-[#2b2b2b] py-20 lg:py-28">
      <div className="container-page">
        <h2 className="text-center text-[2rem] leading-[1.05] font-semibold text-white lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <form className="mx-auto mt-12 max-w-[46rem] rounded-card bg-surface p-7 lg:p-9">
          <p className="text-[1.0625rem] font-semibold text-ink">{content.note}</p>

          <label className="mt-6 block">
            <span className="text-[0.9375rem] text-body">{content.nameLabel}</span>
            <input
              type="text"
              name="name"
              placeholder={content.placeholder}
              className={fieldClass}
            />
          </label>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.9375rem] text-body">{content.emailLabel}</span>
              <input
                type="email"
                name="email"
                placeholder={content.placeholder}
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="text-[0.9375rem] text-body">{content.phoneLabel}</span>
              <input
                type="tel"
                name="phone"
                placeholder={content.placeholder}
                className={fieldClass}
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-[0.9375rem] text-body">{content.messageLabel}</span>
            <textarea
              name="message"
              rows={6}
              placeholder={content.placeholder}
              className={`${fieldClass} py-3`}
            />
          </label>

          {/* No handler on purpose: nothing is sent anywhere yet. */}
          <Button type="button" size="lg" className="mt-6">
            {content.cta}
          </Button>
        </form>
      </div>
    </section>
  );
}
