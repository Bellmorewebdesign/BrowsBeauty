/**
 * Small hand-drawn brand marks used as section punctuation. They are plain
 * inline SVG so they scale, inherit colour and cost nothing to load.
 */

// A single brow silhouette: blunt at the head, arched, tapering to the tail.
const BROW_FILL =
  'M58 178C92 146 150 118 214 116c54-2 102 22 138 56-36-18-80-30-136-30-64 0-120 22-158 54z'
const BROW_TOP = 'M58 178C92 146 150 118 214 116c54-2 102 22 138 56'
const BROW_UNDER = 'M352 172c-36-18-80-30-136-30-64 0-120 22-158 54'

/** The soft brow arc that draws itself in on the hero. */
export function BrowArc({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 210" fill="none" aria-hidden="true" focusable="false">
      <path d={BROW_TOP} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={BROW_UNDER} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

/** Lash strokes used as a quiet divider. */
export function LashDivider({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 220 26" fill="none" aria-hidden="true" focusable="false">
      <path d="M2 24C40 6 78 2 110 2s70 4 108 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {[26, 56, 86, 110, 134, 164, 194].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${i % 2 === 0 ? 12 : 10}c-2-4-3-7-3-9`}
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}
    </svg>
  )
}

/** Brow mapping study for the consultation step. */
export function MappingArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 320" fill="none" aria-hidden="true" focusable="false">
      <path d={BROW_FILL} fill="currentColor" opacity="0.1" />
      <path d={BROW_TOP} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d={BROW_UNDER} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />

      {/* The three classic mapping points: head, arch and tail. */}
      {[
        [64, 172, 64, 262],
        [224, 120, 224, 262],
        [348, 176, 348, 262],
      ].map(([x1, y1, x2, y2]) => (
        <line
          key={x1}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 7"
          opacity="0.55"
        />
      ))}
      <line x1="44" y1="262" x2="368" y2="262" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {[64, 224, 348].map((x) => (
        <circle key={x} cx={x} cy={262} r="4.5" fill="currentColor" opacity="0.8" />
      ))}
      <circle cx="224" cy="120" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Filled brow with hair direction, for the design step. */
export function DesignArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 320" fill="none" aria-hidden="true" focusable="false">
      <path d={BROW_FILL} fill="currentColor" opacity="0.28" />
      <path d={BROW_TOP} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={BROW_UNDER} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />

      {/* Hair direction: brushed up at the head, laid down towards the tail. */}
      {Array.from({ length: 17 }).map((_, i) => {
        const p = i / 16
        const x = 76 + p * 250
        const y = 168 - Math.sin(p * Math.PI * 0.86) * 30
        const lift = 22 - p * 12
        const lean = -8 + p * 20
        return (
          <path
            key={x}
            d={`M${x.toFixed(1)} ${(y + 14).toFixed(1)}c${(lean * 0.3).toFixed(1)} ${(-lift * 0.55).toFixed(1)} ${(lean * 0.7).toFixed(1)} ${(-lift * 0.85).toFixed(1)} ${lean.toFixed(1)} ${(-lift).toFixed(1)}`}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        )
      })}

      <path
        d="M56 236h300M206 210v52"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.45"
      />
    </svg>
  )
}
