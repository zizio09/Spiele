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

## Produktion auf dem Raspberry Pi

1. Repository nach `/var/www/spiele` klonen oder den Inhalt dorthin kopieren.
2. Nginx-Serverblock aus `deploy/nginx-spiele.conf` einbinden (lauscht nur auf `127.0.0.1:8081`, Root `/var/www/spiele/dist`).
3. Nginx neu laden.
4. Cloudflare-Tunnel-Route für `spiele.zionlehnert.com` → `http://127.0.0.1:8081` selbst setzen.

Kein Node-Server, keine Datenbank, kein systemd-Dienst für diese Seite.

## Technik

- React, TypeScript, Vite (`base: "/"`)
- Client-seitiges Routing (Server liefert `index.html` für unbekannte Pfade)
- Rätseldaten getrennt von der Spiellogik unter `src/data/`
