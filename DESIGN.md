# DESIGN.md

Design system and section plan for the Lembayung landing page. Layout, spacing, and type scale follow the reference comp `wellnest.jpeg`; brand, palette, and content are Lembayung's own. Every decision below traces to the reference, the Lembayung brand assets in `assets/`, or an antislop rule. Anything not listed here is not part of the design.

- Reference: `wellnest.jpeg` (752 x 3970, full-page comp). Used for composition only, never for brand, color, or copy.
- Brand source: `assets/logo.png` (mark, wordmark, tagline) and the original Lembayung brief (services, prices, hours, area, testimonials).
- Rules: antislop core + antislop-ui, design-taste-frontend.
- Stack: static site. Vite + Tailwind v4 + vanilla JS. No CMS, no database, no server. Booking opens WhatsApp.
- Language: English. Currency: IDR.

## 1. Design Read and dials

Reading this as: a local home-service landing page for adults in Greater Jakarta and Banten booking a massage to their own home, with a calm, twilight-toned, photo-led language, leaning toward a light editorial layout with Inter body and one serif accent phrase per heading.

| Dial | Value | Why |
|---|---|---|
| ENERGY | 2 (Balanced) | Large photography and one serif accent per heading carry the page; no loud effects |
| RHYTHM | 3 (Bold) | The comp changes composition every section: full-bleed hero, carousel sheet, asymmetric split, tinted band, centered comparison, offset strip, form split, photo footer |
| MOTION | 2 (Balanced) | One scroll reveal and real transitions only; nothing loops on its own |

design-taste dials: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 4`.

Focal point per screen: hero = headline; treatments = featured card; why us = list; area and hours = the two cards; prices = the price figure; reviews = first quote; booking = form; footer = mark and wordmark.

## 2. Brand and identity

- Name: **Lembayung**. Full name: Lembayung Home Massage, Spa & Reflexology.
- Lembayung is Indonesian for the purple-red sky at dusk. The logo shows that sky inside a circle, a meditating figure, and a leaf branch.
- Tagline from the logo, translated: Harmony · Calm · Relaxation · Recovery.
- Logo use:
  - The page uses the **mark only** (cropped from `logo.png`) with the wordmark set as live text. The wordmark in the PNG is dark purple and would disappear on the hero photo and the dark footer.
  - The mark is never recolored, stretched, or placed on a busy photo without a backing.
- Identity motif: **the circle**. The mark is a circle, so treatment photos are cropped to circles inside their cards, avatar discs are circles, and the slider dots are circles. This is the one repeated shape that makes the page Lembayung's and not a template (core Part 3).

## 3. Color

Sampled from the logo's mark: the deep wordmark plum, the violet ring, the lavender sky, and the peach horizon glow. Wellnest's bronze palette is not used.

| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#FBFAFC` | Base background |
| `--color-card` | `#FFFFFF` | Cards and form surface on tinted sections |
| `--color-mist` | `#F6F1F8` | Section tint: treatments, booking |
| `--color-dawn` | `#F8E6E2` | The one warm band: area and hours (the logo's horizon) |
| `--color-field` | `#F1ECF4` | Inputs, chips, toggle track |
| `--color-line` | `#E7E0EC` | Hairlines and card borders |
| `--color-plum` | `#322854` | Headings and primary text (wordmark color) |
| `--color-plum-muted` | `#5E5670` | Body text |
| `--color-placeholder` | `#6F6780` | Input placeholders |
| `--color-violet` | `#433767` | Filled buttons, focus ring, active toggle |
| `--color-violet-ink` | `#2E2448` | Button hover and press |
| `--color-lavender` | `#866FA2` | Graphics only: icon discs, stars, active dots |
| `--color-lavender-deep` | `#6E5890` | Serif accent phrase and small lavender text on light surfaces |
| `--color-peach` | `#F1C7C3` | Accent on dark surfaces only: hero accent phrase, footer headings |
| `--color-night` | `#1E1733` | Footer overlay, hero scrim |
| `--color-error` | `#B42318` | Form errors only |

Core palette: plum/violet + lavender on a paper neutral; one accent: peach, used only on dark surfaces (R-29).

Purple is used because Lembayung means dusk and the logo is purple. It is the brand, not a model default (R-01). Constraints that keep it away from the AI-purple tell:

- No color gradients anywhere. The only gradients are dark photo scrims behind white text.
- No glow, no neon, no blue.
- Purple is muted (saturation under 40%) and sits on near-white paper.

### Contrast (WCAG 2.2 AA, computed)

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| plum | paper / mist / dawn / white | 12.88 / 12.03 / 11.11 / 13.40 | Headings, text |
| plum-muted | paper / mist / dawn / white / field | 6.64 / 6.20 / 5.72 / 6.91 / 5.93 | Body |
| lavender-deep | paper / mist / dawn / white | 5.83 / 5.45 / 5.03 / 6.07 | Accent phrase, small labels |
| white | violet / violet-ink | 10.60 / 14.36 | Button labels |
| white | lavender | 4.37 | Icons in discs (graphics need 3:1) |
| lavender | paper / white / mist | 4.20 / 4.37 / 3.92 | Stars, dots (graphics only, never text) |
| violet | paper / mist / dawn | 10.19 / 9.52 / 8.79 | Focus ring, outline buttons |
| placeholder | field / white | 4.59 / 5.35 | Placeholders |
| peach | night / plum | 11.18 / 8.74 | Accent on dark |
| white / `#CFC6DA` | night | 17.13 / 10.40 | Footer text |
| white / peach | night 70% scrim over pure white (worst case) | 6.33 / 4.13 | Hero text (peach only at display size) |
| white / `#CFC6DA` / peach | night 88% overlay over pure white (worst case) | 12.01 / 7.29 / 7.83 | Footer over photo |
| error | white / paper / mist | 6.57 / 6.32 / 5.90 | Error text |

Rejected: lavender `#866FA2` as text (4.20 on paper fails 4.5:1). It stays a graphics color.

Theme: light only. The product is a calm, daytime-readable service page for a broad consumer audience, and the brand's own logo sits on white. A dark theme has no brand reason (R-21).

## 4. Typography

| Family | Use | Reason |
|---|---|---|
| Inter (variable, 400/500/600) | Everything except accent phrases | The comp is set in Inter. It is the layout reference the user chose, so this is a reference reason, not a default reach (R-06). |
| Playfair Display 400 roman | One accent phrase per H1/H2, the footer wordmark | The comp swaps one phrase per heading into a high-contrast serif, and the Lembayung wordmark in the logo is a classical high-contrast serif. Playfair is in design-taste's justified pool. |

Both are self-hosted through Fontsource; no third-party font requests.

Serif discipline: at most one accent phrase per heading, only in H1 and H2, never in body, buttons, labels, or cards.

| Style | Desktop | Mobile | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display (H1) | 64px | 40px | 600 | 1.05 | -0.02em |
| H2 | 44px | 32px | 600 | 1.1 | -0.015em |
| H3 (card, plan) | 22px | 20px | 600 | 1.25 | -0.01em |
| Body large | 18px | 17px | 400 | 1.6 | 0 |
| Body | 16px | 16px | 400 | 1.6 | 0 |
| Meta / label | 14px | 14px | 500 | 1.4 | 0 |
| Button | 15px | 15px | 600 | 1 | 0 |
| Price | 40px | 32px | 600 | 1 | -0.02em |

- The Playfair accent phrase is set 4% larger than the surrounding Inter so x-heights match optically.
- Body copy max width 60ch.
- Headings use Title Case, as in the comp. No uppercase tracked eyebrows.
- Prices use tabular numerals.

## 5. Shape, elevation, spacing

| Element | Radius | Reason |
|---|---|---|
| Buttons, nav pill, chips, toggle, slider card controls | full pill | Every interactive control in the comp is a pill |
| Cards (treatment, area/hours, price, review) | 20px | The comp's card radius |
| Large media (photos, sheets, footer panel) | 24px | Hard cap (antislop: no container radius above 24px) |
| Inputs, selects, textarea | 12px | Keeps fields legibly "input", not "button" |
| Media inside a card (featured treatment photo, area and hours frames, hero slide preview) | 12px | Nested radius: the 20px card minus its inner padding, so the curves stay parallel |
| Treatment and avatar photos | full circle | Identity motif from the mark |

- Elevation: one shadow only, on the sticky header once it turns solid (`0 6px 24px rgb(30 23 51 / 0.08)`). Everything else is flat with a 1px `--color-line` border where a card edge is needed (R-12).
- Glass: two surfaces only, both over the hero photo: the nav pill and the slide card. The slide card uses a denser night tint (66% instead of 45%) because it carries small text over the brightest part of the photo. `prefers-reduced-transparency` swaps both to solid night at 85% (R-10).
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding varies by role: hero bottom 128, treatments 96, why us 128, band 96, prices 128, reviews 96, booking 96 + photo. Uneven on purpose (RHYTHM 3).
- Container: `max-width: 1280px`, gutter 24px mobile, 40px desktop.
- Breakpoints: Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).

## 6. Imagery and assets

All images come from `assets/` and are converted by `scripts/optimize-images.mjs` to WebP (plus a JPEG fallback for hero slides) in `public/img/`. The sources are never modified.

| Asset | Output name | Use |
|---|---|---|
| `logo.png` | `logo-mark-*.webp`, `favicon-*.png`, `apple-touch-icon.png` | Mark only (crop x222-880, y384-958) |
| `image-hero.jpg` | `hero-back` | Hero slide 1 (massage) |
| `image-cta-1.jpg` | `spa-back` | Hero slide 2 (spa), why-us wide photo |
| `image-cta-3.jpg` | `reflexology` | Hero slide 3 (reflexology), Reflexology card |
| `image-service-1.jpg` | `full-body` | Full Body Massage card |
| `image-service-2.jpg` | `knuckle-back` | Booking wide photo |
| `image-service-3.png` (770w) | `face-acupressure` | Full Body + Face Acupressure card, circle crop only |
| `image-service-4.jpg` | `shoulder` | Full Body + Reflexology card |
| `image-service-5.png` (432w) | `kerokan` | Full Body + Kerokan card, circle crop only |
| `image-service-6.jpg` | `cupping` | Full Body + Cupping card |
| `cta.png` | `whatsapp-chat` | Why-us media tile: shows the WhatsApp booking with the Lembayung logo |
| WhatsApp photos | `towels`, `candle-back`, `foot-bath`, `facial`, `oil`, `hand-foot`, `deep-back` | Area and hours card frames, review strip tiles, footer background |

The hero slides are massage, spa, reflexology: the three words of the H1, in order.

Not used, with reason:

- `image-cta-2.jpg`: the same photo as `image-hero.jpg`.
- `image-about.png`: a wall signboard mockup. It implies a storefront; Lembayung is a home service.
- `image-testimonial.png`: warehouse workers, unrelated to the service.
- The hot-stone and salon hair-wash WhatsApp photos: Lembayung does not offer those services, so showing them would be a false claim (R-38).
- The bottom 8% of two WhatsApp photos is trimmed to remove a third-party watermark.

Photos `face-acupressure`, `kerokan`, and `hand-foot` are low resolution, so they are only shown small (circle crop or a narrow tile), never full-width.

## 7. Icons

Phosphor, regular weight, one family. SVGs are inlined at build time from `@phosphor-icons/core`; none are hand-drawn. Icons are decorative (`aria-hidden`) unless they are the only label of a control, in which case the control carries an `aria-label`.

| Meaning | Icon |
|---|---|
| Trained therapists | `certificate` |
| At home | `house-line` |
| WhatsApp booking | `whatsapp-logo` |
| No travel fee | `moped-front` |
| Service policy | `shield-check` |
| Area | `map-pin` |
| Hours | `clock` |
| Included in a price group | `check` |
| Rating | `star-fill` |
| Form error | `warning-circle` |
| Navigation and controls | `caret-left`, `caret-right`, `caret-down`, `list`, `x`, `plus`, `minus`, `arrow-right` |

Treatment cards carry photos, not icons: each treatment has a real photo, so an icon would repeat what the photo already shows.

## 8. Sections

Order follows the comp. Each section that the comp has but Lembayung has no content for is adapted, never filled with invented content.

1. **Hero** (full-bleed photo slider, `min-height: 100dvh`)
   - Header over the photo: mark + live "Lembayung" wordmark; glass nav pill (Treatments, Why Us, Prices, Reviews, Contact, in page order); below 1024px the pill folds into a menu button that opens a full-screen drawer (focus trapped, Esc closes); "Book Your Session" button.
   - H1 left-aligned: "Massage, Spa & Reflexology" + accent "At Your Door." in peach Playfair.
   - Subtitle: trained, courteous therapists come to your home across Jakarta, Bogor, Depok, Tangerang, Bekasi, Serang, and Cilegon. Book on WhatsApp, no travel fee, from Rp 100.000.
   - Buttons: "Book Your Session" (filled, the only button with an arrow because it is the page's primary path) and "See Prices" (outline).
   - Proof row: R / S / M initial discs linking to #reviews ("Read client reviews"), then two real facts: "Every day, 08:00 to 23:00 WIB" and "No travel fee in selected areas". Replaces the comp's "15k+ clients, 4.9" because no such numbers exist (R-17).
   - Right edge: vertical dots (one per slide). Bottom right: glass card previewing the next slide with prev/next buttons. Slides change only on user input.
2. **Treatments** (mist sheet with 24px top corners that rises over the hero; replaces the comp's press-logo strip, since Lembayung has no press coverage)
   - Split header: H2 "Treatments Made" + accent "For Your Home" on the left; one-paragraph intro on the right.
   - Horizontal scroll-snap carousel of six cards with prev/next buttons (disabled at either end). Each button steps to the next card edge, since the featured card is wider than the rest.
   - The first card (Full Body Massage) is the featured card: wider, with a large photo. Reason: it is the base treatment every combo builds on, and it is the treatment ordered in the brand's own chat graphic (`cta.png`).
   - The other cards: circular photo with a lavender ring, name, one-line description, "From Rp …" with the duration, "Book Now" (preselects the treatment in the form and scrolls to it).
3. **Why Us** (paper, 5/7 split)
   - Left: H2 "Professional Massage" + accent "Right at Your Place", two short paragraphs.
   - Right: five-row accordion list (rows, not cards, each with an icon disc): Trained, Courteous Therapists; Comfort at Home; Quick WhatsApp Booking; No Travel Fee; Clear Service Policy. First row open by default, one row open at a time.
   - Below, full container width: a media row of the WhatsApp chat graphic (4/5 portrait, 4 of 12 columns) beside a wide photo (`spa-back`, 8 of 12), both at the 24px media radius.
4. **Area and Hours** (dawn band; replaces the comp's therapist cards, since there are no therapist profiles)
   - H2 "Where and When" + accent "We Come to You".
   - Two wide cards in the comp's therapist-card shape (text left, framed photo right):
     - Service Area: seven city chips plus a short note.
     - Opening Hours: "Every day, 08:00 to 23:00 WIB" plus "Chat on WhatsApp".
5. **Prices** (paper, the one centered section; replaces the comp's membership plans)
   - H2 "Simple Prices," + accent "Per Session".
   - Segmented toggle: 60 / 90 / 120 min (radio group, default 60).
   - Three cards, because the real price list has exactly three price structures:
     - Single Treatment: Full Body Massage, Reflexology. 100.000 / 150.000 / 190.000.
     - Massage Combos: Full Body + Face Acupressure, + Reflexology, + Kerokan. 160.000 / not offered / 200.000.
     - Massage + Cupping: 245.000 / 280.000 / 310.000.
   - At 90 min the Combos card shows "Not offered at 90 min" with "Combos come in 60 or 120 min sessions." Its button reads "See 60 min price" and switches the toggle to 60 instead of booking. A polite live region announces each toggle change.
   - No highlighted tier: nothing in the data justifies one.
   - Each card's button preselects that group's first treatment and the selected duration in the form.
   - Note under the cards: prices per person per session, no travel fee within the service area.
6. **Reviews** (paper)
   - H2 "What Our" + accent "Clients Say".
   - Horizontal strip mixing the three real quotes (Rina, Jakarta; Sari, Depok; Maya, Jakarta) with photo tiles. Quote cards: five stars, quote, initials disc, name and city. Photo tiles carry no names and no captions that imply a client.
   - Prev/next buttons, manual scroll-snap. No auto-scroll, no marquee.
7. **Booking** (mist, 5/7 split)
   - Left: H2 "Book Your" + accent "Home Session", one paragraph, contact rows (WhatsApp number as a link, hours, area), link "See prices first".
   - Right: form card. Fields: Name*, City*, Treatment*, Duration* (options depend on the treatment), Preferred date* (today or later), Preferred time* (within 08:00 to 23:00 WIB; the admin confirms the exact slot on WhatsApp), Address and notes (optional).
   - Submit "Send via WhatsApp": validates inline, builds the message, opens `https://wa.me/6287771210204?text=…` in a new tab, then shows an inline confirmation with a fallback link in case the pop-up was blocked.
   - Field grid (6 columns from 640px): Name and City share a row; Treatment takes 4 columns beside Duration's 2 (Duration stays disabled until a treatment is chosen); Date and Time share a row; Address and notes run full width. Under the grid, a "Session price" line updates live with the chosen treatment and length.
   - Below: wide photo (`knuckle-back`) at the 24px media radius.
8. **Footer** (photo `deep-back` under a night 88% overlay, 24px top corners)
   - Large mark + live wordmark in Playfair + tagline.
   - Link groups: Treatments (six anchors), Quick Links (section anchors), Contact (WhatsApp, hours, area).
   - Bottom line: © 2026 Lembayung Home Massage, Spa & Reflexology. Service policy sentence.
   - No social icons and no legal pages: Lembayung has no public social accounts on record, and the site collects and stores nothing (R-24).

## 9. Components and states

- **Button**: filled (violet, white text), outline (violet border on light, white border on dark), ghost text link. Heights: 48px default, 44px minimum. Hover darkens, `:active` scales to 0.98, focus shows a 2px violet ring with 2px offset (white ring on dark surfaces). Disabled: 50% opacity, `cursor: not-allowed`, no hover.
- **Carousel controls**: 44px circles. Disabled at the ends (`aria-disabled`).
- **Accordion row**: full-width `button` with `aria-expanded`, `aria-controls`. Plus becomes minus. Height animates with `grid-template-rows`.
- **Toggle**: `role="radiogroup"` with arrow-key support.
- **Form**: label above every field; placeholder never replaces a label. Errors appear under the field in `--color-error` with an icon and `aria-describedby`; the first invalid field receives focus on submit. Success replaces nothing: a status note appears above the button in a live region.
- **Without JavaScript**: an inline head script adds a `js` class to `<html>`. Reveal fades and collapsed accordion panels are scoped to `.js`, so with scripts off every section and every accordion answer stays visible, and a `noscript` note gives the WhatsApp number for booking.
- **Empty or unavailable**: the 90-min combo state is the only unavailable state and says so in words.
- **Images**: fixed aspect ratios so nothing shifts while loading; mist background behind every image.

## 10. Motion

| Motion | Duration | Reason |
|---|---|---|
| Hero crossfade on slide change | 700ms | Comp is a slider; crossfade avoids a sliding photo under text |
| Section reveal (fade + 16px rise), once per element | 600ms | Gives the long page a reading rhythm |
| Carousel scroll | native smooth scroll | Uses the browser's own physics |
| Accordion open | 300ms | Shows where the content came from |
| Header glass to solid | 200ms | Keeps the nav legible over content |
| Button press | 120ms | Tactile feedback |

Easing `cubic-bezier(0.22, 1, 0.36, 1)`. Nothing loops. `prefers-reduced-motion: reduce` removes the reveal, crossfade duration, and smooth scrolling.

## 11. Accessibility and responsive

- Skip link, one H1, landmarks (`header`, `nav`, `main`, `footer`), every section labeled by its H2.
- All targets at least 44 x 44px. Keyboard reaches everything; mobile menu traps focus and closes on Escape.
- Images carry descriptive `alt`; decorative ones have `alt=""`.
- Mobile (below 1024px): nav becomes a menu button with a full-height drawer; splits stack; the featured treatment card stacks; price cards stack; hero proof row wraps; slider card hides below 640px and the dots move to the bottom.
- No horizontal page overflow at 360px.

## 12. Copy rules

- English, plain, specific. No em dashes. No buzzwords ("elevate", "unlock", "seamless", "journey"). No numbers that are not in the brief.
- Prices as `Rp 100.000` (Indonesian formatting via `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`).
- Times in 24-hour format with "WIB".
- CTA labels name the action: "Book Your Session", "Book Now", "Send via WhatsApp", "Chat on WhatsApp".

## 13. Content source

There is no CMS. All business data lives in `src/data.js` (treatments, prices, durations, price groups, cities, hours, WhatsApp number, reviews). The price toggle, the treatment cards' "From" prices, the form's treatment and duration options, and the WhatsApp message all read from that file, so a price change is one edit.

## 14. Decision log (purpose test, R-31)

| Decision | Purpose |
|---|---|
| Glass on nav pill and slide card | Keeps controls legible over a changing photo without a heavy bar; the comp does the same |
| Featured treatment card | Hierarchy: the base treatment and the one in the brand's chat graphic |
| Circle crops | Identity motif from the logo mark |
| Arrow only on the hero "Book Your Session" | It is the one primary path through the page |
| Peach accent only on dark | It is the logo's horizon glow; on light it would fail contrast |
| Three price cards | Mirrors the three real price structures, not a pricing template |
| No "Most Popular" | No sales data supports one |
| No stats, no press, no therapist profiles | None exist; inventing them would break C-5 |
| Footer without social or legal links | No accounts on record; no data stored |
