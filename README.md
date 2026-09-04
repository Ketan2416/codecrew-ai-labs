# Code Crew AI Labs

Studio site. Static HTML, CSS and vanilla JS — no build step, no dependencies,
no webfont requests.

## Design system

Swiss / International Typographic Style: a strict 12 column grid, hairline
rules, one accent colour, and type doing the work instead of effects. There are
deliberately no gradients, shadows, blurs or rounded corners anywhere in
`css/styles.css` — adding any of them back will undo the look.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fbfbf9` | Page background |
| `--ink` | `#0b0b0b` | Text, strong rules, buttons |
| `--ink-2` | `#45453f` | Body copy |
| `--ink-3` | `#8c8c85` | Labels, metadata |
| `--rule` | `#d7d7d1` | Hairline dividers |
| `--red` | `#e63312` | The only accent — index numbers, hover, focus |

Typefaces are the system Helvetica stack (`Helvetica Neue`, Helvetica, Arial)
for everything, with a system monospace stack for labels and index numbers.

Press <kbd>G</kbd> on the page to overlay the grid.

## Fill these in

Every unfinished piece of copy is wrapped in `<span class="ph">` and renders
with a red underline so it is impossible to miss in the browser. Remove the
whole `<span>`, not just the text, as you replace each one.

- [ ] **Selected Work** — three project rows in `index.html`. Real names, real
      one-line outcomes with numbers in them, real stacks.
- [ ] **City, Country** — hero spec list and colophon.
- [ ] **Studio paragraph** — who you are and why you started this.
- [ ] **Rates, team size, time zone** — studio spec list.
- [ ] **Email** — `hello@codecrewailabs.com` appears in `index.html` and as
      `CONTACT_EMAIL` at the top of `js/main.js`.

## Contact form

Validates client-side and hands off to the visitor's mail client via `mailto:`.
To take real submissions, replace the body of the submit handler in
`js/main.js` with a `fetch()` to an endpoint.

## Run locally

```bash
npx serve .
```

## Structure

```
index.html          Single page, sections commented
css/styles.css      Design tokens, grid, components, responsive
js/main.js          Mobile nav, grid overlay, form handling
assets/logo.svg     Mark
assets/favicon.svg  Mark, simplified for 32px
```
