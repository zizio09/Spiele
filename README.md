# Tagesrunde

Statische Website mit genau vier deutschen Tagesrätseln: **Wordle**, **Viererkette**, **Sudoku** und **Paarsuche**.

Alles läuft im Browser. Tagesrätsel richten sich nach dem Datum in `Europe/Berlin`. Fortschritt liegt in `localStorage`.

## Voraussetzungen

- Node.js 20+ und npm

## Entwicklung

```bash
npm install
npm run dev
```

Die Entwicklungsumgebung läuft unter [http://127.0.0.1:43141](http://127.0.0.1:43141).

## Tests und Build

```bash
npm test
npm run build
```

`dist/` ist absichtlich versioniert (der Raspberry Pi baut nicht selbst).

## Siegesfeier (Hund)

Wedeln läuft über `public/celebrations/wag-animated.gif` (links→mitte→rechts→mitte, ~5 fps).
Einzel-WebPs (~40 KB) bleiben für reduced-motion.
Originale Cutouts (~1.7 MB PNG) gehören nach `assets/celebrations-source/` (gitignored). Neu erzeugen:

```bash
npm run optimize:celebrations
```

Automatischer Sichtcheck des GIFs (Preview-Server muss laufen):

```bash
npm run preview -- --host 0.0.0.0 --port 43141
npm run verify:wag
```

## Produktion auf dem Raspberry Pi

1. Repository nach `/var/www/spiele` klonen oder den Inhalt dorthin kopieren.
2. Nginx-Serverblock aus `deploy/nginx-spiele.conf` einbinden (lauscht nur auf `127.0.0.1:8081`, Root `/var/www/spiele/dist`).
3. Nginx neu laden.
4. Cloudflare-Tunnel-Route für `spiele.zionlehnert.com` → `http://127.0.0.1:8081` selbst setzen.

Kein Node-Server, keine Datenbank, kein systemd-Dienst für diese Seite.

## Tagesrätsel und Zusatzrunden

Jedes Spiel speichert den **Tagesfortschritt** in `localStorage` (Schlüssel `tagesrunde-*`, gebunden an das Europe/Berlin-Datum).

Nach einem beendeten Spiel erscheint **„Noch ein Spiel spielen“**. Das startet eine **Zusatzrunde** mit einem anderen Rätsel derselben Spieldatenbank. Zusatzrunden:
- werden **nicht** in den Tagesfortschritt geschrieben,
- sind mit dem Badge „Zusatzrunde“ gekennzeichnet,
- lassen das offizielle Tagesrätsel unverändert.

Bei Viererkette zählen Siege (Tagesrätsel und Zusatzrunden) in die Lebensstatistik: Spiele, Punkteschnitt, höchste Punktzahl.
