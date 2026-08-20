# Brows Beauty

Website concept for **Brows Beauty**, a brow and lash studio at 145 S Main St, Freeport, NY 11520.

Bilingual (Spanish first, English toggle), static, and built to be served by GitHub Pages
straight from `main` / `root` with no workflow, no server, and no build step at deploy time.

**Live URL once Pages is enabled:** `https://<owner>.github.io/<repo>/`

---

## Run, build, deploy

All commands run from the `app/` folder.

```bash
cd app
npm install        # once
npm run dev        # local dev server at http://localhost:5173
npm run build      # builds and copies the site to the repository root
npm run preview    # serves the production build from app/dist
```

`npm run build` does two things: it produces `app/dist`, then `app/scripts/publish.mjs` copies
that output into the repository root (`index.html`, `404.html`, `assets/`, `images/`,
`.nojekyll`), removing the previously generated files first.

### Deploy

```bash
cd app && npm install && npm run build
cd ..
git add -A
git commit -m "Build site"
git push origin main
```

Then in GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)` → Save.**

Nothing else is required. Every asset path in the build is relative (`./assets/...`), so the
site works on a project page, a user page, or a custom domain without reconfiguration.

---

## What is in the repository

```
index.html, 404.html, assets/, images/, .nojekyll   generated site, committed so Pages can serve it
app/                                                 the React + Vite source project
  src/components/                                    one component + one CSS module per section
  src/data/                                          services, team, business facts, translations
  src/context/                                       language and booking-demo state
  src/hooks/                                         scroll, reveal, focus-trap helpers
  src/fonts/                                         self-hosted Fraunces and Jost (SIL OFL)
  scripts/publish.mjs                                copies the build to the repository root
beauty-brows-reference-pack/                         source material the site was built from
```

Dependencies: `react`, `react-dom`, `lucide-react`. Nothing else at runtime. No animation
library, no backend, no tracking, no external stylesheet.

---

## Language system

Spanish is the default. The `ES | EN` switch sits at the top right of the navigation and in
the footer, changes the page instantly with a short crossfade, and stores the choice in
`localStorage` under `brows-beauty-lang`.

Every visible string lives in `app/src/data/i18n.js` (interface copy) or beside its record in
`services.js` / `team.js` (service names, descriptions, treatment guidance, bios). There is a
single set of components for both languages. Switching also updates `<html lang>`, the page
title, and the meta description.

To edit copy, edit those data files. To add a language, add a key to `strings` and to
`LANGUAGES` in `i18n.js`.

---

## Content accuracy

Everything on the page comes from `beauty-brows-reference-pack/`. Nothing was invented: there
are no reviews, no statistics, no certifications, no claimed results, and no stock photography.

- **Prices and durations** are transcribed from `SERVICES.csv` and match it row for row.
- **Bios** are the artists' own words, tidied for punctuation only.
- **Photos** are the three the studio owns. No image is captioned or presented as a treatment
  result, and none is labelled before and after. The gallery says so in plain text and holds a
  clearly marked space for real work photos when the owner supplies them.
- **Hours are not published.** The reference pack contains two conflicting schedules (the
  homepage graphic and the Square location panel), so the site shows the appointment-only
  message instead. `business.hoursConfirmed` is `false` in `app/src/data/business.js`; set the
  real hours there once the owner confirms them.
- **"Lifting"** is spelled correctly everywhere. The current Square listing misspells it in one
  service name; the correction is noted on that record in `services.js`.

### Open questions for the owner

1. **`Hidratacion de pestañas con ...`** ($15, 15 minutes) is cut off on the current site. It is
   kept in `services.js` at its real price and duration with `needsOwnerConfirmation: true`, and
   is hidden from the menu and the booking demo until the full name is confirmed.
2. **Business hours.** See above.
3. **Isabel's availability.** The homepage graphic says Sundays only. That is stored as editable
   data (`team.js` → `availability.days: [0]`) and drives the sample dates in the booking demo.
   Change or clear it there when it changes.
4. **Work photos.** The gallery layout is ready for brow and lash transformation photos.

---

## The booking demo

A front-end mockup only. It never sends, stores, or transmits anything: no network calls, no
`localStorage` writes, no analytics. The submit handler only advances the step.

Service → artist → sample date → sample time → contact details → summary. It uses the real
service menu, shows the demo disclaimer on the opening screen and again on the summary, and has
a reset button. Form controls are real radios, labels, and inputs, so keyboard and screen
reader users can complete the flow; focus moves to each new step heading, Tab is trapped inside
the dialog, Escape closes it, and focus returns to whatever opened it.

---

## Accessibility and motion

- Semantic landmarks and headings, a skip link, visible focus on every interactive element.
- Text contrast meets WCAG AA against its actual background throughout.
- No content is hidden behind JavaScript. Reveal animations are opt-in: `main.jsx` sets
  `data-anim="on"` on `<html>` before the first paint, and only when the visitor has not asked
  for reduced motion. With `prefers-reduced-motion: reduce`, that attribute is never set, so
  the page renders fully visible and static, and transitions are additionally neutralised in CSS.
- Verified with no horizontal overflow from 320px to 2200px.

---

Website concept by Bellmore Web Design.
