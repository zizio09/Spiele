export interface ViererketteGroup {
  category: string
  terms: readonly [string, string, string, string]
}

export interface ViererkettePuzzle {
  id: string
  groups: readonly [ViererketteGroup, ViererketteGroup, ViererketteGroup, ViererketteGroup]
}

/** Originale Tagesrätsel mit klaren Kategorien. */
export const VIERERKETTE_PUZZLES: readonly ViererkettePuzzle[] = [
  {
    id: 'vk-01',
    groups: [
      { category: 'Obst', terms: ['Apfel', 'Birne', 'Kirsche', 'Pflaume'] },
      { category: 'Farben', terms: ['Rot', 'Blau', 'Grün', 'Gelb'] },
      { category: 'Möbel', terms: ['Tisch', 'Stuhl', 'Schrank', 'Sofa'] },
      { category: 'Tiere im Wald', terms: ['Fuchs', 'Reh', 'Eule', 'Wildschwein'] },
    ],
  },
  {
    id: 'vk-02',
    groups: [
      { category: 'Jahreszeiten', terms: ['Frühling', 'Sommer', 'Herbst', 'Winter'] },
      { category: 'Musikinstrumente', terms: ['Geige', 'Flöte', 'Trommel', 'Harfe'] },
      { category: 'Körperteile', terms: ['Hand', 'Fuß', 'Nase', 'Ohr'] },
      { category: 'Getränke', terms: ['Wasser', 'Saft', 'Tee', 'Milch'] },
    ],
  },
  {
    id: 'vk-03',
    groups: [
      { category: 'Schulfächer', terms: ['Mathe', 'Deutsch', 'Sport', 'Kunst'] },
      { category: 'Wetter', terms: ['Regen', 'Schnee', 'Nebel', 'Sturm'] },
      { category: 'Backwaren', terms: ['Brot', 'Brezel', 'Kuchen', 'Brötchen'] },
      { category: 'Schreibgeräte', terms: ['Stift', 'Feder', 'Kreide', 'Pinsel'] },
    ],
  },
  {
    id: 'vk-04',
    groups: [
      { category: 'Planeten', terms: ['Merkur', 'Venus', 'Mars', 'Jupiter'] },
      { category: 'Meeresbewohner', terms: ['Hai', 'Qualle', 'Krabbe', 'Seestern'] },
      { category: 'Kleidungsstücke', terms: ['Jacke', 'Hose', 'Schal', 'Mütze'] },
      { category: 'Wörter mit „haus“', terms: ['Rathaus', 'Wohnhaus', 'Krankenhaus', 'Schulhaus'] },
    ],
  },
  {
    id: 'vk-05',
    groups: [
      { category: 'Deutsche Flüsse', terms: ['Rhein', 'Elbe', 'Donau', 'Weser'] },
      { category: 'Gemüse', terms: ['Karotte', 'Erbse', 'Gurke', 'Spinat'] },
      { category: 'Sportarten', terms: ['Tennis', 'Handball', 'Rudern', 'Fechten'] },
      { category: 'Silbe „berg“', terms: ['Bergsee', 'Eisberg', 'Burgberg', 'Sandberg'] },
    ],
  },
  {
    id: 'vk-06',
    groups: [
      { category: 'Baustoffe', terms: ['Holz', 'Stein', 'Ziegel', 'Beton'] },
      { category: 'Insekten', terms: ['Biene', 'Ameise', 'Käfer', 'Libelle'] },
      { category: 'Himmelsrichtungen', terms: ['Norden', 'Süden', 'Osten', 'Westen'] },
      { category: 'Wörter enden auf „ung“', terms: ['Zeitung', 'Wohnung', 'Rechnung', 'Meinung'] },
    ],
  },
  {
    id: 'vk-07',
    groups: [
      { category: 'Küchengeräte', terms: ['Herd', 'Mixer', 'Toaster', 'Waage'] },
      { category: 'Bäume', terms: ['Eiche', 'Buche', 'Tanne', 'Birke'] },
      { category: 'Brettspiele', terms: ['Schach', 'Mühle', 'Dame', 'Mensch'] },
      { category: 'Doppelvokale', terms: ['See', 'Boot', 'Haar', 'Meer'] },
    ],
  },
  {
    id: 'vk-08',
    groups: [
      { category: 'Berufe', terms: ['Arzt', 'Lehrer', 'Bäcker', 'Pilot'] },
      { category: 'Blumen', terms: ['Rose', 'Tulpe', 'Lilie', 'Nelke'] },
      { category: 'Verkehrsmittel', terms: ['Zug', 'Bus', 'Fahrrad', 'Schiff'] },
      { category: 'Wörter mit „sonne“', terms: ['Sonnenschirm', 'Sonnenbrille', 'Sonnenblume', 'Sonnenaufgang'] },
    ],
  },
  {
    id: 'vk-09',
    groups: [
      { category: 'Metalle', terms: ['Eisen', 'Kupfer', 'Silber', 'Gold'] },
      { category: 'Süßigkeiten', terms: ['Bonbon', 'Schokolade', 'Keks', 'Eis'] },
      { category: 'Wohnräume', terms: ['Küche', 'Bad', 'Flur', 'Keller'] },
      { category: 'Reimwörter auf „-ein“', terms: ['Stein', 'Bein', 'Wein', 'Nein'] },
    ],
  },
  {
    id: 'vk-10',
    groups: [
      { category: 'Musikgenres', terms: ['Jazz', 'Rock', 'Pop', 'Klassik'] },
      { category: 'Werkzeuge', terms: ['Hammer', 'Säge', 'Zange', 'Bohrer'] },
      { category: 'Vögel', terms: ['Spatz', 'Amsel', 'Schwan', 'Rabe'] },
      { category: 'Vorsilbe „vor“', terms: ['Vorsicht', 'Vortrag', 'Vorort', 'Vorhang'] },
    ],
  },
  {
    id: 'vk-11',
    groups: [
      { category: 'Gewürze', terms: ['Pfeffer', 'Salz', 'Zimt', 'Paprika'] },
      { category: 'Länder Europas', terms: ['Polen', 'Spanien', 'Norwegen', 'Griechenland'] },
      { category: 'Schuharten', terms: ['Stiefel', 'Sandale', 'Pantoffel', 'Turnschuh'] },
      { category: 'Silbe „land“', terms: ['Heimatland', 'Bergland', 'Seenland', 'Flachland'] },
    ],
  },
  {
    id: 'vk-12',
    groups: [
      { category: 'Gemütslagen', terms: ['Freude', 'Trauer', 'Wut', 'Angst'] },
      { category: 'Papierprodukte', terms: ['Heft', 'Zeitung', 'Umschlag', 'Plakat'] },
      { category: 'Meereswellen-Wörter', terms: ['Welle', 'Brandung', 'Gischt', 'Strömung'] },
      { category: 'Endung „-chen“', terms: ['Mädchen', 'Häuschen', 'Stückchen', 'Briefchen'] },
    ],
  },
  {
    id: 'vk-13',
    groups: [
      { category: 'Frühstück', terms: ['Müsli', 'Joghurt', 'Marmelade', 'Croissant'] },
      { category: 'Gebirge', terms: ['Alpen', 'Harz', 'Eifel', 'Rhön'] },
      { category: 'Farben der Natur', terms: ['Ocker', 'Türkis', 'Oliv', 'Smaragd'] },
      { category: 'Wörter mit „zeit“', terms: ['Freizeit', 'Mittagzeit', 'Hochzeit', 'Jahreszeit'] },
    ],
  },
  {
    id: 'vk-14',
    groups: [
      { category: 'Schulmaterial', terms: ['Lineal', 'Zirkel', 'Radiergummi', 'Spitzer'] },
      { category: 'Milchprodukte', terms: ['Käse', 'Butter', 'Quark', 'Sahne'] },
      { category: 'Nachtaktive Tiere', terms: ['Fledermaus', 'Eule', 'Waschbär', 'Igel'] },
      { category: 'Zusammensetzungen mit „wasser“', terms: ['Wasserfall', 'Wasserkraft', 'Wasserhahn', 'Wasserkocher'] },
    ],
  },
  {
    id: 'vk-15',
    groups: [
      { category: 'Tanzstile', terms: ['Walzer', 'Tango', 'Samba', 'Ballett'] },
      { category: 'Obstbäume', terms: ['Apfelbaum', 'Kirschbaum', 'Birnbaum', 'Pflaumenbaum'] },
      { category: 'Bürodinge', terms: ['Ordner', 'Locher', 'Tacker', 'Stempel'] },
      { category: 'Wörter mit doppeltem Mitlaut', terms: ['Sommer', 'Hammer', 'Teller', 'Koffer'] },
    ],
  },
  {
    id: 'vk-16',
    groups: [
      { category: 'Deutsche Städte', terms: ['Hamburg', 'München', 'Köln', 'Leipzig'] },
      { category: 'Camping', terms: ['Zelt', 'Isomatte', 'Rucksack', 'Kocher'] },
      { category: 'Saiteninstrumente', terms: ['Gitarre', 'Cello', 'Banjo', 'Mandoline'] },
      { category: 'Silbe „spiel“', terms: ['Brettspiel', 'Wortspiel', 'Rollenspiel', 'Ballspiel'] },
    ],
  },
  {
    id: 'vk-17',
    groups: [
      { category: 'Suppen', terms: ['Tomatensuppe', 'Erbsensuppe', 'Hühnersuppe', 'Kürbissuppe'] },
      { category: 'Sternbilder', terms: ['Orion', 'Schwan', 'Leier', 'Waage'] },
      { category: 'Gartenarbeit', terms: ['Gießen', 'Jäten', 'Pflanzen', 'Ernten'] },
      { category: 'Reim auf „-acht“', terms: ['Nacht', 'Pracht', 'Macht', 'Schlacht'] },
    ],
  },
  {
    id: 'vk-18',
    groups: [
      { category: 'Käsesorten', terms: ['Gouda', 'Emmentaler', 'Camembert', 'Feta'] },
      { category: 'Fahrradteile', terms: ['Lenker', 'Sattel', 'Kette', 'Speiche'] },
      { category: 'Märchenfiguren', terms: ['Hexe', 'Zwerg', 'Fee', 'Drache'] },
      { category: 'Vorsilbe „mit“', terms: ['Mittag', 'Mitleid', 'Mitarbeiter', 'Mitspieler'] },
    ],
  },
  {
    id: 'vk-19',
    groups: [
      { category: 'Nüsse', terms: ['Haselnuss', 'Walnuss', 'Mandel', 'Cashew'] },
      { category: 'Bibliothek', terms: ['Regal', 'Ausleihe', 'Katalog', 'Lesesaal'] },
      { category: 'Winterkleidung', terms: ['Handschuh', 'Schal', 'Mütze', 'Mantel'] },
      { category: 'Wörter mit „licht“', terms: ['Kerzenlicht', 'Tageslicht', 'Mondlicht', 'Scheinwerferlicht'] },
    ],
  },
  {
    id: 'vk-20',
    groups: [
      { category: 'Teesorten', terms: ['Grüntee', 'Schwarztee', 'Kräutertee', 'Früchtetee'] },
      { category: 'Inseln', terms: ['Rügen', 'Sylt', 'Usedom', 'Helgoland'] },
      { category: 'Malutensilien', terms: ['Palette', 'Leinwand', 'Pinsel', 'Staffelei'] },
      { category: 'Endung „-heit“', terms: ['Freiheit', 'Schönheit', 'Wahrheit', 'Einheit'] },
    ],
  },
  {
    id: 'vk-21',
    groups: [
      { category: 'Brotbeläge', terms: ['Honig', 'Marmelade', 'Leberwurst', 'Käse'] },
      { category: 'Wettergeräte', terms: ['Thermometer', 'Barometer', 'Regenmesser', 'Wetterfahne'] },
      { category: 'Zoo-Tiere', terms: ['Panda', 'Giraffe', 'Nilpferd', 'Känguru'] },
      { category: 'Silbe „haus“ am Ende', terms: ['Wohnhaus', 'Gartenhaus', 'Gasthaus', 'Bootshaus'] },
    ],
  },
  {
    id: 'vk-22',
    groups: [
      { category: 'Saitenlose Instrumente', terms: ['Trompete', 'Klarinette', 'Orgel', 'Akkordeon'] },
      { category: 'Beeren', terms: ['Himbeere', 'Brombeere', 'Heidelbeere', 'Johannisbeere'] },
      { category: 'Schulhöfe-Wörter', terms: ['Pause', 'Klettergerüst', 'Ballspiel', 'Bank'] },
      { category: 'Doppelkonsonant „tt“', terms: ['Blatt', 'Brett', 'Watt', 'Schritt'] },
    ],
  },
  {
    id: 'vk-23',
    groups: [
      { category: 'Deutsche Seen', terms: ['Chiemsee', 'Bodensee', 'Müritz', 'Ammersee'] },
      { category: 'Frühjahrsblüher', terms: ['Krokus', 'Narzisse', 'Schneeglöckchen', 'Osterglocke'] },
      { category: 'Nähen', terms: ['Nadel', 'Faden', 'Schere', 'Stoff'] },
      { category: 'Wörter mit „spiel“ am Anfang', terms: ['Spielplatz', 'Spielzeug', 'Spielregeln', 'Spielzeit'] },
    ],
  },
  {
    id: 'vk-24',
    groups: [
      { category: 'Backzutaten', terms: ['Mehl', 'Hefe', 'Zucker', 'Butter'] },
      { category: 'Berge', terms: ['Zugspitze', 'Brocken', 'Watzmann', 'Feldberg'] },
      { category: 'Kartenfarben', terms: ['Herz', 'Pik', 'Kreuz', 'Karo'] },
      { category: 'Endung „-schaft“', terms: ['Freundschaft', 'Landschaft', 'Wissenschaft', 'Mannschaft'] },
    ],
  },
  {
    id: 'vk-25',
    groups: [
      { category: 'Frühstücksgetränke', terms: ['Kaffee', 'Kakao', 'Orangensaft', 'Milchtee'] },
      { category: 'Waldfrüchte', terms: ['Heidelbeere', 'Pilz', 'Buchecker', 'Himbeere'] },
      { category: 'Schreibwaren', terms: ['Notizbuch', 'Ordner', 'Locher', 'Marker'] },
      { category: 'Vorsilbe „über“', terms: ['Überrock', 'Überfahrt', 'Überblick', 'Übernachtung'] },
    ],
  },
  {
    id: 'vk-26',
    groups: [
      { category: 'Teigwaren', terms: ['Spaghetti', 'Penne', 'Lasagne', 'Tortellini'] },
      { category: 'Nordseeorte', terms: ['Husum', 'Büsum', 'Cuxhaven', 'Norderney'] },
      { category: 'Gartenpflanzen', terms: ['Lavendel', 'Rosmarin', 'Thymian', 'Basilikum'] },
      { category: 'Reim auf „-ung“', terms: ['Schwung', 'Sprung', 'Umschwung', 'Vorsprung'] },
    ],
  },
  {
    id: 'vk-27',
    groups: [
      { category: 'Frühstückseier', terms: ['Rührei', 'Spiegelei', 'Frühstücksei', 'Omelett'] },
      { category: 'Musiknoten-Wörter', terms: ['Note', 'Takt', 'Melodie', 'Rhythmus'] },
      { category: 'Wintersport', terms: ['Ski', 'Schlitten', 'Eislauf', 'Snowboard'] },
      { category: 'Silbe „rad“', terms: ['Fahrrad', 'Mühlrad', 'Wasserrad', 'Lenkrad'] },
    ],
  },
  {
    id: 'vk-28',
    groups: [
      { category: 'Zitrusfrüchte', terms: ['Orange', 'Zitrone', 'Limette', 'Grapefruit'] },
      { category: 'Deutsche Inseln Ostsee', terms: ['Rügen', 'Usedom', 'Fehmarn', 'Poel'] },
      { category: 'Malerei-Farben', terms: ['Ultramarin', 'Zinnober', 'Ocker', 'Umbra'] },
      { category: 'Wörter mit „nacht“', terms: ['Mitternacht', 'Nachtisch', 'Nachtwache', 'Nachtzug'] },
    ],
  },
  {
    id: 'vk-29',
    groups: [
      { category: 'Brotarten', terms: ['Vollkorn', 'Roggen', 'Ciabatta', 'Baguette'] },
      { category: 'Fluginsekten', terms: ['Schmetterling', 'Libelle', 'Hummel', 'Mücke'] },
      { category: 'Wohnaccessoires', terms: ['Kissen', 'Decke', 'Teppich', 'Vorhang'] },
      { category: 'Endung „-nis“', terms: ['Erlebnis', 'Geheimnis', 'Ergebnis', 'Hindernis'] },
    ],
  },
  {
    id: 'vk-30',
    groups: [
      { category: 'Milchkaffee-Varianten', terms: ['Cappuccino', 'Latte', 'Macchiato', 'Flat White'] },
      { category: 'Nationalparks', terms: ['Eifel', 'Harz', 'Wattenmeer', 'Sächsische Schweiz'] },
      { category: 'Kinderbücher-Figuren', terms: ['Pippi', 'Emil', 'Bibi', 'Jim'] },
      { category: 'Vorsilbe „aus“', terms: ['Ausgang', 'Ausflug', 'Ausblick', 'Auszeit'] },
    ],
  },
]
