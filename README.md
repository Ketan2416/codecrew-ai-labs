# Code Crew AI Labs

Marketing site for **Code Crew AI Labs** — AI agents, websites and custom
software. Static HTML, CSS and vanilla JavaScript. No build step, no framework,
no dependencies.

## The look

Warm cream paper, near-black ink, and a single vermillion accent. Big bold
Manrope headlines with Instrument Serif italics for emphasis, solid colour
blocks instead of gradients, generous rounded corners, and motion used only
where it earns attention.

| Token | Value | Use |
|---|---|---|
| `--cream` | `#f7f3ec` | Page background |
| `--cream-2` / `--cream-3` | `#efe8dc` / `#e5dccd` | Cards, fills |
| `--ink` | `#14120f` | Text, dark sections, buttons |
| `--muted` | `#6d655b` | Body copy |
| `--accent` | `#ff4b26` | Vermillion — kickers, CTA band, highlights |

Everything is driven by the custom properties in `:root` at the top of
`css/styles.css`. Changing `--accent` restyles the whole site.

## Sections

Ticker → hero with rotating headline and spinning seal → bento services grid →
accent marquee band → work cards → dark process steps → testimonial → FAQ
accordion → vermillion contact block → dark footer.

## Fill these in

Placeholder copy is wrapped in `<span class="ph">` and renders with a dotted
underline — subtle enough that the page still looks finished, obvious enough to
find. Remove the whole `<span>`, not just the text.

- [ ] **Work** — three cards in `index.html`. Swap each `.cover` block for a real
      screenshot (`<img src="assets/work-1.jpg" alt="">`) and write a one-line
      result **containing a number**. That single detail is worth more than the
      rest of the page combined.
- [ ] **Testimonial** — replace with a real, attributed quote. If you cannot name
      the person and company, delete the section rather than run it anonymous.
- [ ] **Pricing** — the first FAQ answer. Real ranges filter out bad enquiries.
- [ ] **City, Country** — contact block and footer.
- [ ] **Social links** — LinkedIn and GitHub in the footer, or delete them.
- [ ] **Email** — `hello@codecrewailabs.com` in `index.html` and as
      `CONTACT_EMAIL` at the top of `js/main.js`.

## Brief form

Validates in the browser, then hands off to the visitor's email client via
`mailto:`. To receive submissions properly, replace the body of the submit
handler in `js/main.js` with a `fetch()` to an endpoint — Formspree, Resend, or
your own API.

## Run locally

```bash
npx serve .
```

Or open `index.html` directly in a browser.

## Previous designs

Earlier directions are kept in git and can be restored at any time:

```bash
git checkout design/original    # Dark navy, gradient headline, terminal
git checkout design/swiss       # Paper white, 12-column grid, red accent
git checkout design/technical   # Bone paper, pine green, drawing sheet
git checkout main               # Back to the current design
```

## Structure

```
index.html          Single page, every section commented
css/styles.css      Tokens, components, responsive
js/main.js          Nav, word rotator, reveals, FAQ, form
assets/logo.svg     Logo mark
assets/favicon.svg  Simplified for 32px
```
