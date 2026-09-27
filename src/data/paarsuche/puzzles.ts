/** Jedes Puzzle listet acht Bild-IDs; die tägliche Mischung mischt die Karten. */
export interface PaarsuchePuzzle {
  id: string
  imageIds: readonly string[]
}

export const PAARSUCHE_PUZZLES: readonly PaarsuchePuzzle[] = [
  {
    id: 'ps-01',
    imageIds: ['sonne', 'mond', 'stern', 'baum', 'fisch', 'herz', 'krone', 'schloss'],
  },
  {
    id: 'ps-02',
    imageIds: ['anker', 'blatt', 'pilz', 'boot', 'sonne', 'mond', 'fisch', 'herz'],
  },
  {
    id: 'ps-03',
    imageIds: ['krone', 'schloss', 'anker', 'blatt', 'pilz', 'boot', 'stern', 'baum'],
  },
  {
    id: 'ps-04',
    imageIds: ['sonne', 'anker', 'herz', 'pilz', 'mond', 'boot', 'krone', 'blatt'],
  },
  {
    id: 'ps-05',
    imageIds: ['stern', 'fisch', 'schloss', 'baum', 'sonne', 'pilz', 'anker', 'herz'],
  },
  {
    id: 'ps-06',
    imageIds: ['boot', 'mond', 'blatt', 'krone', 'fisch', 'schloss', 'stern', 'pilz'],
  },
  {
    id: 'ps-07',
    imageIds: ['herz', 'baum', 'anker', 'sonne', 'boot', 'mond', 'schloss', 'blatt'],
  },
  {
    id: 'ps-08',
    imageIds: ['pilz', 'krone', 'fisch', 'stern', 'baum', 'anker', 'herz', 'boot'],
  },
  {
    id: 'ps-09',
    imageIds: ['schloss', 'sonne', 'blatt', 'mond', 'krone', 'fisch', 'pilz', 'stern'],
  },
  {
    id: 'ps-10',
    imageIds: ['baum', 'herz', 'boot', 'anker', 'sonne', 'schloss', 'mond', 'pilz'],
  },
  {
    id: 'ps-11',
    imageIds: ['stern', 'blatt', 'krone', 'fisch', 'anker', 'herz', 'boot', 'sonne'],
  },
  {
    id: 'ps-12',
    imageIds: ['mond', 'pilz', 'schloss', 'baum', 'blatt', 'krone', 'fisch', 'anker'],
  },
  {
    id: 'ps-13',
    imageIds: ['sonne', 'stern', 'herz', 'boot', 'mond', 'baum', 'pilz', 'schloss'],
  },
  {
    id: 'ps-14',
    imageIds: ['anker', 'krone', 'blatt', 'fisch', 'sonne', 'herz', 'mond', 'boot'],
  },
  {
    id: 'ps-15',
    imageIds: ['pilz', 'schloss', 'stern', 'baum', 'anker', 'blatt', 'krone', 'fisch'],
  },
  {
    id: 'ps-16',
    imageIds: ['boot', 'herz', 'sonne', 'mond', 'stern', 'pilz', 'schloss', 'anker'],
  },
  {
    id: 'ps-17',
    imageIds: ['blatt', 'baum', 'krone', 'fisch', 'herz', 'boot', 'sonne', 'pilz'],
  },
  {
    id: 'ps-18',
    imageIds: ['schloss', 'anker', 'mond', 'stern', 'baum', 'blatt', 'krone', 'boot'],
  },
  {
    id: 'ps-19',
    imageIds: ['fisch', 'herz', 'sonne', 'pilz', 'anker', 'schloss', 'mond', 'blatt'],
  },
  {
    id: 'ps-20',
    imageIds: ['krone', 'boot', 'stern', 'baum', 'herz', 'fisch', 'sonne', 'anker'],
  },
  {
    id: 'ps-21',
    imageIds: ['mond', 'schloss', 'blatt', 'pilz', 'boot', 'krone', 'stern', 'herz'],
  },
  {
    id: 'ps-22',
    imageIds: ['sonne', 'baum', 'anker', 'fisch', 'pilz', 'mond', 'schloss', 'krone'],
  },
  {
    id: 'ps-23',
    imageIds: ['herz', 'stern', 'boot', 'blatt', 'baum', 'sonne', 'anker', 'pilz'],
  },
  {
    id: 'ps-24',
    imageIds: ['fisch', 'krone', 'mond', 'schloss', 'blatt', 'herz', 'boot', 'stern'],
  },
  {
    id: 'ps-25',
    imageIds: ['anker', 'sonne', 'pilz', 'baum', 'krone', 'fisch', 'mond', 'blatt'],
  },
  {
    id: 'ps-26',
    imageIds: ['boot', 'schloss', 'herz', 'stern', 'sonne', 'anker', 'pilz', 'baum'],
  },
  {
    id: 'ps-27',
    imageIds: ['blatt', 'fisch', 'krone', 'mond', 'herz', 'schloss', 'stern', 'boot'],
  },
  {
    id: 'ps-28',
    imageIds: ['baum', 'anker', 'sonne', 'pilz', 'blatt', 'krone', 'fisch', 'herz'],
  },
  {
    id: 'ps-29',
    imageIds: ['stern', 'boot', 'mond', 'schloss', 'anker', 'sonne', 'baum', 'blatt'],
  },
  {
    id: 'ps-30',
    imageIds: ['pilz', 'herz', 'krone', 'fisch', 'boot', 'mond', 'schloss', 'stern'],
  },
]
