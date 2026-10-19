/*
  The four Volunteer Opportunity glyphs, plus the step card's clipboard.

  Four of them are drawn inline rather than left as files, because they animate: an SVG loaded by
  <img> cannot be reached by the CSS that moves it. The .svg files stay in public/images/volunteer
  as the sources they were traced from.
*/

/* The Community outreach glyph: the six spokes grow out of the hub one at a time. */
export function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      overflow="visible"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="32"
        y2="12"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="50"
        y2="20"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="50"
        y2="44"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="32"
        y2="52"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="14"
        y2="44"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        className="cos-spoke animate-cos-draw"
        x1="32"
        y1="32"
        x2="14"
        y2="20"
        stroke="#e03030"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <circle className="cos-node" cx="32" cy="12" r="3" stroke="#e03030" strokeWidth="1" />
      <circle className="cos-node" cx="50" cy="20" r="3" stroke="#e03030" strokeWidth="1" />
      <circle className="cos-node" cx="50" cy="44" r="3" stroke="#e03030" strokeWidth="1" />
      <circle className="cos-node" cx="32" cy="52" r="3" stroke="#e03030" strokeWidth="1" />
      <circle className="cos-node" cx="14" cy="44" r="3" stroke="#e03030" strokeWidth="1" />
      <circle className="cos-node" cx="14" cy="20" r="3" stroke="#e03030" strokeWidth="1" />

      <circle className="cos-hub" cx="32" cy="32" r="9" fill="#e03030" />
      <path
        d="M28.5 32 l2.5 2.5 l4.5-4.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The Food distribution glyph: the steam rises, the lid floats, the bowl settles, the arrow bounces. */
export function FoodIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 62"
      overflow="visible"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        className="fd-steam1 animate-fd-steam"
        d="M18 22 Q16 18 18 13 Q20 8 18 3"
        stroke="#e03030"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        className="fd-steam2 animate-fd-steam"
        d="M28 20 Q26 16 28 11 Q30 6 28 1"
        stroke="#e03030"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        className="fd-steam3 animate-fd-steam"
        d="M38 22 Q36 18 38 13 Q40 8 38 3"
        stroke="#e03030"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <g className="fd-lid animate-fd-lid">
        <rect x="11" y="21" width="34" height="7" rx="3.5" fill="#e03030" />
        <rect x="23" y="16" width="10" height="7" rx="2" fill="#c01818" />
      </g>

      <g className="fd-bowl animate-fd-bowl">
        <rect
          x="11"
          y="28"
          width="34"
          height="22"
          rx="4"
          fill="#fca5a5"
          stroke="#e03030"
          strokeWidth="1.5"
        />
        <path
          d="M15 36 Q28 42 41 36"
          stroke="#e03030"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="18"
          y1="32"
          x2="38"
          y2="32"
          stroke="#f87171"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      <g className="fd-arrow animate-fd-arrow">
        <line
          x1="28"
          y1="52"
          x2="28"
          y2="58"
          stroke="#e03030"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 55 L28 61 L34 55"
          stroke="#e03030"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* The fundraising glyph: the coins of the stack rise in turn, and the growth arrow with them. */
export function FundraisingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 58 58"
      overflow="visible"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <g className="ef-c3 animate-ef-stack">
        <ellipse cx="26" cy="44" rx="14" ry="4" fill="#fca5a5" stroke="#e03030" strokeWidth="1.2" />
        <rect x="12" y="38" width="28" height="6" fill="#fca5a5" />
        <ellipse cx="26" cy="38" rx="14" ry="4" fill="#f87171" stroke="#e03030" strokeWidth="1.2" />
      </g>

      <g className="ef-c2 animate-ef-stack">
        <rect x="12" y="30" width="28" height="8" fill="#fca5a5" />
        <ellipse cx="26" cy="30" rx="14" ry="4" fill="#e03030" stroke="#c01818" strokeWidth="1.2" />
      </g>

      <g className="ef-c1 animate-ef-stack">
        <rect x="12" y="22" width="28" height="8" fill="#fca5a5" />
        <ellipse cx="26" cy="22" rx="14" ry="4" fill="#e03030" stroke="#c01818" strokeWidth="1.2" />
        <text
          x="26"
          y="25.5"
          textAnchor="middle"
          fontSize="6"
          fill="#fff"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          $
        </text>
      </g>

      <g className="ef-arrow animate-ef-arrow">
        <line
          x1="46"
          y1="42"
          x2="46"
          y2="16"
          stroke="#e03030"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 22 L46 15 L52 22"
          stroke="#e03030"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/*
  The Emergency Relief glyph: two rings travel out from the cross while the cross keeps a slow beat.

  The source markup gave the rings no radius, which would draw nothing, so they start at the disc's
  own edge instead.
*/
export function ReliefIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      overflow="visible"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle
        className="er-ring1 animate-er-ring"
        cx="28"
        cy="28"
        r="14"
        stroke="#e03030"
        strokeWidth="1.6"
      />
      <circle
        className="er-ring2 animate-er-ring"
        cx="28"
        cy="28"
        r="14"
        stroke="#e03030"
        strokeWidth="1.6"
      />

      <g className="er-cross animate-er-cross">
        <circle cx="28" cy="28" r="14" fill="#e03030" />
        <rect x="24" y="18" width="8" height="20" rx="2" fill="#fff" />
        <rect x="18" y="24" width="20" height="8" rx="2" fill="#fff" />
      </g>
    </svg>
  );
}

/* The small clipboard that sits in the corner of each step card. */
export function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 4.5h6M9.5 3h5v2.5h-5zM7 5h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 10h6M9 13.5h6M9 17h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
