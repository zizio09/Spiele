import type { ReactNode } from 'react'

export interface PairImage {
  id: string
  label: string
  /** Kontrastreiche Kachelfarbe hinter dem Motiv. */
  tile: string
  render: (titleId: string) => ReactNode
}

const svgProps = {
  viewBox: '0 0 120 120',
  role: 'img' as const,
  className: 'pair-svg',
}

function Tile({ fill, children }: { fill: string; children: ReactNode }) {
  return (
    <>
      <rect width="120" height="120" rx="14" fill={fill} />
      {children}
    </>
  )
}

/** Originale, kontrastreiche Paarbilder – klar unterscheidbar für ältere Augen. */
export const PAIR_IMAGES: readonly PairImage[] = [
  {
    id: 'sonne',
    label: 'Sonne',
    tile: '#1a4a7a',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Sonne</title>
        <Tile fill="#1a4a7a">
          <circle cx="60" cy="60" r="26" fill="#ffd23f" stroke="#fff6c2" strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={60 + Math.cos(rad) * 34}
                y1={60 + Math.sin(rad) * 34}
                x2={60 + Math.cos(rad) * 52}
                y2={60 + Math.sin(rad) * 52}
                stroke="#ffb703"
                strokeWidth="7"
                strokeLinecap="round"
              />
            )
          })}
        </Tile>
      </svg>
    ),
  },
  {
    id: 'mond',
    label: 'Mond',
    tile: '#1b1f3b',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Mond</title>
        <Tile fill="#1b1f3b">
          <circle cx="40" cy="36" r="3" fill="#f7f3e8" />
          <circle cx="88" cy="52" r="2.5" fill="#f7f3e8" />
          <circle cx="72" cy="24" r="2" fill="#f7f3e8" />
          <circle cx="54" cy="62" r="30" fill="#f4e8c1" />
          <circle cx="70" cy="54" r="24" fill="#1b1f3b" />
          <circle cx="46" cy="54" r="5" fill="#e6d39a" opacity="0.55" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'stern',
    label: 'Stern',
    tile: '#2a1a4a',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Stern</title>
        <Tile fill="#2a1a4a">
          <polygon
            points="60,16 68,46 100,46 74,66 84,98 60,78 36,98 46,66 20,46 52,46"
            fill="#ffe566"
            stroke="#fff9c4"
            strokeWidth="2"
          />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'baum',
    label: 'Baum',
    tile: '#d8ecff',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Baum</title>
        <Tile fill="#d8ecff">
          <rect x="52" y="72" width="16" height="30" rx="3" fill="#6b3f1d" />
          <ellipse cx="60" cy="42" rx="34" ry="28" fill="#1f7a3a" />
          <ellipse cx="40" cy="56" rx="20" ry="16" fill="#2f9e4f" />
          <ellipse cx="80" cy="56" rx="20" ry="16" fill="#2f9e4f" />
          <circle cx="48" cy="40" r="5" fill="#7dcf6a" />
          <circle cx="72" cy="36" r="4" fill="#7dcf6a" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'fisch',
    label: 'Fisch',
    tile: '#083d5c',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Fisch</title>
        <Tile fill="#083d5c">
          <ellipse cx="56" cy="60" rx="34" ry="20" fill="#3ecfff" />
          <polygon points="88,60 112,40 112,80" fill="#1aa3d4" />
          <polygon points="48,42 62,50 48,50" fill="#1aa3d4" />
          <circle cx="38" cy="56" r="4.5" fill="#083d5c" />
          <circle cx="39" cy="55" r="1.6" fill="#fff" />
          <path d="M46 68 Q56 76 68 68" fill="none" stroke="#083d5c" strokeWidth="3" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'herz',
    label: 'Herz',
    tile: '#fff0f3',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Herz</title>
        <Tile fill="#fff0f3">
          <path
            d="M60 98 C18 70 16 38 38 26 C50 18 60 28 60 28 C60 28 70 18 82 26 C104 38 102 70 60 98 Z"
            fill="#e11d48"
            stroke="#9f1239"
            strokeWidth="2"
          />
          <path
            d="M42 42 C48 34 56 38 58 46"
            fill="none"
            stroke="#fda4af"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'krone',
    label: 'Krone',
    tile: '#3b1d6e',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Krone</title>
        <Tile fill="#3b1d6e">
          <polygon
            points="22,82 26,40 46,62 60,28 74,62 94,40 98,82"
            fill="#f5c518"
            stroke="#fff3a3"
            strokeWidth="2"
          />
          <rect x="22" y="82" width="76" height="14" rx="3" fill="#d4a017" />
          <circle cx="60" cy="34" r="5" fill="#ff6b6b" />
          <circle cx="32" cy="46" r="4" fill="#4dabf7" />
          <circle cx="88" cy="46" r="4" fill="#69db7c" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'schloss',
    label: 'Schloss',
    tile: '#f0e6d8',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Schloss</title>
        <Tile fill="#f0e6d8">
          <path
            d="M40 54 V40 C40 24 80 24 80 40 V54"
            fill="none"
            stroke="#2f3a40"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <rect x="30" y="54" width="60" height="44" rx="8" fill="#4b5c66" />
          <circle cx="60" cy="74" r="8" fill="#f5c518" />
          <rect x="56" y="78" width="8" height="14" rx="2" fill="#f5c518" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'anker',
    label: 'Anker',
    tile: '#e8f4ff',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Anker</title>
        <Tile fill="#e8f4ff">
          <circle cx="60" cy="28" r="12" fill="none" stroke="#0b3d5c" strokeWidth="8" />
          <line x1="60" y1="40" x2="60" y2="92" stroke="#0b3d5c" strokeWidth="10" />
          <line x1="36" y1="58" x2="84" y2="58" stroke="#0b3d5c" strokeWidth="10" />
          <path
            d="M28 78 Q60 104 92 78"
            fill="none"
            stroke="#0b3d5c"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="60" cy="28" r="4" fill="#e8f4ff" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'blatt',
    label: 'Blatt',
    tile: '#143d28',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Blatt</title>
        <Tile fill="#143d28">
          <path
            d="M60 16 C98 40 100 78 60 106 C20 78 22 40 60 16 Z"
            fill="#7CF29C"
            stroke="#d8ffe4"
            strokeWidth="2"
          />
          <line x1="60" y1="28" x2="60" y2="98" stroke="#1f7a3a" strokeWidth="4" />
          <path d="M60 50 Q78 58 86 72" fill="none" stroke="#1f7a3a" strokeWidth="3" />
          <path d="M60 62 Q44 70 36 84" fill="none" stroke="#1f7a3a" strokeWidth="3" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'pilz',
    label: 'Pilz',
    tile: '#ffe8d6',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Pilz</title>
        <Tile fill="#ffe8d6">
          <path
            d="M22 58 Q22 28 60 24 Q98 28 98 58 Z"
            fill="#e03131"
            stroke="#9b1c1c"
            strokeWidth="2"
          />
          <rect x="46" y="56" width="28" height="40" rx="10" fill="#fff4e0" stroke="#d4b896" strokeWidth="2" />
          <circle cx="42" cy="42" r="7" fill="#fff4e0" />
          <circle cx="70" cy="38" r="6" fill="#fff4e0" />
          <circle cx="58" cy="48" r="5" fill="#fff4e0" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'boot',
    label: 'Boot',
    tile: '#9ad0f5',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Boot</title>
        <Tile fill="#9ad0f5">
          <path d="M10 86 Q60 102 110 86" fill="#4dabf7" />
          <polygon points="24,72 96,72 86,92 34,92" fill="#8b4513" stroke="#5c2e0a" strokeWidth="2" />
          <line x1="58" y1="72" x2="58" y2="26" stroke="#3d2914" strokeWidth="5" />
          <polygon points="60,26 60,62 96,62" fill="#fff" stroke="#1c3d5a" strokeWidth="2" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'katze',
    label: 'Katze',
    tile: '#2b2118',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Katze</title>
        <Tile fill="#2b2118">
          <polygon points="28,48 38,18 52,42" fill="#f4a261" />
          <polygon points="92,48 82,18 68,42" fill="#f4a261" />
          <circle cx="60" cy="64" r="34" fill="#f4a261" />
          <circle cx="46" cy="58" r="7" fill="#1d140e" />
          <circle cx="74" cy="58" r="7" fill="#1d140e" />
          <circle cx="48" cy="56" r="2.5" fill="#fff" />
          <circle cx="76" cy="56" r="2.5" fill="#fff" />
          <polygon points="60,66 54,76 66,76" fill="#e76f51" />
          <path d="M48 86 Q60 94 72 86" fill="none" stroke="#1d140e" strokeWidth="3" />
          <line x1="20" y1="70" x2="40" y2="74" stroke="#f4a261" strokeWidth="3" />
          <line x1="100" y1="70" x2="80" y2="74" stroke="#f4a261" strokeWidth="3" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'apfel',
    label: 'Apfel',
    tile: '#e8ffe8',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Apfel</title>
        <Tile fill="#e8ffe8">
          <path d="M60 28 C56 18 70 14 74 24" fill="none" stroke="#5c4033" strokeWidth="5" />
          <ellipse cx="48" cy="30" rx="12" ry="7" fill="#2f9e44" transform="rotate(-25 48 30)" />
          <ellipse cx="46" cy="68" rx="26" ry="30" fill="#e03131" />
          <ellipse cx="74" cy="68" rx="26" ry="30" fill="#fa5252" />
          <path d="M54 46 Q60 52 66 46" fill="none" stroke="#c92a2a" strokeWidth="3" />
          <path
            d="M44 56 C50 48 56 52 58 60"
            fill="none"
            stroke="#ffc9c9"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'tasse',
    label: 'Tasse',
    tile: '#3d2b1f',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Tasse</title>
        <Tile fill="#3d2b1f">
          <path d="M34 40 H78 V78 Q78 94 60 94 Q42 94 42 78 Z" fill="#fff4e6" stroke="#f8f1e7" strokeWidth="2" />
          <path d="M78 50 H92 Q102 50 102 62 Q102 74 92 74 H78" fill="none" stroke="#fff4e6" strokeWidth="8" />
          <ellipse cx="60" cy="40" rx="22" ry="8" fill="#7c4a2d" />
          <path d="M50 28 Q54 18 58 28" fill="none" stroke="#cdb4a0" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 26 Q66 14 70 26" fill="none" stroke="#cdb4a0" strokeWidth="3" strokeLinecap="round" />
          <rect x="30" y="94" width="60" height="8" rx="3" fill="#d4a373" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'schmetterling',
    label: 'Schmetterling',
    tile: '#1f1147',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Schmetterling</title>
        <Tile fill="#1f1147">
          <ellipse cx="34" cy="48" rx="26" ry="22" fill="#ff6bcb" />
          <ellipse cx="86" cy="48" rx="26" ry="22" fill="#ff6bcb" />
          <ellipse cx="36" cy="78" rx="20" ry="16" fill="#845ef7" />
          <ellipse cx="84" cy="78" rx="20" ry="16" fill="#845ef7" />
          <circle cx="28" cy="44" r="6" fill="#ffe066" />
          <circle cx="92" cy="44" r="6" fill="#ffe066" />
          <ellipse cx="60" cy="64" rx="8" ry="28" fill="#ffd43b" />
          <circle cx="60" cy="36" r="6" fill="#ffd43b" />
          <line x1="54" y1="30" x2="46" y2="18" stroke="#ffd43b" strokeWidth="3" />
          <line x1="66" y1="30" x2="74" y2="18" stroke="#ffd43b" strokeWidth="3" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'gitarre',
    label: 'Gitarre',
    tile: '#f3e9d2',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Gitarre</title>
        <Tile fill="#f3e9d2">
          <rect x="54" y="12" width="12" height="48" rx="3" fill="#5c4033" />
          <rect x="50" y="12" width="20" height="10" rx="2" fill="#d4a017" />
          <ellipse cx="60" cy="82" rx="28" ry="24" fill="#c2410c" />
          <ellipse cx="60" cy="72" rx="18" ry="14" fill="#9a3412" />
          <circle cx="60" cy="74" r="8" fill="#1c1917" />
          <line x1="57" y1="20" x2="57" y2="72" stroke="#f8fafc" strokeWidth="1.5" />
          <line x1="63" y1="20" x2="63" y2="72" stroke="#f8fafc" strokeWidth="1.5" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'regenschirm',
    label: 'Regenschirm',
    tile: '#e7f5ff',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Regenschirm</title>
        <Tile fill="#e7f5ff">
          <path
            d="M18 64 Q60 18 102 64 Z"
            fill="#e03131"
            stroke="#c92a2a"
            strokeWidth="2"
          />
          <path d="M18 64 Q39 48 60 64 Q81 48 102 64" fill="#ff8787" />
          <line x1="60" y1="64" x2="60" y2="100" stroke="#343a40" strokeWidth="6" />
          <path d="M60 100 Q74 100 74 90" fill="none" stroke="#343a40" strokeWidth="6" strokeLinecap="round" />
          <line x1="28" y1="78" x2="28" y2="90" stroke="#4dabf7" strokeWidth="4" strokeLinecap="round" />
          <line x1="90" y1="82" x2="90" y2="96" stroke="#4dabf7" strokeWidth="4" strokeLinecap="round" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'ballon',
    label: 'Ballon',
    tile: '#fff9db',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Ballon</title>
        <Tile fill="#fff9db">
          <ellipse cx="60" cy="48" rx="28" ry="34" fill="#339af0" />
          <path
            d="M42 36 C48 28 54 32 56 40"
            fill="none"
            stroke="#a5d8ff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="54,82 66,82 60,92" fill="#1c7ed6" />
          <path d="M60 92 Q54 104 62 110" fill="none" stroke="#495057" strokeWidth="3" />
        </Tile>
      </svg>
    ),
  },
  {
    id: 'haus',
    label: 'Haus',
    tile: '#d0ebff',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Haus</title>
        <Tile fill="#d0ebff">
          <polygon points="18,58 60,22 102,58" fill="#c92a2a" stroke="#862e2e" strokeWidth="2" />
          <rect x="32" y="58" width="56" height="42" fill="#fff4e6" stroke="#d4b896" strokeWidth="2" />
          <rect x="52" y="72" width="16" height="28" fill="#5c4033" />
          <rect x="38" y="66" width="12" height="12" fill="#4dabf7" stroke="#1c7ed6" strokeWidth="2" />
          <rect x="70" y="66" width="12" height="12" fill="#4dabf7" stroke="#1c7ed6" strokeWidth="2" />
        </Tile>
      </svg>
    ),
  },
]

export function getPairImage(id: string): PairImage {
  const img = PAIR_IMAGES.find((p) => p.id === id)
  if (!img) throw new Error(`Unbekanntes Paarbild: ${id}`)
  return img
}
