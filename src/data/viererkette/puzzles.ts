export type ViererketteDifficulty = 'green' | 'yellow' | 'red' | 'purple'

export interface ViererketteGroup {
  difficulty: ViererketteDifficulty
  category: string
  explanation: string
  terms: readonly [string, string, string, string]
}

export interface ViererkettePuzzle {
  id: string
  groups: readonly [ViererketteGroup, ViererketteGroup, ViererketteGroup, ViererketteGroup]
}

export const DIFFICULTY_LABEL: Record<ViererketteDifficulty, string> = {
  green: 'Leicht',
  yellow: 'Mittel',
  red: 'Anspruchsvoll',
  purple: 'Besonders knifflig',
}

/** Originale Tagesrätsel: Grün → Lila steigende Schwierigkeit. */
export const VIERERKETTE_PUZZLES: readonly ViererkettePuzzle[] = [
  {
    id: 'vk-01',
    groups: [
      { difficulty: 'green', category: 'Obst', explanation: 'Vier Obstsorten', terms: ['Apfel', 'Birne', 'Kirsche', 'Pflaume'] },
      { difficulty: 'yellow', category: 'Farben', explanation: 'Grundfarben', terms: ['Rot', 'Blau', 'Grün', 'Gelb'] },
      { difficulty: 'red', category: 'Möbel', explanation: 'Einrichtungsgegenstände', terms: ['Tisch', 'Stuhl', 'Schrank', 'Sofa'] },
      { difficulty: 'purple', category: 'Tiere im Wald', explanation: 'Tiere, die im Wald vorkommen', terms: ['Fuchs', 'Reh', 'Eule', 'Wildschwein'] },
    ],
  },
  {
    id: 'vk-02',
    groups: [
      { difficulty: 'green', category: 'Jahreszeiten', explanation: 'Die vier Jahreszeiten', terms: ['Frühling', 'Sommer', 'Herbst', 'Winter'] },
      { difficulty: 'yellow', category: 'Musikinstrumente', explanation: 'Musikinstrumente', terms: ['Geige', 'Flöte', 'Trommel', 'Harfe'] },
      { difficulty: 'red', category: 'Körperteile', explanation: 'Teile des menschlichen Körpers', terms: ['Hand', 'Fuß', 'Nase', 'Ohr'] },
      { difficulty: 'purple', category: 'Getränke', explanation: 'Alltägliche Getränke', terms: ['Wasser', 'Saft', 'Tee', 'Milch'] },
    ],
  },
  {
    id: 'vk-03',
    groups: [
      { difficulty: 'green', category: 'Schulfächer', explanation: 'Unterrichtsfächer', terms: ['Mathe', 'Deutsch', 'Sport', 'Kunst'] },
      { difficulty: 'yellow', category: 'Wetter', explanation: 'Wettererscheinungen', terms: ['Regen', 'Schnee', 'Nebel', 'Sturm'] },
      { difficulty: 'red', category: 'Backwaren', explanation: 'Gebäck und Brot', terms: ['Brot', 'Brezel', 'Kuchen', 'Brötchen'] },
      { difficulty: 'purple', category: 'Schreibgeräte', explanation: 'Zum Schreiben und Malen', terms: ['Stift', 'Feder', 'Kreide', 'Pinsel'] },
    ],
  },
  {
    id: 'vk-04',
    groups: [
      { difficulty: 'green', category: 'Planeten', explanation: 'Planeten unseres Sonnensystems', terms: ['Merkur', 'Venus', 'Mars', 'Jupiter'] },
      { difficulty: 'yellow', category: 'Meeresbewohner', explanation: 'Lebewesen im Meer', terms: ['Hai', 'Qualle', 'Krabbe', 'Seestern'] },
      { difficulty: 'red', category: 'Kleidungsstücke', explanation: 'Dinge zum Anziehen', terms: ['Jacke', 'Hose', 'Schal', 'Mütze'] },
      { difficulty: 'purple', category: 'Wörter mit „haus“', explanation: 'Zusammensetzungen mit „Haus“', terms: ['Rathaus', 'Wohnhaus', 'Krankenhaus', 'Schulhaus'] },
    ],
  },
  {
    id: 'vk-05',
    groups: [
      { difficulty: 'green', category: 'Deutsche Flüsse', explanation: 'Flüsse in Deutschland', terms: ['Rhein', 'Elbe', 'Donau', 'Weser'] },
      { difficulty: 'yellow', category: 'Gemüse', explanation: 'Gemüsesorten', terms: ['Karotte', 'Erbse', 'Gurke', 'Spinat'] },
      { difficulty: 'red', category: 'Sportarten', explanation: 'Sportarten', terms: ['Tennis', 'Handball', 'Rudern', 'Fechten'] },
      { difficulty: 'purple', category: 'Silbe „berg“', explanation: 'Wörter, die „berg“ enthalten', terms: ['Bergsee', 'Eisberg', 'Burgberg', 'Sandberg'] },
    ],
  },
  {
    id: 'vk-06',
    groups: [
      { difficulty: 'green', category: 'Baustoffe', explanation: 'Materialien zum Bauen', terms: ['Holz', 'Stein', 'Ziegel', 'Beton'] },
      { difficulty: 'yellow', category: 'Insekten', explanation: 'Insekten', terms: ['Biene', 'Ameise', 'Käfer', 'Libelle'] },
      { difficulty: 'red', category: 'Himmelsrichtungen', explanation: 'Die vier Himmelsrichtungen', terms: ['Norden', 'Süden', 'Osten', 'Westen'] },
      { difficulty: 'purple', category: 'Wörter enden auf „ung“', explanation: 'Substantive auf „-ung“', terms: ['Zeitung', 'Wohnung', 'Rechnung', 'Meinung'] },
    ],
  },
  {
    id: 'vk-07',
    groups: [
      { difficulty: 'green', category: 'Küchengeräte', explanation: 'Geräte in der Küche', terms: ['Herd', 'Mixer', 'Toaster', 'Waage'] },
      { difficulty: 'yellow', category: 'Bäume', explanation: 'Baumarten', terms: ['Eiche', 'Buche', 'Tanne', 'Birke'] },
      { difficulty: 'red', category: 'Brettspiele', explanation: 'Klassische Brettspiele', terms: ['Schach', 'Mühle', 'Dame', 'Mensch'] },
      { difficulty: 'purple', category: 'Doppelvokale', explanation: 'Wörter mit doppeltem Vokal', terms: ['See', 'Boot', 'Haar', 'Meer'] },
    ],
  },
  {
    id: 'vk-08',
    groups: [
      { difficulty: 'green', category: 'Berufe', explanation: 'Berufsbezeichnungen', terms: ['Arzt', 'Lehrer', 'Bäcker', 'Pilot'] },
      { difficulty: 'yellow', category: 'Blumen', explanation: 'Blumensorten', terms: ['Rose', 'Tulpe', 'Lilie', 'Nelke'] },
      { difficulty: 'red', category: 'Verkehrsmittel', explanation: 'Fortbewegungsmittel', terms: ['Zug', 'Bus', 'Fahrrad', 'Schiff'] },
      { difficulty: 'purple', category: 'Wörter mit „sonne“', explanation: 'Zusammensetzungen mit „Sonne“', terms: ['Sonnenschirm', 'Sonnenbrille', 'Sonnenblume', 'Sonnenaufgang'] },
    ],
  },
  {
    id: 'vk-09',
    groups: [
      { difficulty: 'green', category: 'Metalle', explanation: 'Metalle', terms: ['Eisen', 'Kupfer', 'Silber', 'Gold'] },
      { difficulty: 'yellow', category: 'Süßigkeiten', explanation: 'Süße Snacks', terms: ['Bonbon', 'Schokolade', 'Keks', 'Eis'] },
      { difficulty: 'red', category: 'Wohnräume', explanation: 'Räume in einem Haus', terms: ['Küche', 'Bad', 'Flur', 'Keller'] },
      { difficulty: 'purple', category: 'Reimwörter auf „-ein“', explanation: 'Wörter, die auf „-ein“ reimen', terms: ['Stein', 'Bein', 'Wein', 'Nein'] },
    ],
  },
  {
    id: 'vk-10',
    groups: [
      { difficulty: 'green', category: 'Musikgenres', explanation: 'Musikrichtungen', terms: ['Jazz', 'Rock', 'Pop', 'Klassik'] },
      { difficulty: 'yellow', category: 'Werkzeuge', explanation: 'Handwerkzeuge', terms: ['Hammer', 'Säge', 'Zange', 'Bohrer'] },
      { difficulty: 'red', category: 'Vögel', explanation: 'Vogelarten', terms: ['Spatz', 'Amsel', 'Schwan', 'Rabe'] },
      { difficulty: 'purple', category: 'Vorsilbe „vor“', explanation: 'Wörter mit der Vorsilbe „vor“', terms: ['Vorsicht', 'Vortrag', 'Vorort', 'Vorhang'] },
    ],
  },
  {
    id: 'vk-11',
    groups: [
      { difficulty: 'green', category: 'Gewürze', explanation: 'Gewürze und Würzmittel', terms: ['Pfeffer', 'Salz', 'Zimt', 'Paprika'] },
      { difficulty: 'yellow', category: 'Länder Europas', explanation: 'Europäische Länder', terms: ['Polen', 'Spanien', 'Norwegen', 'Griechenland'] },
      { difficulty: 'red', category: 'Schuharten', explanation: 'Arten von Schuhen', terms: ['Stiefel', 'Sandale', 'Pantoffel', 'Turnschuh'] },
      { difficulty: 'purple', category: 'Silbe „land“', explanation: 'Wörter mit der Silbe „land“', terms: ['Heimatland', 'Bergland', 'Seenland', 'Flachland'] },
    ],
  },
  {
    id: 'vk-12',
    groups: [
      { difficulty: 'green', category: 'Gemütslagen', explanation: 'Gefühle und Stimmungen', terms: ['Freude', 'Trauer', 'Wut', 'Angst'] },
      { difficulty: 'yellow', category: 'Papierprodukte', explanation: 'Dinge aus Papier', terms: ['Heft', 'Zeitung', 'Umschlag', 'Plakat'] },
      { difficulty: 'red', category: 'Meereswellen-Wörter', explanation: 'Begriffe rund um Wellen', terms: ['Welle', 'Brandung', 'Gischt', 'Strömung'] },
      { difficulty: 'purple', category: 'Endung „-chen“', explanation: 'Verkleinerungsformen auf „-chen“', terms: ['Mädchen', 'Häuschen', 'Stückchen', 'Briefchen'] },
    ],
  },
  {
    id: 'vk-13',
    groups: [
      { difficulty: 'green', category: 'Frühstück', explanation: 'Frühstücksspeisen', terms: ['Müsli', 'Joghurt', 'Marmelade', 'Croissant'] },
      { difficulty: 'yellow', category: 'Gebirge', explanation: 'Deutsche Mittelgebirge bzw. Gebirge', terms: ['Alpen', 'Harz', 'Eifel', 'Rhön'] },
      { difficulty: 'red', category: 'Farben der Natur', explanation: 'Farbtöne aus der Natur', terms: ['Ocker', 'Türkis', 'Oliv', 'Smaragd'] },
      { difficulty: 'purple', category: 'Wörter mit „zeit“', explanation: 'Zusammensetzungen mit „Zeit“', terms: ['Freizeit', 'Mittagzeit', 'Hochzeit', 'Jahreszeit'] },
    ],
  },
  {
    id: 'vk-14',
    groups: [
      { difficulty: 'green', category: 'Schulmaterial', explanation: 'Utensilien für die Schule', terms: ['Lineal', 'Zirkel', 'Radiergummi', 'Spitzer'] },
      { difficulty: 'yellow', category: 'Milchprodukte', explanation: 'Produkte aus Milch', terms: ['Käse', 'Butter', 'Quark', 'Sahne'] },
      { difficulty: 'red', category: 'Nachtaktive Tiere', explanation: 'Tiere, die nachts aktiv sind', terms: ['Fledermaus', 'Eule', 'Waschbär', 'Igel'] },
      { difficulty: 'purple', category: 'Zusammensetzungen mit „wasser“', explanation: 'Wörter mit „Wasser“', terms: ['Wasserfall', 'Wasserkraft', 'Wasserhahn', 'Wasserkocher'] },
    ],
  },
  {
    id: 'vk-15',
    groups: [
      { difficulty: 'green', category: 'Tanzstile', explanation: 'Tanzarten', terms: ['Walzer', 'Tango', 'Samba', 'Ballett'] },
      { difficulty: 'yellow', category: 'Obstbäume', explanation: 'Bäume, die Obst tragen', terms: ['Apfelbaum', 'Kirschbaum', 'Birnbaum', 'Pflaumenbaum'] },
      { difficulty: 'red', category: 'Bürodinge', explanation: 'Gegenstände im Büro', terms: ['Ordner', 'Locher', 'Tacker', 'Stempel'] },
      { difficulty: 'purple', category: 'Wörter mit doppeltem Mitlaut', explanation: 'Wörter mit Doppelkonsonanten', terms: ['Sommer', 'Hammer', 'Teller', 'Koffer'] },
    ],
  },
  {
    id: 'vk-16',
    groups: [
      { difficulty: 'green', category: 'Deutsche Städte', explanation: 'Städte in Deutschland', terms: ['Hamburg', 'München', 'Köln', 'Leipzig'] },
      { difficulty: 'yellow', category: 'Camping', explanation: 'Camping-Ausrüstung', terms: ['Zelt', 'Isomatte', 'Rucksack', 'Kocher'] },
      { difficulty: 'red', category: 'Saiteninstrumente', explanation: 'Instrumente mit Saiten', terms: ['Gitarre', 'Cello', 'Banjo', 'Mandoline'] },
      { difficulty: 'purple', category: 'Silbe „spiel“', explanation: 'Wörter mit „Spiel“', terms: ['Brettspiel', 'Wortspiel', 'Rollenspiel', 'Ballspiel'] },
    ],
  },
  {
    id: 'vk-17',
    groups: [
      { difficulty: 'green', category: 'Suppen', explanation: 'Suppensorten', terms: ['Tomatensuppe', 'Erbsensuppe', 'Hühnersuppe', 'Kürbissuppe'] },
      { difficulty: 'yellow', category: 'Sternbilder', explanation: 'Sternbilder am Himmel', terms: ['Orion', 'Schwan', 'Leier', 'Waage'] },
      { difficulty: 'red', category: 'Gartenarbeit', explanation: 'Tätigkeiten im Garten', terms: ['Gießen', 'Jäten', 'Pflanzen', 'Ernten'] },
      { difficulty: 'purple', category: 'Reim auf „-acht“', explanation: 'Wörter, die auf „-acht“ reimen', terms: ['Nacht', 'Pracht', 'Macht', 'Schlacht'] },
    ],
  },
  {
    id: 'vk-18',
    groups: [
      { difficulty: 'green', category: 'Käsesorten', explanation: 'Käsesorten', terms: ['Gouda', 'Emmentaler', 'Camembert', 'Feta'] },
      { difficulty: 'yellow', category: 'Fahrradteile', explanation: 'Teile eines Fahrrads', terms: ['Lenker', 'Sattel', 'Kette', 'Speiche'] },
      { difficulty: 'red', category: 'Märchenfiguren', explanation: 'Figuren aus Märchen', terms: ['Hexe', 'Zwerg', 'Fee', 'Drache'] },
      { difficulty: 'purple', category: 'Vorsilbe „mit“', explanation: 'Wörter mit der Vorsilbe „mit“', terms: ['Mittag', 'Mitleid', 'Mitarbeiter', 'Mitspieler'] },
    ],
  },
  {
    id: 'vk-19',
    groups: [
      { difficulty: 'green', category: 'Nüsse', explanation: 'Nüsse und Nussfrüchte', terms: ['Haselnuss', 'Walnuss', 'Mandel', 'Cashew'] },
      { difficulty: 'yellow', category: 'Bibliothek', explanation: 'Begriffe aus der Bibliothek', terms: ['Regal', 'Ausleihe', 'Katalog', 'Lesesaal'] },
      { difficulty: 'red', category: 'Winterkleidung', explanation: 'Kleidung für den Winter', terms: ['Handschuh', 'Schal', 'Mütze', 'Mantel'] },
      { difficulty: 'purple', category: 'Wörter mit „licht“', explanation: 'Zusammensetzungen mit „Licht“', terms: ['Kerzenlicht', 'Tageslicht', 'Mondlicht', 'Scheinwerferlicht'] },
    ],
  },
  {
    id: 'vk-20',
    groups: [
      { difficulty: 'green', category: 'Teesorten', explanation: 'Arten von Tee', terms: ['Grüntee', 'Schwarztee', 'Kräutertee', 'Früchtetee'] },
      { difficulty: 'yellow', category: 'Inseln', explanation: 'Deutsche Inseln', terms: ['Rügen', 'Sylt', 'Usedom', 'Helgoland'] },
      { difficulty: 'red', category: 'Malutensilien', explanation: 'Zubehör zum Malen', terms: ['Palette', 'Leinwand', 'Pinsel', 'Staffelei'] },
      { difficulty: 'purple', category: 'Endung „-heit“', explanation: 'Abstrakta auf „-heit“', terms: ['Freiheit', 'Schönheit', 'Wahrheit', 'Einheit'] },
    ],
  },
  {
    id: 'vk-21',
    groups: [
      { difficulty: 'green', category: 'Brotbeläge', explanation: 'Beläge fürs Brot', terms: ['Honig', 'Marmelade', 'Leberwurst', 'Käse'] },
      { difficulty: 'yellow', category: 'Wettergeräte', explanation: 'Geräte zur Wetterbeobachtung', terms: ['Thermometer', 'Barometer', 'Regenmesser', 'Wetterfahne'] },
      { difficulty: 'red', category: 'Zoo-Tiere', explanation: 'Tiere im Zoo', terms: ['Panda', 'Giraffe', 'Nilpferd', 'Känguru'] },
      { difficulty: 'purple', category: 'Silbe „haus“ am Ende', explanation: 'Wörter, die auf „haus“ enden', terms: ['Wohnhaus', 'Gartenhaus', 'Gasthaus', 'Bootshaus'] },
    ],
  },
  {
    id: 'vk-22',
    groups: [
      { difficulty: 'green', category: 'Saitenlose Instrumente', explanation: 'Instrumente ohne Saiten', terms: ['Trompete', 'Klarinette', 'Orgel', 'Akkordeon'] },
      { difficulty: 'yellow', category: 'Beeren', explanation: 'Beerensorten', terms: ['Himbeere', 'Brombeere', 'Heidelbeere', 'Johannisbeere'] },
      { difficulty: 'red', category: 'Schulhöfe-Wörter', explanation: 'Begriffe vom Schulhof', terms: ['Pause', 'Klettergerüst', 'Ballspiel', 'Bank'] },
      { difficulty: 'purple', category: 'Doppelkonsonant „tt“', explanation: 'Wörter mit „tt“', terms: ['Blatt', 'Brett', 'Watt', 'Schritt'] },
    ],
  },
  {
    id: 'vk-23',
    groups: [
      { difficulty: 'green', category: 'Deutsche Seen', explanation: 'Seen in Deutschland', terms: ['Chiemsee', 'Bodensee', 'Müritz', 'Ammersee'] },
      { difficulty: 'yellow', category: 'Frühjahrsblüher', explanation: 'Blumen, die im Frühling blühen', terms: ['Krokus', 'Narzisse', 'Schneeglöckchen', 'Osterglocke'] },
      { difficulty: 'red', category: 'Nähen', explanation: 'Utensilien zum Nähen', terms: ['Nadel', 'Faden', 'Schere', 'Stoff'] },
      { difficulty: 'purple', category: 'Wörter mit „spiel“ am Anfang', explanation: 'Wörter, die mit „Spiel“ beginnen', terms: ['Spielplatz', 'Spielzeug', 'Spielregeln', 'Spielzeit'] },
    ],
  },
  {
    id: 'vk-24',
    groups: [
      { difficulty: 'green', category: 'Backzutaten', explanation: 'Zutaten zum Backen', terms: ['Mehl', 'Hefe', 'Zucker', 'Butter'] },
      { difficulty: 'yellow', category: 'Berge', explanation: 'Bekannte Berge', terms: ['Zugspitze', 'Brocken', 'Watzmann', 'Feldberg'] },
      { difficulty: 'red', category: 'Kartenfarben', explanation: 'Farben im Kartenspiel', terms: ['Herz', 'Pik', 'Kreuz', 'Karo'] },
      { difficulty: 'purple', category: 'Endung „-schaft“', explanation: 'Wörter auf „-schaft“', terms: ['Freundschaft', 'Landschaft', 'Wissenschaft', 'Mannschaft'] },
    ],
  },
  {
    id: 'vk-25',
    groups: [
      { difficulty: 'green', category: 'Frühstücksgetränke', explanation: 'Getränke zum Frühstück', terms: ['Kaffee', 'Kakao', 'Orangensaft', 'Milchtee'] },
      { difficulty: 'yellow', category: 'Waldfrüchte', explanation: 'Essbares aus dem Wald', terms: ['Heidelbeere', 'Pilz', 'Buchecker', 'Himbeere'] },
      { difficulty: 'red', category: 'Schreibwaren', explanation: 'Schreibwaren', terms: ['Notizbuch', 'Ordner', 'Locher', 'Marker'] },
      { difficulty: 'purple', category: 'Vorsilbe „über“', explanation: 'Wörter mit der Vorsilbe „über“', terms: ['Überrock', 'Überfahrt', 'Überblick', 'Übernachtung'] },
    ],
  },
  {
    id: 'vk-26',
    groups: [
      { difficulty: 'green', category: 'Teigwaren', explanation: 'Nudelsorten', terms: ['Spaghetti', 'Penne', 'Lasagne', 'Tortellini'] },
      { difficulty: 'yellow', category: 'Nordseeorte', explanation: 'Orte an der Nordsee', terms: ['Husum', 'Büsum', 'Cuxhaven', 'Norderney'] },
      { difficulty: 'red', category: 'Gartenpflanzen', explanation: 'Kräuter und Gartenpflanzen', terms: ['Lavendel', 'Rosmarin', 'Thymian', 'Basilikum'] },
      { difficulty: 'purple', category: 'Reim auf „-ung“', explanation: 'Wörter, die auf „-ung“ reimen', terms: ['Schwung', 'Sprung', 'Umschwung', 'Vorsprung'] },
    ],
  },
  {
    id: 'vk-27',
    groups: [
      { difficulty: 'green', category: 'Frühstückseier', explanation: 'Eierspeisen zum Frühstück', terms: ['Rührei', 'Spiegelei', 'Frühstücksei', 'Omelett'] },
      { difficulty: 'yellow', category: 'Musiknoten-Wörter', explanation: 'Begriffe aus der Musik', terms: ['Note', 'Takt', 'Melodie', 'Rhythmus'] },
      { difficulty: 'red', category: 'Wintersport', explanation: 'Wintersportarten', terms: ['Ski', 'Schlitten', 'Eislauf', 'Snowboard'] },
      { difficulty: 'purple', category: 'Silbe „rad“', explanation: 'Wörter mit „rad“', terms: ['Fahrrad', 'Mühlrad', 'Wasserrad', 'Lenkrad'] },
    ],
  },
  {
    id: 'vk-28',
    groups: [
      { difficulty: 'green', category: 'Zitrusfrüchte', explanation: 'Zitrusfrüchte', terms: ['Orange', 'Zitrone', 'Limette', 'Grapefruit'] },
      { difficulty: 'yellow', category: 'Deutsche Inseln Ostsee', explanation: 'Inseln in der Ostsee', terms: ['Rügen', 'Usedom', 'Fehmarn', 'Poel'] },
      { difficulty: 'red', category: 'Malerei-Farben', explanation: 'Pigmentfarben in der Malerei', terms: ['Ultramarin', 'Zinnober', 'Ocker', 'Umbra'] },
      { difficulty: 'purple', category: 'Wörter mit „nacht“', explanation: 'Zusammensetzungen mit „Nacht“', terms: ['Mitternacht', 'Nachtisch', 'Nachtwache', 'Nachtzug'] },
    ],
  },
  {
    id: 'vk-29',
    groups: [
      { difficulty: 'green', category: 'Brotarten', explanation: 'Brotsorten', terms: ['Vollkorn', 'Roggen', 'Ciabatta', 'Baguette'] },
      { difficulty: 'yellow', category: 'Fluginsekten', explanation: 'Insekten, die fliegen', terms: ['Schmetterling', 'Libelle', 'Hummel', 'Mücke'] },
      { difficulty: 'red', category: 'Wohnaccessoires', explanation: 'Dinge zur Wohnungseinrichtung', terms: ['Kissen', 'Decke', 'Teppich', 'Vorhang'] },
      { difficulty: 'purple', category: 'Endung „-nis“', explanation: 'Wörter auf „-nis“', terms: ['Erlebnis', 'Geheimnis', 'Ergebnis', 'Hindernis'] },
    ],
  },
  {
    id: 'vk-30',
    groups: [
      { difficulty: 'green', category: 'Milchkaffee-Varianten', explanation: 'Kaffeegetränke mit Milch', terms: ['Cappuccino', 'Latte', 'Macchiato', 'Flat White'] },
      { difficulty: 'yellow', category: 'Nationalparks', explanation: 'Nationalparks in Deutschland', terms: ['Eifel', 'Harz', 'Wattenmeer', 'Sächsische Schweiz'] },
      { difficulty: 'red', category: 'Kinderbücher-Figuren', explanation: 'Figuren aus Kinderbüchern', terms: ['Pippi', 'Emil', 'Bibi', 'Jim'] },
      { difficulty: 'purple', category: 'Vorsilbe „aus“', explanation: 'Wörter mit der Vorsilbe „aus“', terms: ['Ausgang', 'Ausflug', 'Ausblick', 'Auszeit'] },
    ],
  },
]
