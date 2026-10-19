import type { YouthPageContent } from "@/content/youth";

/*
  The announcement bar. It sits in the page right under the hero, where the reference has it, and
  runs the line right to left. The text is printed twice so there is no gap when it comes round
  again.
*/
export function YouthAnnouncement({ content }: { content: YouthPageContent["announcement"] }) {
  return (
    <div className="overflow-hidden bg-action py-2.5">
      <p className="flex w-max animate-marquee text-[0.875rem] font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase">
        <span className="px-6">{content}</span>
        <span aria-hidden="true" className="px-6">
          {content}
        </span>
      </p>
    </div>
  );
}
