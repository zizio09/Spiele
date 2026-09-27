import type { ReactNode } from 'react'

export interface PairImage {
  id: string
  label: string
  render: (titleId: string) => ReactNode
}

const svgProps = {
  viewBox: '0 0 120 120',
  role: 'img' as const,
  className: 'pair-svg',
}

/** Originale Paarbilder als SVG-Illustrationen. */
export const PAIR_IMAGES: readonly PairImage[] = [
  {
    id: 'sonne',
    label: 'Sonne',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Sonne</title>
        <circle cx="60" cy="60" r="28" fill="#f0a202" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 60 + Math.cos(rad) * 36
          const y1 = 60 + Math.sin(rad) * 36
          const x2 = 60 + Math.cos(rad) * 50
          const y2 = 60 + Math.sin(rad) * 50
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f0a202"
              strokeWidth="6"
              strokeLinecap="round"
            />
          )
        })}
      </svg>
    ),
  },
  {
    id: 'mond',
    label: 'Mond',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Mond</title>
        <circle cx="60" cy="60" r="32" fill="#c9d6e3" />
        <circle cx="72" cy="52" r="28" fill="#1f4d3a" />
      </svg>
    ),
  },
  {
    id: 'stern',
    label: 'Stern',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Stern</title>
        <polygon
          points="60,18 68,48 100,48 74,66 84,96 60,78 36,96 46,66 20,48 52,48"
          fill="#e8c547"
        />
      </svg>
    ),
  },
  {
    id: 'baum',
    label: 'Baum',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Baum</title>
        <rect x="54" y="68" width="12" height="28" fill="#8b5a2b" />
        <circle cx="60" cy="52" r="28" fill="#2f6b4f" />
        <circle cx="42" cy="60" r="16" fill="#3d8b63" />
        <circle cx="78" cy="60" r="16" fill="#3d8b63" />
      </svg>
    ),
  },
  {
    id: 'fisch',
    label: 'Fisch',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Fisch</title>
        <ellipse cx="58" cy="60" rx="32" ry="18" fill="#3a7ca5" />
        <polygon points="90,60 108,42 108,78" fill="#2c5f7c" />
        <circle cx="42" cy="56" r="3" fill="#102a33" />
      </svg>
    ),
  },
  {
    id: 'herz',
    label: 'Herz',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Herz</title>
        <path
          d="M60 96 C20 70 18 40 38 30 C50 24 60 34 60 34 C60 34 70 24 82 30 C102 40 100 70 60 96 Z"
          fill="#c23b22"
        />
      </svg>
    ),
  },
  {
    id: 'krone',
    label: 'Krone',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Krone</title>
        <polygon points="24,78 24,42 42,62 60,30 78,62 96,42 96,78" fill="#d4a017" />
        <rect x="24" y="78" width="72" height="12" rx="2" fill="#b8860b" />
      </svg>
    ),
  },
  {
    id: 'schloss',
    label: 'Schloss',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Schloss</title>
        <rect x="34" y="54" width="52" height="40" rx="6" fill="#5c6b73" />
        <path
          d="M42 54 V42 C42 30 78 30 78 42 V54"
          fill="none"
          stroke="#3d484d"
          strokeWidth="10"
        />
        <circle cx="60" cy="72" r="6" fill="#e8c547" />
      </svg>
    ),
  },
  {
    id: 'anker',
    label: 'Anker',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Anker</title>
        <circle cx="60" cy="28" r="10" fill="none" stroke="#1f4d3a" strokeWidth="6" />
        <line x1="60" y1="38" x2="60" y2="88" stroke="#1f4d3a" strokeWidth="8" />
        <line x1="40" y1="56" x2="80" y2="56" stroke="#1f4d3a" strokeWidth="8" />
        <path
          d="M30 78 Q60 100 90 78"
          fill="none"
          stroke="#1f4d3a"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'blatt',
    label: 'Blatt',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Blatt</title>
        <path d="M60 20 C90 40 95 75 60 100 C25 75 30 40 60 20 Z" fill="#4caf50" />
        <line x1="60" y1="30" x2="60" y2="95" stroke="#2e7d32" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'pilz',
    label: 'Pilz',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Pilz</title>
        <ellipse cx="60" cy="48" rx="38" ry="24" fill="#c23b22" />
        <rect x="48" y="52" width="24" height="36" rx="8" fill="#f3e5d0" />
        <circle cx="48" cy="42" r="5" fill="#f3e5d0" />
        <circle cx="70" cy="48" r="4" fill="#f3e5d0" />
      </svg>
    ),
  },
  {
    id: 'boot',
    label: 'Boot',
    render: (titleId) => (
      <svg {...svgProps} aria-labelledby={titleId}>
        <title id={titleId}>Boot</title>
        <polygon points="28,70 92,70 84,90 36,90" fill="#8b5a2b" />
        <line x1="60" y1="70" x2="60" y2="28" stroke="#5c4033" strokeWidth="5" />
        <polygon points="62,28 62,60 92,60" fill="#e8f0ec" stroke="#1f4d3a" strokeWidth="2" />
      </svg>
    ),
  },
]

export function getPairImage(id: string): PairImage {
  const img = PAIR_IMAGES.find((p) => p.id === id)
  if (!img) throw new Error(`Unbekanntes Paarbild: ${id}`)
  return img
}
