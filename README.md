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

- [ ] **Work** — all three cards are filled in. Card 3 (Megha Pharmacy) still
      shows the numbered `.cover` placeholder; swap it for a real screenshot
      (`<img src="assets/work-megha-pharmacy.webp" alt="">`) like the other two.
      Where you can, add a result **containing a number** — that single detail
      is worth more than the rest of the page combined.
- [ ] **Testimonial** — replace with a real, attributed quote. If you cannot name
      the person and company, delete the section rather than run it anonymous.
- [ ] **Pricing** — the first FAQ answer. Real ranges filter out bad enquiries.
- [x] **City, Country** — now "Rajdhani Satara, Maharashtra, India" in the
      contact block and footer.
- [ ] **Social links** — LinkedIn and GitHub in the footer, or delete them.
- [ ] **Email** — `hello@codecrewailabs.com` in `index.html` and as
      `CONTACT_EMAIL` at the top of `js/main.js`.
- [ ] **WhatsApp number** — `WHATSAPP_NUMBER` and `WHATSAPP_DISPLAY` in
      `js/main.js`, plus the `wa.me/` links in `index.html`.

## Brief form — read this before going live

The form **does not post to a server.** It validates in the browser, then opens
WhatsApp with the entire brief pre-typed, so the visitor only has to press send.
The number lives in `WHATSAPP_NUMBER` at the top of `js/main.js`, in
international format with no plus sign, spaces or dashes (`919665529494`), and
in `WHATSAPP_DISPLAY` for the version shown on screen. Change both together, and
the two `wa.me/` links in `index.html` with them.

**The trade-off:** you only receive the brief if the visitor actually presses
send in WhatsApp. Someone who closes the tab is a lost lead and you will never
know. To limit that, the form is never cleared, and the panel below the button
stays visible with a direct chat link plus **Copy number** and **Copy message**
buttons.

The upside is that it cannot be broken by a dead endpoint or a network filter,
which mattered here: `formsubmit.co` does not even resolve on the network this
was built on, and email services were unreachable. If you later want enquiries
to arrive without the visitor pressing anything, these need no backend of your
own:

| Service | Free tier | Notes |
|---|---|---|
| Web3Forms | 250 / month | No account, just an access key |
| Formspree | 50 / month | Dashboard, spam filtering, host-agnostic |
| Netlify Forms | 100 / month | Zero config, only if hosted on Netlify |
| Google Apps Script | Unlimited | Writes each enquiry to a spreadsheet |

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
