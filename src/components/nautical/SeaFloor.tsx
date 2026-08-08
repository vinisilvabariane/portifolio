/**
 * The bottom. Sediment, a few rocks worn round, weed that never sees light,
 * and an anchor that has been down here a long while — the page's last
 * section stands on this rather than floating over it.
 */
export default function SeaFloor() {
  return (
    <svg
      className="floor"
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* Silt haze lifting off the bottom */}
      <path className="floor__haze" d="M0 150q220-52 470-30t480-6 490-34v180H0z" />

      {/* Weed, behind the dunes */}
      <g className="floor__weed">
        <path d="M250 214q-10-40 4-70M262 214q6-42-6-66M274 214q10-36 2-58" />
        <path d="M1090 220q-8-46 6-74M1102 220q7-40-4-62" />
        <path d="M690 224q-6-30 4-50M700 224q5-28-2-44" />
      </g>

      {/* Dunes */}
      <path className="floor__far" d="M0 176q180-40 380-16t400 4 340-30 320 6v116H0z" />
      <path className="floor__near" d="M0 214q200-34 420-12t420 0 330-24 270 18v64H0z" />

      {/* Rocks */}
      <g className="floor__rock">
        <path d="M420 216q14-26 40-24t32 28z" />
        <path d="M980 210q10-20 30-18t24 22z" />
        <path d="M148 222q8-14 22-13t18 16z" />
      </g>

      {/* The anchor, half in the silt */}
      <g className="floor__anchor" transform="translate(760 132) rotate(-16)">
        <circle cx="0" cy="4" r="7" />
        <path d="M0 11v66" />
        <path d="M-22 26h44" />
        <path d="M-30 60a30 30 0 0 0 60 0" />
        <path d="M-30 60l-8-9M-30 60l9-8M30 60l8-9M30 60l-9-8" />
      </g>

      {/* Bioluminescence — the only light down here */}
      <g className="floor__glow">
        <circle cx="300" cy="150" r="2.4" />
        <circle cx="612" cy="122" r="1.8" />
        <circle cx="905" cy="164" r="2.6" />
        <circle cx="1180" cy="130" r="2" />
        <circle cx="120" cy="140" r="1.7" />
        <circle cx="1330" cy="172" r="2.2" />
      </g>
    </svg>
  )
}
