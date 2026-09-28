/** Jedes Puzzle listet acht Bild-IDs; die tägliche Mischung mischt die Karten. */
export interface PaarsuchePuzzle {
  id: string
  imageIds: readonly string[]
}

export const PAARSUCHE_PUZZLES: readonly PaarsuchePuzzle[] = [
  {
    id: 'ps-01',
    imageIds: ['sonne', 'katze', 'apfel', 'haus', 'fisch', 'herz', 'krone', 'ballon'],
  },
  {
    id: 'ps-02',
    imageIds: ['anker', 'schmetterling', 'pilz', 'boot', 'tasse', 'mond', 'gitarre', 'regenschirm'],
  },
  {
    id: 'ps-03',
    imageIds: ['krone', 'schloss', 'katze', 'blatt', 'apfel', 'haus', 'stern', 'baum'],
  },
  {
    id: 'ps-04',
    imageIds: ['sonne', 'anker', 'herz', 'pilz', 'ballon', 'boot', 'tasse', 'schmetterling'],
  },
  {
    id: 'ps-05',
    imageIds: ['stern', 'fisch', 'schloss', 'gitarre', 'sonne', 'haus', 'anker', 'herz'],
  },
  {
    id: 'ps-06',
    imageIds: ['boot', 'mond', 'blatt', 'krone', 'katze', 'regenschirm', 'apfel', 'ballon'],
  },
  {
    id: 'ps-07',
    imageIds: ['herz', 'baum', 'tasse', 'sonne', 'boot', 'schmetterling', 'schloss', 'gitarre'],
  },
  {
    id: 'ps-08',
    imageIds: ['pilz', 'krone', 'fisch', 'stern', 'haus', 'anker', 'katze', 'regenschirm'],
  },
  {
    id: 'ps-09',
    imageIds: ['schloss', 'sonne', 'blatt', 'mond', 'ballon', 'apfel', 'tasse', 'stern'],
  },
  {
    id: 'ps-10',
    imageIds: ['baum', 'herz', 'boot', 'gitarre', 'sonne', 'schmetterling', 'katze', 'pilz'],
  },
  {
    id: 'ps-11',
    imageIds: ['stern', 'haus', 'krone', 'fisch', 'anker', 'regenschirm', 'ballon', 'apfel'],
  },
  {
    id: 'ps-12',
    imageIds: ['mond', 'pilz', 'schloss', 'tasse', 'blatt', 'gitarre', 'katze', 'anker'],
  },
  {
    id: 'ps-13',
    imageIds: ['sonne', 'stern', 'herz', 'boot', 'schmetterling', 'haus', 'ballon', 'schloss'],
  },
  {
    id: 'ps-14',
    imageIds: ['anker', 'krone', 'apfel', 'fisch', 'tasse', 'herz', 'mond', 'regenschirm'],
  },
  {
    id: 'ps-15',
    imageIds: ['pilz', 'schloss', 'stern', 'baum', 'gitarre', 'katze', 'krone', 'ballon'],
  },
  {
    id: 'ps-16',
    imageIds: ['boot', 'herz', 'sonne', 'haus', 'schmetterling', 'apfel', 'tasse', 'anker'],
  },
  {
    id: 'ps-17',
    imageIds: ['blatt', 'baum', 'krone', 'fisch', 'regenschirm', 'gitarre', 'sonne', 'pilz'],
  },
  {
    id: 'ps-18',
    imageIds: ['schloss', 'anker', 'mond', 'katze', 'ballon', 'blatt', 'haus', 'boot'],
  },
  {
    id: 'ps-19',
    imageIds: ['fisch', 'herz', 'sonne', 'pilz', 'tasse', 'schmetterling', 'apfel', 'stern'],
  },
  {
    id: 'ps-20',
    imageIds: ['krone', 'boot', 'stern', 'gitarre', 'herz', 'haus', 'regenschirm', 'anker'],
  },
  {
    id: 'ps-21',
    imageIds: ['mond', 'schloss', 'blatt', 'ballon', 'katze', 'krone', 'apfel', 'tasse'],
  },
  {
    id: 'ps-22',
    imageIds: ['sonne', 'baum', 'anker', 'fisch', 'schmetterling', 'gitarre', 'haus', 'pilz'],
  },
  {
    id: 'ps-23',
    imageIds: ['herz', 'stern', 'boot', 'regenschirm', 'katze', 'ballon', 'apfel', 'schloss'],
  },
  {
    id: 'ps-24',
    imageIds: ['fisch', 'krone', 'mond', 'tasse', 'blatt', 'gitarre', 'haus', 'stern'],
  },
  {
    id: 'ps-25',
    imageIds: ['anker', 'sonne', 'pilz', 'schmetterling', 'krone', 'ballon', 'katze', 'blatt'],
  },
  {
    id: 'ps-26',
    imageIds: ['boot', 'schloss', 'herz', 'apfel', 'tasse', 'regenschirm', 'gitarre', 'baum'],
  },
  {
    id: 'ps-27',
    imageIds: ['blatt', 'fisch', 'krone', 'haus', 'herz', 'ballon', 'stern', 'schmetterling'],
  },
  {
    id: 'ps-28',
    imageIds: ['baum', 'anker', 'sonne', 'pilz', 'katze', 'tasse', 'apfel', 'gitarre'],
  },
  {
    id: 'ps-29',
    imageIds: ['stern', 'boot', 'mond', 'schloss', 'regenschirm', 'ballon', 'haus', 'blatt'],
  },
  {
    id: 'ps-30',
    imageIds: ['pilz', 'herz', 'krone', 'fisch', 'schmetterling', 'katze', 'apfel', 'tasse'],
  },
]
