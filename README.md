# Visit Sarafovo — version 1

A small, responsive English-language travel guide for Sarafovo, Burgas, Bulgaria.
Built with plain HTML, CSS and JavaScript — **no paid services, build tools or accounts needed**.

## Open it on your Mac

**Fastest:** Double-click `index.html` to open it in your browser.

**Recommended (local web server):** Open Terminal, navigate to the folder and run:

```bash
cd ~/Downloads/visit-sarafovo
python3 -m http.server 8000
```

Then open `http://localhost:8000` in Safari or Chrome. Stop the server with `Control + C` in Terminal.

If you extracted it elsewhere, adjust the folder path after `cd`.

## Which file does what?

- `index.html` — layout and page content (titles, text, sections, buttons).
- `styles.css` — colors, type, responsive layout and visual design.
- `data.js` — place data shown in the cards. **Start here when adding places.**
- `script.js` — filtering, search, favorites, details popup and mobile navigation.
- `assets/coast.svg` — original vector hero illustration. You can replace it with your own photo later, then update the image `src` in `index.html`.

## Add a place

Open `data.js`, find `window.SARAFOVO_PLACES = [ ... ]` and add a new item following the existing format. Make sure `id` is unique and `category` is one of `beach`, `outdoors`, `culture`, `transport`, `daytrip`.

A simple example:

```js
{ id: 'my-new-place', name: 'My New Place', category: 'outdoors', area: 'Sarafovo', tagline: 'Short card description', description: 'Longer details for visitors.', emoji: '☀', tone: 'sea', mapQuery: 'Place name Sarafovo Bulgaria', tip: 'Practical advice.' },
```

Save and refresh the browser. No compilation required.

## Change colors or titles

- Main colors and fonts: top of `styles.css`, the `:root` section.
- Intro heading: `<h1>` in `index.html`.
- Transport info: the section with `id="arrival"` in `index.html`.
- Cards are generated from `data.js` by `script.js`.

## What already works?

- Responsive desktop and phone layout
- Place cards, category filters, live search
- Save/remove favorites (saved using browser localStorage)
- Saved-only view
- Accessible details popup with clickable Google Maps search links
- Mobile navigation menu
- Official Burgasbus timetable link

## Limits / next improvements

- The hero is an **original illustrative graphic**, not a real aerial photograph of Sarafovo.
- Places were chosen from public tourism and transit sources, but **opening hours, prices and schedules are not embedded** because they may change.
- The map buttons open a Google Maps search; no coordinates or shortest walking times are promised.
- Saved favorites are stored **only in this browser on this device**; there is no account or synchronization.
- Food and drink recommendations should be added after confirming particular businesses, their names and locations.
- An interactive in-page map, Bulgarian language, authentic photos and better local content are good candidates for version 2.

## Publishing online

A free option is **GitHub Pages**: create a public repository, upload the contents of this folder, and enable Pages in repository Settings → Pages. A static site like this needs no backend. Don't upload personal or secret information to the public repository.

## Reference sources reviewed in November 2026

- Burgasbus official bus 15 route: https://burgasbus.info/eng/?page_id=5705
- MyBurgas Sarafovo Beach: https://myburgas.com/en/pages/beaches/sarafovo
- Green Corridors, Sarafovo coastal route: https://greencorridors.burgas.bg/en/corridors/view/1
- Green Corridors ancient port/fortress: https://greencorridors.burgas.bg/en/objects/view/38
- Burgas Aviation Museum background: https://burgasbeachresort.com/en/zabelezitelnosti-razvlechenia/

This is an **independent educational project**, not the official website of the neighborhood, municipality, or airport.