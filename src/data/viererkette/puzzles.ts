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

/**
 * Originale Tagesrätsel mit thematisch knackigen Verbindungen
 * (Grün leicht → Lila oft Sprachmuster). Keine SPIEGEL-Inhalte.
 */
export const VIERERKETTE_PUZZLES: readonly ViererkettePuzzle[] = [
  {
    id: 'vk-01',
    groups: [
      { difficulty: 'green', category: 'DEUTSCHE BROTSORTEN', explanation: 'Typische Brotsorten aus der Bäckerei', terms: ['Roggen', 'Dinkel', 'Vollkorn', 'Sauerteig'] },
      { difficulty: 'yellow', category: 'STÄDTE AN DER OSTSEE', explanation: 'Orte an Deutschlands Ostseeküste', terms: ['Rostock', 'Kiel', 'Lübeck', 'Stralsund'] },
      { difficulty: 'red', category: 'FIGUREN AUS KINDERBÜCHERN', explanation: 'Figuren der deutschsprachigen Kinderliteratur', terms: ['Pippi', 'Jim Knopf', 'Momo', 'Pünktchen'] },
      { difficulty: 'purple', category: '„AUF DER … SEIN“', explanation: 'Redewendungen: auf der Suche / Flucht / Höhe / Straße sein', terms: ['Suche', 'Flucht', 'Höhe', 'Straße'] },
    ],
  },
  {
    id: 'vk-02',
    groups: [
      { difficulty: 'green', category: 'WÜRSTCHEN VOM GRILL', explanation: 'Klassiker für Grill und Imbiss', terms: ['Bratwurst', 'Thüringer', 'Käsekrainer', 'Currywurst'] },
      { difficulty: 'yellow', category: 'ALPENLÄNDER', explanation: 'Staaten mit Anteil an den Alpen', terms: ['Österreich', 'Schweiz', 'Italien', 'Frankreich'] },
      { difficulty: 'red', category: 'BUNDESLIGA-TRADITIONSVEREINE', explanation: 'Vereine mit langer Bundesliga-Geschichte', terms: ['Bayern München', 'Borussia Dortmund', 'Schalke 04', 'Gladbach'] },
      { difficulty: 'purple', category: '„INS … GEHEN“', explanation: 'Feste Wendungen: ins Bett / Kino / Theater / Ausland gehen', terms: ['Bett', 'Kino', 'Theater', 'Ausland'] },
    ],
  },
  {
    id: 'vk-03',
    groups: [
      { difficulty: 'green', category: 'WEIHNACHTSGEBÄCK', explanation: 'Süßes aus der Adventsbäckerei', terms: ['Vanillekipferl', 'Lebkuchen', 'Spekulatius', 'Stollen'] },
      { difficulty: 'yellow', category: 'INSELN IN DER NORDSEE', explanation: 'Deutsche Nordseeinseln', terms: ['Sylt', 'Norderney', 'Helgoland', 'Borkum'] },
      { difficulty: 'red', category: 'WERKZEUGE DES TISCHLERS', explanation: 'Geräte aus der Holzwerkstatt', terms: ['Hobel', 'Stemmeisen', 'Gehrungslade', 'Zwinge'] },
      { difficulty: 'purple', category: '„DEN … MACHEN“', explanation: 'Redewendungen: den Abwasch / Hof / Salat / Abschluss machen', terms: ['Abwasch', 'Hof', 'Salat', 'Abschluss'] },
    ],
  },
  {
    id: 'vk-04',
    groups: [
      { difficulty: 'green', category: 'KÄSESORTEN AUS EUROPA', explanation: 'Bekannte europäische Käse', terms: ['Gouda', 'Emmentaler', 'Camembert', 'Parmesan'] },
      { difficulty: 'yellow', category: 'DEUTSCHE FLÜSSE', explanation: 'Große Flüsse in Deutschland', terms: ['Rhein', 'Elbe', 'Donau', 'Oder'] },
      { difficulty: 'red', category: 'TAGESZEITUNGEN', explanation: 'Kürzel bekannter Zeitungen', terms: ['FAZ', 'SZ', 'taz', 'NZZ'] },
      { difficulty: 'purple', category: '„ES IST ZUM …“', explanation: 'Ausrufe der Verzweiflung: zum Verrücktwerden / Auswachsen / Heulen / Weinen', terms: ['Verrücktwerden', 'Auswachsen', 'Heulen', 'Weinen'] },
    ],
  },
  {
    id: 'vk-05',
    groups: [
      { difficulty: 'green', category: 'HERBSTGEMÜSE', explanation: 'Gemüse der kühleren Jahreszeit', terms: ['Kürbis', 'Lauch', 'Wirsing', 'Pastinake'] },
      { difficulty: 'yellow', category: 'STÄDTE IN SACHSEN', explanation: 'Orte im Freistaat Sachsen', terms: ['Dresden', 'Leipzig', 'Chemnitz', 'Meißen'] },
      { difficulty: 'red', category: 'KLAVIERKOMPONISTEN', explanation: 'Komponisten mit berühmten Klavierwerken', terms: ['Chopin', 'Beethoven', 'Schumann', 'Liszt'] },
      { difficulty: 'purple', category: '„UNTER …“', explanation: 'Präpositionalphrasen: unter Druck / Verdacht / Wasser / Dach', terms: ['Druck', 'Verdacht', 'Wasser', 'Dach'] },
    ],
  },
  {
    id: 'vk-06',
    groups: [
      { difficulty: 'green', category: 'FRÜHSTÜCKSAUFSTRICHE', explanation: 'Was man aufs Brot streicht', terms: ['Marmelade', 'Honig', 'Nuss-Nougat-Creme', 'Leberwurst'] },
      { difficulty: 'yellow', category: 'SCHWARZWALD-ORTE', explanation: 'Bekannte Orte im Schwarzwald', terms: ['Triberg', 'Baden-Baden', 'Freiburg', 'Titisee'] },
      { difficulty: 'red', category: 'MÄRCHENFIGUREN', explanation: 'Figuren aus den Märchen der Brüder Grimm u. a.', terms: ['Hexe', 'Zwerg', 'Riese', 'Froschkönig'] },
      { difficulty: 'purple', category: '„DAS IST NICHT MEIN …“', explanation: 'Ablehnung: nicht mein Bier / Ding / Fall / Fach', terms: ['Bier', 'Ding', 'Fall', 'Fach'] },
    ],
  },
  {
    id: 'vk-07',
    groups: [
      { difficulty: 'green', category: 'SUPPEN AUS DER KANTINE', explanation: 'Klassische Suppen auf deutschsprachigen Speisekarten', terms: ['Erbsensuppe', 'Gulaschsuppe', 'Hochzeitssuppe', 'Kartoffelsuppe'] },
      { difficulty: 'yellow', category: 'STÄDTE AN DER DONAU', explanation: 'Orte am Donau-Lauf', terms: ['Ulm', 'Regensburg', 'Passau', 'Wien'] },
      { difficulty: 'red', category: 'LITERATUR-NOBELPREISTRÄGER', explanation: 'Deutschsprachige Autoren mit Literatur-Nobelpreis', terms: ['Thomas Mann', 'Heinrich Böll', 'Günter Grass', 'Herta Müller'] },
      { difficulty: 'purple', category: '„EINEN … WERFEN“', explanation: 'Redewendungen: einen Blick / Anker / Schatten / Stein werfen', terms: ['Blick', 'Anker', 'Schatten', 'Stein'] },
    ],
  },
  {
    id: 'vk-08',
    groups: [
      { difficulty: 'green', category: 'BEERENSORTEN', explanation: 'Beeren aus Garten und Wald', terms: ['Himbeere', 'Brombeere', 'Stachelbeere', 'Johannisbeere'] },
      { difficulty: 'yellow', category: 'HANSESTÄDTE', explanation: 'Historische und heutige Hansestädte', terms: ['Hamburg', 'Bremen', 'Lübeck', 'Wismar'] },
      { difficulty: 'red', category: 'SCHACHFIGUREN', explanation: 'Figuren auf dem Schachbrett', terms: ['Turm', 'Springer', 'Läufer', 'Bauer'] },
      { difficulty: 'purple', category: '„VOR DEM … STEHEN“', explanation: 'Wendungen: vor dem Nichts / Aus / Abgrund / Ruin stehen', terms: ['Nichts', 'Aus', 'Abgrund', 'Ruin'] },
    ],
  },
  {
    id: 'vk-09',
    groups: [
      { difficulty: 'green', category: 'DEUTSCHE KUCHENSORTEN', explanation: 'Klassiker der Konditorei', terms: ['Käsekuchen', 'Apfelkuchen', 'Bienenstich', 'Schwarzwälder'] },
      { difficulty: 'yellow', category: 'MESSESTÄDTE', explanation: 'Städte mit großen Messen', terms: ['Hannover', 'Frankfurt am Main', 'Köln', 'Düsseldorf'] },
      { difficulty: 'red', category: 'WINTERSPORTARTEN', explanation: 'Sport auf Schnee und Eis', terms: ['Ski Alpin', 'Biathlon', 'Eishockey', 'Rodeln'] },
      { difficulty: 'purple', category: '„NACH …“', explanation: 'Angaben: nach Lust / Maßgabe / Feierabend / Mitternacht', terms: ['Lust', 'Maßgabe', 'Feierabend', 'Mitternacht'] },
    ],
  },
  {
    id: 'vk-10',
    groups: [
      { difficulty: 'green', category: 'GEWÜRZE AUS DER KÜCHE', explanation: 'Alltägliche Gewürze', terms: ['Pfeffer', 'Zimt', 'Muskat', 'Paprika'] },
      { difficulty: 'yellow', category: 'STÄDTE IN BAYERN', explanation: 'Orte im Freistaat Bayern', terms: ['Nürnberg', 'Augsburg', 'Würzburg', 'Ingolstadt'] },
      { difficulty: 'red', category: 'OPERNKOMPONISTEN', explanation: 'Komponisten berühmter Opern', terms: ['Mozart', 'Wagner', 'Verdi', 'Puccini'] },
      { difficulty: 'purple', category: '„OHNE …“', explanation: 'Feste Wendungen: ohne Wenn und Aber / Rücksicht / Garantie / Ende', terms: ['Wenn und Aber', 'Rücksicht', 'Garantie', 'Ende'] },
    ],
  },
  {
    id: 'vk-11',
    groups: [
      { difficulty: 'green', category: 'NUDELFORMEN', explanation: 'Italienische Teigwarenformen', terms: ['Spaghetti', 'Penne', 'Farfalle', 'Fusilli'] },
      { difficulty: 'yellow', category: 'WEINBAUGEBIETE', explanation: 'Deutsche Weinbaugebiete', terms: ['Mosel', 'Rheingau', 'Pfalz', 'Franken'] },
      { difficulty: 'red', category: 'PHILOSOPHEN', explanation: 'Namen aus der Philosophiegeschichte', terms: ['Kant', 'Hegel', 'Nietzsche', 'Schopenhauer'] },
      { difficulty: 'purple', category: '„ZU … GREIFEN“', explanation: 'Wendungen: zu den Waffen / den Sternen / Papier / den Mitteln greifen', terms: ['den Waffen', 'den Sternen', 'Papier', 'den Mitteln'] },
    ],
  },
  {
    id: 'vk-12',
    groups: [
      { difficulty: 'green', category: 'FISCHE AUF DEM MARKT', explanation: 'Speisefische aus der Küche', terms: ['Lachs', 'Forelle', 'Kabeljau', 'Hering'] },
      { difficulty: 'yellow', category: 'KÜSTENORTE AN DER NORDSEE', explanation: 'Orte an der deutschen Nordseeküste', terms: ['Cuxhaven', 'Büsum', 'Husum', 'Wilhelmshaven'] },
      { difficulty: 'red', category: 'ARCHITEKTURSTILE', explanation: 'Epochen und Stile der Baukunst', terms: ['Gotik', 'Barock', 'Jugendstil', 'Bauhaus'] },
      { difficulty: 'purple', category: '„IM … SEIN“', explanation: 'Zustände: im Bilde / Recht / Stress / Trend sein', terms: ['Bilde', 'Recht', 'Stress', 'Trend'] },
    ],
  },
  {
    id: 'vk-13',
    groups: [
      { difficulty: 'green', category: 'EISDIELE-SORTEN', explanation: 'Klassische Eissorten', terms: ['Vanille', 'Schokolade', 'Erdbeere', 'Stracciatella'] },
      { difficulty: 'yellow', category: 'UNIVERSITÄTSSTÄDTE', explanation: 'Städte mit traditionsreichen Universitäten', terms: ['Heidelberg', 'Göttingen', 'Tübingen', 'Jena'] },
      { difficulty: 'red', category: 'TANZSTILE', explanation: 'Gesellschafts- und Bühnentänze', terms: ['Walzer', 'Tango', 'Foxtrott', 'Ballett'] },
      { difficulty: 'purple', category: '„AUS DEM …“', explanation: 'Wendungen: aus dem Ärmel / Häuschen / Stegreif / Konzept', terms: ['Ärmel', 'Häuschen', 'Stegreif', 'Konzept'] },
    ],
  },
  {
    id: 'vk-14',
    groups: [
      { difficulty: 'green', category: 'KARTOFFELGERICHTE', explanation: 'Gerichte rund um die Kartoffel', terms: ['Bratkartoffeln', 'Knödel', 'Puffer', 'Gratin'] },
      { difficulty: 'yellow', category: 'STÄDTE IN BADEN-WÜRTTEMBERG', explanation: 'Orte in Baden-Württemberg', terms: ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Heilbronn'] },
      { difficulty: 'red', category: 'CHEMISCHE ELEMENTE', explanation: 'Elemente (deutsche Namen)', terms: ['Eisen', 'Kupfer', 'Schwefel', 'Kohlenstoff'] },
      { difficulty: 'purple', category: '„BIS IN DIE …“', explanation: 'Steigerungen: bis in die Knochen / Puppen / Haarspitzen / späte Nacht', terms: ['Knochen', 'Puppen', 'Haarspitzen', 'späte Nacht'] },
    ],
  },
  {
    id: 'vk-15',
    groups: [
      { difficulty: 'green', category: 'WURST VOM SCHNITT', explanation: 'Klassische Wurstsorten zum Belag', terms: ['Salami', 'Schinkenwurst', 'Mortadella', 'Bierschinken'] },
      { difficulty: 'yellow', category: 'STÄDTE AN DER ELBE', explanation: 'Orte am Elbe-Lauf', terms: ['Magdeburg', 'Pirna', 'Wittenberge', 'Torgau'] },
      { difficulty: 'red', category: 'FILMFESTIVALS', explanation: 'Bekannte Filmfestivals', terms: ['Berlinale', 'Cannes', 'Venedig', 'Locarno'] },
      { difficulty: 'purple', category: '„GEGEN DEN …“', explanation: 'Wendungen: gegen den Strom / Strich / Wind / Uhrzeigersinn', terms: ['Strom', 'Strich', 'Wind', 'Uhrzeigersinn'] },
    ],
  },
  {
    id: 'vk-16',
    groups: [
      { difficulty: 'green', category: 'SALATE AUF DER KARTE', explanation: 'Beliebte Salatvarianten', terms: ['Caesar', 'Griechischer', 'Kartoffelsalat', 'Nudelsalat'] },
      { difficulty: 'yellow', category: 'HAFENSTÄDTE', explanation: 'Deutsche Städte mit bedeutendem Hafen', terms: ['Hamburg', 'Bremerhaven', 'Rostock', 'Emden'] },
      { difficulty: 'red', category: 'LITERARISCHE EPOCHEN', explanation: 'Epochen der deutschsprachigen Literatur', terms: ['Sturm und Drang', 'Romantik', 'Naturalismus', 'Expressionismus'] },
      { difficulty: 'purple', category: '„AN DIE …“', explanation: 'Wendungen: an die Arbeit / Decke / Macht / Wand', terms: ['Arbeit', 'Decke', 'Macht', 'Wand'] },
    ],
  },
  {
    id: 'vk-17',
    groups: [
      { difficulty: 'green', category: 'TEESORTEN', explanation: 'Arten von Tee', terms: ['Grüntee', 'Schwarztee', 'Rooibos', 'Kräutertee'] },
      { difficulty: 'yellow', category: 'STÄDTE IN HESSEN', explanation: 'Orte in Hessen', terms: ['Kassel', 'Wiesbaden', 'Darmstadt', 'Marburg'] },
      { difficulty: 'red', category: 'MUSEUMSTYPEN', explanation: 'Arten von Museen', terms: ['Kunsthalle', 'Technikmuseum', 'Heimatmuseum', 'Pinakothek'] },
      { difficulty: 'purple', category: '„VOM … HER“', explanation: 'Wendungen: vom Gefühl / Typ / Prinzip / Charakter her', terms: ['Gefühl', 'Typ', 'Prinzip', 'Charakter'] },
    ],
  },
  {
    id: 'vk-18',
    groups: [
      { difficulty: 'green', category: 'BACKZUTATEN', explanation: 'Grundzutaten zum Backen', terms: ['Mehl', 'Hefe', 'Backpulver', 'Vanillezucker'] },
      { difficulty: 'yellow', category: 'MITTELGEBIRGE', explanation: 'Deutsche Mittelgebirge', terms: ['Harz', 'Eifel', 'Rhön', 'Taunus'] },
      { difficulty: 'red', category: 'BRETTSPIELE', explanation: 'Klassische Brettspiele', terms: ['Mensch ärgere dich nicht', 'Mühle', 'Dame', 'Halma'] },
      { difficulty: 'purple', category: '„IN DIE … GEHEN“', explanation: 'Wendungen: in die Luft / Knie / Verlängerung / Bresche gehen', terms: ['Luft', 'Knie', 'Verlängerung', 'Bresche'] },
    ],
  },
  {
    id: 'vk-19',
    groups: [
      { difficulty: 'green', category: 'SCHARFE BEGLEITER', explanation: 'Würzige Beilagen und Saucen', terms: ['Mittelscharfer Senf', 'Dijon', 'Meerrettich', 'Remoulade'] },
      { difficulty: 'yellow', category: 'STÄDTE IN NIEDERSACHSEN', explanation: 'Orte in Niedersachsen', terms: ['Braunschweig', 'Oldenburg', 'Osnabrück', 'Wolfsburg'] },
      { difficulty: 'red', category: 'ORCHESTERINSTRUMENTE', explanation: 'Instrumente im klassischen Orchester', terms: ['Violine', 'Cello', 'Pauke', 'Fagott'] },
      { difficulty: 'purple', category: '„MIT … RECHNEN“', explanation: 'Wendungen: mit allem / dem Schlimmsten / Widerstand / Applaus rechnen', terms: ['allem', 'dem Schlimmsten', 'Widerstand', 'Applaus'] },
    ],
  },
  {
    id: 'vk-20',
    groups: [
      { difficulty: 'green', category: 'OBST AUS WARMEN LÄNDERN', explanation: 'Wärmeliebendes Obst', terms: ['Feige', 'Granatapfel', 'Mango', 'Dattel'] },
      { difficulty: 'yellow', category: 'STÄDTE IN THÜRINGEN', explanation: 'Orte in Thüringen', terms: ['Erfurt', 'Weimar', 'Gera', 'Eisenach'] },
      { difficulty: 'red', category: 'FUSSBALLPOSITIONEN', explanation: 'Positionen auf dem Rasen', terms: ['Torwart', 'Libero', 'Stürmer', 'Mittelfeld'] },
      { difficulty: 'purple', category: '„UM … KÄMPFEN“', explanation: 'Wendungen: um jeden Preis / die Vorherrschaft / Anerkennung / den Titel kämpfen', terms: ['jeden Preis', 'die Vorherrschaft', 'Anerkennung', 'den Titel'] },
    ],
  },
  {
    id: 'vk-21',
    groups: [
      { difficulty: 'green', category: 'DINGE VOM BAUERNHOF', explanation: 'Typische Dinge vom Hof', terms: ['Stroh', 'Traktor', 'Kuhstall', 'Heuboden'] },
      { difficulty: 'yellow', category: 'STÄDTE IN SCHLESWIG-HOLSTEIN', explanation: 'Orte in Schleswig-Holstein', terms: ['Flensburg', 'Neumünster', 'Eutin', 'Rendsburg'] },
      { difficulty: 'red', category: 'RECHTSBEGRIFFE', explanation: 'Grundbegriffe aus dem Recht', terms: ['Klage', 'Urteil', 'Berufung', 'Revision'] },
      { difficulty: 'purple', category: '„JETZT GEHT’S UM …“', explanation: 'Wendungen: jetzt geht’s um die Wurst / das Ganze / alles / den Titel', terms: ['die Wurst', 'das Ganze', 'alles', 'den Titel'] },
    ],
  },
  {
    id: 'vk-22',
    groups: [
      { difficulty: 'green', category: 'BIERSORTEN', explanation: 'Geläufige Biersorten in Deutschland', terms: ['Pils', 'Weißbier', 'Kölsch', 'Export'] },
      { difficulty: 'yellow', category: 'STÄDTE IN RHEINLAND-PFALZ', explanation: 'Orte in Rheinland-Pfalz', terms: ['Mainz', 'Koblenz', 'Trier', 'Ludwigshafen'] },
      { difficulty: 'red', category: 'PLANETEN DES SONNENSYSTEMS', explanation: 'Planeten (ohne Zwergplaneten)', terms: ['Merkur', 'Venus', 'Mars', 'Jupiter'] },
      { difficulty: 'purple', category: '„DAS HAT …“', explanation: 'Wendungen: das hat Methode / Hand und Fuß / Niveau / Stil', terms: ['Methode', 'Hand und Fuß', 'Niveau', 'Stil'] },
    ],
  },
  {
    id: 'vk-23',
    groups: [
      { difficulty: 'green', category: 'BRATEN UND SCHMORGERICHTE', explanation: 'Klassiker der deutschen Hausmannskost', terms: ['Sauerbraten', 'Roulade', 'Gulasch', 'Schweinsbraten'] },
      { difficulty: 'yellow', category: 'STÄDTE IN MECKLENBURG-VORPOMMERN', explanation: 'Orte in Mecklenburg-Vorpommern', terms: ['Schwerin', 'Neubrandenburg', 'Greifswald', 'Wismar'] },
      { difficulty: 'red', category: 'FARBTÖNE DER MALEREI', explanation: 'Pigment- und Farbnamen', terms: ['Ultramarin', 'Zinnober', 'Ocker', 'Umbra'] },
      { difficulty: 'purple', category: '„KEIN …“', explanation: 'Wendungen: kein Thema / Problem / Zweifel / Wunder', terms: ['Thema', 'Problem', 'Zweifel', 'Wunder'] },
    ],
  },
  {
    id: 'vk-24',
    groups: [
      { difficulty: 'green', category: 'MILCHPRODUKTE', explanation: 'Produkte aus der Molkerei', terms: ['Joghurt', 'Quark', 'Buttermilch', 'Kefir'] },
      { difficulty: 'yellow', category: 'STÄDTE IM RUHRGEBIET', explanation: 'Orte im Ruhrgebiet', terms: ['Bochum', 'Gelsenkirchen', 'Duisburg', 'Oberhausen'] },
      { difficulty: 'red', category: 'GRIECHISCHE GÖTTER', explanation: 'Gottheiten der Antike', terms: ['Zeus', 'Hera', 'Apollon', 'Athena'] },
      { difficulty: 'purple', category: '„ZU … KOMMEN“', explanation: 'Wendungen: zu spät / kurz / Fall / Wort kommen', terms: ['spät', 'kurz', 'Fall', 'Wort'] },
    ],
  },
  {
    id: 'vk-25',
    groups: [
      { difficulty: 'green', category: 'FASTNACHTS-/KARNEVALS-SÜSSES', explanation: 'Süßes zur närrischen Zeit', terms: ['Berliner', 'Krapfen', 'Mutzen', 'Fasnachtsküchle'] },
      { difficulty: 'yellow', category: 'STÄDTE IN BRANDENBURG', explanation: 'Orte in Brandenburg', terms: ['Potsdam', 'Cottbus', 'Brandenburg an der Havel', 'Frankfurt (Oder)'] },
      { difficulty: 'red', category: 'SEGELBOOT-BEGRIFFE', explanation: 'Begriffe aus dem Segelsport', terms: ['Schot', 'Ruder', 'Mast', 'Bug'] },
      { difficulty: 'purple', category: '„ÜBER … GEHEN“', explanation: 'Wendungen: über Bord / Leisten / Nacht / die Bühne gehen', terms: ['Bord', 'Leisten', 'Nacht', 'die Bühne'] },
    ],
  },
  {
    id: 'vk-26',
    groups: [
      { difficulty: 'green', category: 'PILZE AUS DEM WALD', explanation: 'Bekannte Speisepilze', terms: ['Steinpilz', 'Pfifferling', 'Maronenröhrling', 'Morchel'] },
      { difficulty: 'yellow', category: 'STÄDTE IN SACHSEN-ANHALT', explanation: 'Orte in Sachsen-Anhalt', terms: ['Halle', 'Magdeburg', 'Dessau', 'Wittenberg'] },
      { difficulty: 'red', category: 'METRISCHE VERSMASSE', explanation: 'Klassische Versmaße', terms: ['Jambus', 'Trochäus', 'Daktylus', 'Anapäst'] },
      { difficulty: 'purple', category: '„AUS … MACHEN“', explanation: 'Wendungen: aus einer Mücke / dem Nichts / der Not / Fehlern etwas machen', terms: ['einer Mücke', 'dem Nichts', 'der Not', 'Fehlern'] },
    ],
  },
  {
    id: 'vk-27',
    groups: [
      { difficulty: 'green', category: 'WASSERSPORT', explanation: 'Sportarten auf und im Wasser', terms: ['Rudern', 'Kanu', 'Segeln', 'Schwimmen'] },
      { difficulty: 'yellow', category: 'STÄDTE IM SAARLAND', explanation: 'Orte im Saarland', terms: ['Saarbrücken', 'Neunkirchen', 'Homburg', 'Völklingen'] },
      { difficulty: 'red', category: 'KAMMERMUSIK-BESETZUNGEN', explanation: 'Klassische Ensembleformen', terms: ['Streichquartett', 'Trio', 'Duo', 'Quintett'] },
      { difficulty: 'purple', category: '„AM …“', explanation: 'Wendungen: am Limit / Ende / Ball / Ruder', terms: ['Limit', 'Ende', 'Ball', 'Ruder'] },
    ],
  },
  {
    id: 'vk-28',
    groups: [
      { difficulty: 'green', category: 'KRÄUTER FÜR DIE KÜCHE', explanation: 'Beliebte Küchenkräuter', terms: ['Basilikum', 'Rosmarin', 'Thymian', 'Petersilie'] },
      { difficulty: 'yellow', category: 'STÄDTE IN BERLINER UMLAND', explanation: 'Orte nahe Berlin', terms: ['Potsdam', 'Oranienburg', 'Bernau', 'Königs Wusterhausen'] },
      { difficulty: 'red', category: 'RADIOAKTIVE ELEMENTE', explanation: 'Elemente mit Radioaktivität', terms: ['Uran', 'Radium', 'Plutonium', 'Thorium'] },
      { difficulty: 'purple', category: '„NACH DEM …“', explanation: 'Wendungen: nach dem Motto / Rechten / Essen / Fest', terms: ['Motto', 'Rechten', 'Essen', 'Fest'] },
    ],
  },
  {
    id: 'vk-29',
    groups: [
      { difficulty: 'green', category: 'SUPPENBEILAGEN', explanation: 'Was in die Suppe kommt', terms: ['Einlage', 'Croutons', 'Schnittlauch', 'Semmelknödel'] },
      { difficulty: 'yellow', category: 'STÄDTE AN DER MOSEL', explanation: 'Orte an der Mosel', terms: ['Trier', 'Cochem', 'Bernkastel-Kues', 'Traben-Trarbach'] },
      { difficulty: 'red', category: 'MYTHISCHE WESEN', explanation: 'Gestalten aus Sage und Mythos', terms: ['Drache', 'Einhorn', 'Phoenix', 'Sphinx'] },
      { difficulty: 'purple', category: '„BIS AUF …“', explanation: 'Wendungen: bis auf das Messer / die Knochen / Weiteres / den heutigen Tag', terms: ['das Messer', 'die Knochen', 'Weiteres', 'den heutigen Tag'] },
    ],
  },
  {
    id: 'vk-30',
    groups: [
      { difficulty: 'green', category: 'KAFFEEGETRÄNKE', explanation: 'Getränke aus der Kaffeekarte', terms: ['Espresso', 'Cappuccino', 'Latte Macchiato', 'Filterkaffee'] },
      { difficulty: 'yellow', category: 'STÄDTE AN DER SPREE', explanation: 'Orte an der Spree', terms: ['Berlin', 'Cottbus', 'Spremberg', 'Lübben'] },
      { difficulty: 'red', category: 'ZEICHEN DER ZODIAKS', explanation: 'Sternzeichen (deutsche Namen)', terms: ['Widder', 'Stier', 'Zwilling', 'Krebs'] },
      { difficulty: 'purple', category: '„ES LIEGT …“', explanation: 'Wendungen: es liegt auf der Hand / in der Luft / an dir / im Argen', terms: ['auf der Hand', 'in der Luft', 'an dir', 'im Argen'] },
    ],
  },
]
