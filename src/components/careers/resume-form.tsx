"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { CareerPageContent } from "@/content/careers";
import { assetUrl } from "@/media";

/*
  Submit Your Resume.

  The fields, the selector and the file picker all work, so the page is usable — but the button has
  no handler, so nothing is sent anywhere. There is nowhere to send it yet.
*/
export function ResumeForm({ content }: { content: CareerPageContent["resume"] }) {
  const [fileName, setFileName] = useState("");

  const fieldClass =
    "min-h-12 w-full rounded-lg border border-line bg-surface px-4 text-[0.9375rem] text-ink outline-none placeholder:text-body/60 focus:border-action";

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-12 max-w-[44rem]"
        >
          <p className="text-[1.0625rem] font-semibold text-ink">{content.title}</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <input type="text" name="name" placeholder={content.nameLabel} className={fieldClass} />
            <input type="email" name="email" placeholder={content.emailLabel} className={fieldClass} />
            <input type="tel" name="phone" placeholder={content.phoneLabel} className={fieldClass} />

            <select name="role" defaultValue={content.roles[0]} className={`${fieldClass} appearance-none`}>
              {content.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* The whole zone is the picker's label, so a click anywhere opens it. */}
          <label
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setFileName(event.dataTransfer.files[0]?.name ?? "");
            }}
            className="mt-6 grid cursor-pointer place-items-center gap-2 rounded-xl border border-dashed border-line bg-page px-6 py-12 text-center transition-colors hover:border-action/40"
          >
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl("/images/careers/upload.svg")} alt="" className="size-10" />

            <span className="text-[0.9375rem] text-body">
              <span className="font-semibold text-action">{content.uploadBold}</span>{" "}
              {content.uploadRest}
            </span>

            <span className="text-[0.8125rem] text-body/70">
              {fileName || content.uploadHint}
            </span>
          </label>

          {/* No handler on purpose: nothing is sent anywhere yet. */}
          <Button type="button" variant="darkHover" size="lg" className="mt-6">
            {content.cta}
          </Button>
        </form>
      </div>
    </section>
  );
}
