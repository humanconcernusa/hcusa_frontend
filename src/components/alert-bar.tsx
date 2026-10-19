/*
  The red alert strip that shows under the hero. Its words come from the page it sits on, so each
  page carries its own line.
*/
export function AlertBar({ text }: { text: string }) {
  return (
    <div className="bg-action py-3">
      <p className="flex items-center justify-center gap-2 px-4 text-center text-[0.8125rem] font-semibold tracking-wide text-white uppercase">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4 fill-none stroke-current stroke-2"
        >
          <path d="M12 3.5 2.5 20h19z" strokeLinejoin="round" />
          <path d="M12 10v4" strokeLinecap="round" />
          <circle cx="12" cy="17" r="0.6" className="fill-current" />
        </svg>
        {text}
      </p>
    </div>
  );
}
