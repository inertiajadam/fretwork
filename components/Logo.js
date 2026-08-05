/* Fretwork mark: a chord-diagram grid (nut + frets + strings) with three     */
/* amber fret-dots climbing up the neck. Uses brand tokens; scales to 16px.    */
/* `withBg` draws the rounded tile (used by the standalone favicon/app icon).  */

export function LogoMark({ size = 28, withBg = false, title = "Fretwork" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {withBg && (
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          fill="#201A15"
          stroke="#3A2F27"
          strokeWidth="1"
        />
      )}
      {/* strings (vertical) */}
      <g stroke="#6B5C4C" strokeWidth="1" strokeLinecap="round">
        <line x1="8.5" y1="8" x2="8.5" y2="25" />
        <line x1="13.83" y1="8" x2="13.83" y2="25" />
        <line x1="19.17" y1="8" x2="19.17" y2="25" />
        <line x1="24.5" y1="8" x2="24.5" y2="25" />
      </g>
      {/* frets (horizontal) */}
      <g stroke="#574838" strokeWidth="1" strokeLinecap="round">
        <line x1="8.5" y1="13.5" x2="24.5" y2="13.5" />
        <line x1="8.5" y1="19" x2="24.5" y2="19" />
        <line x1="8.5" y1="24.5" x2="24.5" y2="24.5" />
      </g>
      {/* nut (thick, top) */}
      <line
        x1="8"
        y1="8"
        x2="25"
        y2="8"
        stroke="#EFE6D9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* fret-dots climbing the neck */}
      <g fill="#E8A33D">
        <circle cx="8.5" cy="21.75" r="2.6" />
        <circle cx="13.83" cy="16.25" r="2.6" />
        <circle cx="19.17" cy="10.75" r="2.6" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 28 }) {
  return <LogoMark size={size} />;
}
