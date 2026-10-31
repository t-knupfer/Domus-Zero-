# Domus Zero page template kit

Use **one modular page layout**, a shared site shell, and one article layout. A home, about, services, process or contact page is a different arrangement of sections, not a separate implementation of the header, fonts or cards.

## Files and preview

- `src/_includes/redesign/base.njk`: document metadata, bilingual navigation, wordmark and footer.
- `src/_includes/redesign/page.njk`: page heading followed by an ordered `sections` list.
- `src/_includes/redesign/article.njk`: Markdown article layout.
- `src/_includes/redesign/sections/`: reusable section templates.
- `src/assets/js/redesign-calculator.js`: isolated calculator model and browser behavior; no dependencies or external requests.
- `src/assets/js/redesign-navigation.js`: responsive hamburger navigation with accessible state, keyboard support, and progressive fallback.
- `src/assets/sass/redesign.scss`: isolated styles and responsive rules.
- `src/design-system/`: working English gallery, Italian example, and article demonstration.
- `docs/templates/`: copyable page and article starters, outside Eleventy's build input.

After a build, the gallery is at `/design-system/`, the Italian example at `/design-system/it/`, and the article at `/design-system/article/`. Examples have noindex metadata and are excluded from Eleventy's collections/sitemap. They are not access-controlled; keep staging separate from production. Remove the demo pages before a public release if they are not wanted.

The ten baseline pages have now been migrated locally, retaining their existing public URLs. Production stays on `casa-mia-zero`; the work remains on local branch `redesign/template-kit`. Nothing has been pushed or deployed. See [Migration report](MIGRATION.md) for content preservation, validation and scope.

## Create a page

1. Copy `docs/templates/page.njk` to an appropriate location under `src/content/`.
2. Set its title, description, language, permalink and paired alternateUrl.
3. Add, reorder or remove entries in `sections`.
4. Set `preview: false` only when ready to publish. Preview metadata is not authentication.
5. Use existing Italian and English URLs when migrating the ten baseline pages.

Content can live in YAML front matter (as in the starter) or a sibling `<filename>.11tydata.json` file (as in the gallery). Prefer separate language pages with shared components. Page text is not machine-translated. Supply translated section content; navigation, form labels, empty states and shared CTA labels support `en` and `it`.

All section content fields are plain text and escaped, except trusted Markdown rendered into article content. Use paragraphs/items rather than placing HTML inside strings. Use descriptive image alt text; use an empty alt only when an image is decorative. Use unique, simple section IDs, especially for repeated FAQ/contact sections.

## Section reference

For the audit of all ten supplied mock-ups, see [Mock-up coverage audit](MOCKUP-COVERAGE.md). The five distinct gaps selected after that audit are now implemented below; optional variations remain outside this task.

Every section accepts `type`, optional `id`, `eyebrow`, `title`, `intro`, and `tone` (`light`, `muted` or `dark`). A misspelled type fails the build rather than silently dropping content.

| Type | Content | Options |
| --- | --- | --- |
| `split` | `paragraphs: [text]`, `images: [{src, alt, caption?}]` | One or two images; `imageSide: left/right`; optional `items: [text]`, `link: {href, label}` and `quote: {text, name, role}` for the existing founder statement |
| `steps` | `items: [{title, text}]` | Numbered, two-column list on desktop; one column on mobile; reading order down left then down right |
| `contact` | Contact info from existing `client.json`; built-in labeled fields | `detailsOnly: true` omits the form entirely and accepts an optional `image: {src, alt}`. Otherwise optional `action`, `note`, `privacyUrl`, `mapUrl`; form disabled until action is supplied |
| `cards` | `items: [{title, image, imageAlt, text?, link?}]` | `columns: 3/4`; images with captions/text below |
| `callouts` | `items: [{title, text, value?, link?}]` | `columns: 3/4`; optional prominent value, no image required |
| `blog` | `useExistingPosts: true` or `posts: [{url, data: {title, description, image?, imageAlt?, author?}}]` | `columns: 3/4`; empty state with no posts |
| `faq` | `items: [{question, answer}]` | Native details/summary accordion; no JavaScript dependency; empty state supported |
| `reviews` | `items: [{quote, name, context?}]` | `columns: 3/4`; no invented ratings or testimonials; empty state supported |
| `cta` | Optional shared heading, intro and `availability: {title, lines: [text]}` | Contact link automatically targets `/contatto/` or `/en/contact/`; optional page-level `contactUrl` override for linked previews |
| `metrics` | `items: [{label, value, detail?}]`; optional `chart: {title, max, unit, rows: [{label, before, after}]}` | Statistics strip and before/after horizontal bars; use a positive numeric chart max and nonnegative numeric values; values remain available as text |
| `table` | `caption`, `columns: [text]`, `rows: [{label, values: [text], highlight?}]` | First column is a row heading; remaining values align with remaining column headings; semantic table, focusable horizontal scroll on mobile |
| `pricing` | `items: [{title, text, price, unit?, features: [text], link?, featured?, badge?}]` | Three-column price cards; price is display text, not a calculation; optional section note |
| `financial` | Optional `benefits: [{title, value, text}]`; `summary: {label, rows: [{label, value}], totalLabel, total, details?: [{label, value}]}` | Itemized financial panel with an optional adjacent benefit list; values are display text; optional section note |
| `calculator` | No content data required | Set `calculator: true` at page level to load the script. Supports English and Italian labels, euros and metric property sizes. No submission endpoint or persistence. |

The legacy `collections.post` collection contains placeholder English starter articles and is not separated by language. `useExistingPosts` explicitly reads that whole collection. For curated or bilingual listings, provide the desired language's `posts` list. Language-specific collections/filtering can be added when real editorial content is migrated.

Contact is a structural template, not a completed integration. Supplying `action` enables the fields; it does not create a backend. Before publishing it, configure and test handling, delivery, success/error behavior, spam protection and an accurate privacy notice. Add provider-specific attributes when the provider is selected. No consent wording or service claims are invented by this kit.

## Typography and editing

Use U.S. English for all English page content, labels, accessibility text, examples, and documentation. English pages render with `lang="en-US"`; keep `language: en` as the internal language selector and preserve existing `/en/` URLs. Italian content remains Italian.

Approved direction: Arial/Helvetica sans-serif; bold headings, numerical highlights and buttons. Hero headings use one sans-serif font throughout, including any second line; no italic serif switch. The header displays only the repository logo, followed by navigation in the order Home, About Us, Our Services, Our Process, Contact. The upper-right group contains the phone number and language flag, replacing the casual contact button. Georgia remains available for prose quotations and footer branding. Rounded buttons, warm off-white, dark green and lime accents accompany the typography. Styles are scoped to `.dz-site` and do not load onto existing pages.

Sass generates `redesign.css`. Do not hand-edit the generated stylesheet. Existing repository build/watch scripts also rewrite tracked legacy CSS and minify copied admin HTML. For this cloud environment, the saved installation script creates a runtime copy at `/workspace/domus-runtime`, installs locked dependencies, and builds there. Run the gallery server from that runtime copy. Refresh it after editing the checkout; keep user runtime/CMS edits safe before refreshing. Standard project commands remain `npm ci`, `npm run build`, and `npm start` in a suitable working copy.

## Verification

The production build and browser checks cover the English gallery, Italian example and article layout at 1440px, 768px and 390px. Checks exercise FAQ keyboard interaction, disabled unconfigured forms, real blog link targets, three/four-column cards, local image loading, language-specific CTA routing, preview metadata and mobile overflow. Integration delivery and live deployment are outside this template task.

## New formats and calculator

The additions preview is at `/design-system/additions/`. Standalone calculator previews are at `/design-system/calculator/` and `/design-system/calculator/it/`. All are excluded from collections/sitemap and have noindex metadata, like the existing gallery.

To place the calculator on a page:

```yaml
calculator: true
sections:
  - type: calculator
    id: estimate
    tone: muted
```

The calculator updates immediately for annual bill (€600–€8,000), home size (50–600 m²), four product choices, and architectural restrictions. Controls are native range/select elements with labels and keyboard support. Results include annual savings, solar capacity/generation, gross cost, assumed incentives, net cost and simple payback. Updates have a debounced screen-reader announcement. A contact link preserves the selected language. Without JavaScript, the form remains hidden and a contact fallback is shown.

The model is an **illustrative prototype**, not a validated engineering tool or approved incentive calculation. Its assumptions adapt the supplied mock-up: electricity €0.26/kWh, gas €0.11/kWh, current electricity share 42%, boiler efficiency 90%, heat-pump COP 3.5, solar yield 1,300 kWh/kWp/year, usable roof area 22% of floor area at 4.5 m²/kWp. Solar size is rounded down to 0.5 kWp and capped by roof area, modeled demand and 20 kWp. Self-consumption is 70%, or 85% with a battery. Heating savings subtract replacement electricity costs; solar savings reflect self-consumed generation. Total savings are bounded by the current bill.

Example costs: solar €1,500/kWp plus €1,200 fixed; heat pump €9,800 at 180 m², scaled by `(size / 180)^0.6` with a 0.6–1.8 multiplier; battery €11,000. Cost factors for restrictions are 1.08 (uncertain) or 1.22 (yes). Example incentives are 50% of the modeled solar cost and 65% of the modeled heat-pump cost, with no battery incentive. Net cost subtracts those assumptions from gross cost; simple payback divides net cost by annual savings. Incentive eligibility, rates, payment timing, site-specific suitability and all assumptions need review before public use. Financing, maintenance, time value of money and future price changes are not included. No confidence score is invented.

The calculator makes no network requests, does not save inputs and does not pretend to send a lead. Existing contact-form integration remains a separate task. It does not reuse the mock-up's placeholder endpoint or its false-success-on-error behavior.

Model checks: `node --test tests/redesign-calculator.test.cjs`. Five tests cover independent heating arithmetic, battery incentive exclusion, restriction effects, alternate assumptions, no-payback behavior, all 48 boundary combinations, and invalid input. Browser checks cover the new displays and both calculator languages at 1440px, 768px, 390px and 320px; keyboard interaction, table scrolling, locale formatting, no-JavaScript fallback, and absence of external requests were verified.

## Readability and compact shell — October 28, 2026

The shared `--font-min: 20px` token sets the minimum size for body text, navigation, labels, captions, buttons, and template notices on desktop and mobile. Larger headings and metrics retain their scale. Set this token to 18px if a smaller minimum is approved later.

The former beige paper background is now `#edf0e4`, matching the founder quote. Desktop header height is 69px (previously 115px); footer height is approximately 58px (previously 125px) at 1440px. The header logo scales proportionally to fit. Navigation switches to the hamburger layout at 1200px to accommodate larger links in both languages. Mobile header/footer spacing stays as before. The footer slogan in both languages is “Sun and Air - the Power of Domus Zero.”

## Current imagery

See [Image selection](IMAGE-SELECTION.md) for the October 29 photo replacement. Split sections can set `naturalImages: true` to preserve complete photographs, and image data may supply native `width` and `height`. A details-only Contact section without `image` uses one column. All photographic examples now use owner-supplied real images.

## Superseding image removal — October 29, 2026

The owner requested a photo-free working version. All 50 repository photo files, including the six uploaded replacements, have been deleted and their rendering references removed. Earlier photo selections and manifest references are historical. See [Current image status](IMAGE-SELECTION.md). Logos and interface icons remain.

## Current images — October 30, 2026

The twenty approved real, stock and generated sources have been placed on the migrated pages in both languages. This supersedes the photo-free state above. See [Current image selection](IMAGE-SELECTION.md) for placements, display copies, the driveway maintenance association and the requested 12px “Representative” / “Rappresentativa” overlays. Contact remains image-free.

## Page refinements — October 31, 2026

See [Current page/image decisions](IMAGE-SELECTION.md) for the more compact top/bottom bands, full-width About introduction, subtler 9px representative labels, removal of the Services detail strip and all Process images, and restored Contact aerial-road image. These supersede earlier image placements and label sizing.

## Additional refinements — October 31, 2026

The Home callouts and closing CTA now use the existing light green background. Services places its introductory paragraph across the full content width. Desktop Process steps use four equal-height rows, pairing 1/5, 2/6, 3/7 and 4/8, with the original 1–8 reading order on mobile. Contact has an 84px minimum footer height on desktop (twice the regular 42px) and a larger mobile footer. Other page footers retain their compact sizing.

The agreed future repository name is `domus-zero-website`; see [Repository identity](REPOSITORY.md) for remote-access status.
