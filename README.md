# Code Crew AI Labs

Studio site. Static HTML, CSS and vanilla JS — no build step, no dependencies,
no webfont requests.

## The idea

The site is laid out as an engineering drawing, because that is what the studio
sells. The devices are not decoration; each one carries information:

- **Sheet header** — the dark strip at the top, with revision, sheet number and
  live availability.
- **Measurement ruler** — pinned to the left edge, ticked every 12px with a
  heavier mark every 60px.
- **Reference letters** — the disciplines in the headline are annotated `A` to
  `D`, and those letters are the row keys in the Capabilities schedule and the
  options in the brief form. A visitor can point at a letter and ask for a price.
- **Registration marks** — the corner ticks where each section begins.
- **General notes** — how-we-work written as the numbered notes block a drawing
  carries, rather than a four-step process graphic.
- **Title block** — the footer is the labelled cell grid found in the corner of
  a real drawing sheet.

## House rules

These exist because breaking them is what makes a site look machine-generated.
There are none of the following anywhere in `css/styles.css`:

no gradients · no box shadows · no blur · no border radius · no transform on
hover · no webfonts · no emoji

Hover states change colour only. Type is the system Helvetica stack with a
system monospace for annotation, so there are zero network requests for fonts.

## Palette

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f1efe9` | Warm bone background |
| `--paper-2` | `#e9e6de` | Row hover |
| `--ink` | `#16181c` | Text, sheet header, strong rules |
| `--ink-2` | `#4e525a` | Body copy |
| `--ink-3` | `#8b8e96` | Annotation |
| `--line` / `--line-2` | `#cdc9bf` / `#a8a49a` | Construction hairlines |
| `--pine` | `#124a3c` | The studio colour |
| `--signal` | `#cf5322` | Live things only: status, focus, errors |

Deep pine was chosen because effectively no AI-built site uses it — the
defaults are cyan, blue and violet.

## Fill these in

Unfinished copy is wrapped in `<span class="ph">` and renders with an orange
underline, so it is impossible to miss in the browser. Remove the whole
`<span>`, not just the text.

- [ ] **Selected work** — three entries in `index.html`. Real names, real
      stacks, and a **number** in every summary. "Handles 400 tickets a week"
      cannot be invented, and it does more for credibility than the design.
- [ ] **City, Country** — hero schedule and the title block.
- [ ] **Studio paragraph** — who you are and why you started this, in your own
      words.
- [ ] **Team size, rates, time zone, lead time** — studio schedule.
- [ ] **Email** — `hello@codecrewailabs.com` appears in `index.html` and as
      `CONTACT_EMAIL` at the top of `js/main.js`.

## Brief form

Validates client-side, then hands off to the visitor's mail client via
`mailto:`. To take real submissions, replace the body of the submit handler in
`js/main.js` with a `fetch()` to an endpoint — Formspree, Resend, or your own
API.

## Run locally

```bash
npx serve .
```

Or open `index.html` directly.

## Structure

```
index.html          Single page, sections commented
css/styles.css      Tokens, layout, components, responsive
js/main.js          Mobile nav, form handling
assets/logo.svg     Mark
assets/favicon.svg  Mark, simplified for 32px
```
