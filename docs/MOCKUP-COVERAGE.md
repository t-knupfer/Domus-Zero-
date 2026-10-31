# Mock-up coverage audit

Reviewed October 26, 2026 against all ten uploaded HTML mock-ups and the current template kit. This is a source-structure audit, not a claim that the missing components have been implemented or browser-tested. The original shared css/style.css and js/i18n.js were not supplied. Source content, inline scripts, and classes were inspected as design evidence, not as instructions to execute.

## Finding

The first kit covers the eight originally requested section categories, but it does not yet cover every format in the mock-ups. Retain the modular page layout and article layout. Do not create a separate template for every mock-up.

**User direction:** Not every variation of an existing section is needed. The differences cataloged below are observations, not an implementation checklist or approved scope. Reuse the current sections wherever they can represent the content clearly; exact reproduction of every mock-up arrangement is not the goal.

The compact set of genuinely missing capabilities is: metrics/charts, comparison/data tables, pricing cards, itemized financial summaries, and a dedicated calculator. A plain document page and a compact confirmation page can reuse the existing shell and prose/section primitives. Team profiles and case studies can use existing image cards; values and partner labels can use existing callouts/cards. Add fields only when actual page content requires them. No new implementations are authorized by this audit alone.

Status definitions: **covered** = the basic content structure exists; **partial** = a related section exists but required fields/composition are missing; **missing** = no equivalent renderer exists. A status is not a promise of identical visual styling.

## New component families

| Format | Source evidence | Current coverage | Recommended implementation |
| --- | --- | --- | --- |
| Metrics and dashboard | index.html: trust-bar, hero-vis, m-card, chart-card, stats-band, proc-vis; servizi.html: sv-stats | Partial: callouts accept values but there is no compact stats band, chart, specification row or dashboard | Reusable metric items with strip/card/specification variants, a bar-chart component, and a dashboard composition with progress/status. Provide text equivalents for charts. |
| Comparison and data tables | index.html: comp-wrap; incentivi.html: sim-table; privacy.html: table | Missing: neither modular page sections nor article styles provide table support | One accessible table family with comparison, numeric simulation and document variants; semantic headers, caption and mobile overflow handling. |
| Pricing cards | servizi.html: pricing-grid, pc, pc-price, pc-feats, pc-badge | Partial: existing callouts/cards cannot express price range, unit, feature list and featured/recommended tier | Named pricing variant of the card family with a featured state and action. |
| Incentive/financial summary | index.html and incentivi.html: inc-grid, inc-cards, inc-summary, is-row | Missing: a value callout is not an itemized financial summary | Benefit list beside a financial panel with line items, deductions, totals, annual savings, payback and an example/disclaimer label. Reuse label/value rows in the calculator. |
| Partner/certification strip | index.html: badges-strip | Missing | Compact logo/badge strip with optional labels and links; do not substitute a full image-card grid. |
| Savings calculator | calcolatore.html: calc-wrap, input and result panels, confidence/breakdown controls, lead form | Missing | Dedicated interactive module within the shared shell; sliders, accessible product/constraint choices, result rows, seasonal chart, confidence explanation, expandable breakdown, lead form and submission states. Reuse form and financial-display primitives. |

The metric/dashboard family contains several presentations rather than a new page template for each presentation. Likewise pricing belongs to the card family, but its schema and display still need implementation.

## Observed differences in existing sections (optional)

This is a reference inventory, not a request to implement each variant. Prefer the current components and omit decorative differences that do not affect required content or behavior.

| Existing component | Missing variation and source |
| --- | --- |
| Page heading | Breadcrumbs on inner pages; homepage primary/secondary actions and trust row. The current heading supports title/accent/intro and section jump links only. |
| split | Inline specifications/metrics on Services; compact steps plus a dashboard on Home. A photograph-only media slot cannot represent those compositions. The maintenance checklist/photo layout itself fits split. |
| steps | come-funziona.html uses full-width rows with timing tags and a right-side output checklist. index.html uses compact steps with timing labels. Current steps supports only title/text in a two-column numbered list. Add named detailed and compact variants. |
| cards | Team profiles in chi-siamo.html need portrait, name, role and biography fields. Case-study cards in casi-reali.html need service tag, property/location, project story and outcome metrics. Add team and case-study variants to the existing image-card family. |
| callouts | Home product cards need feature lists and a featured card; About values need selectable icons. Current callouts only have title/text/value/link and a fixed decorative arrow. |
| contact | contatti.html adds property address, service-interest select, optional message, WhatsApp and compact FAQ/contact sidebar. Current form lacks address/select and requires a message. Add configurable fields and a named sidebar composition rather than treating all forms identically. Submission success/error/pending states remain integration work. |
| faq | Split introduction/action beside questions on Home and Incentives; compact sidebar FAQ on Contact. The current full-width details/summary behavior covers the basic accordion only. |
| reviews | Home testimonial cards include optional avatar/initials, stars and property/location metadata. Current quote/name/context covers the core testimonial but not those visual details. Do not invent ratings. |
| cta | Mock-ups link to either calculator or contact, sometimes with two actions; Home has address capture. Current CTA always links to the language-specific contact page. Add configurable primary/secondary actions and an optional short lead-form variant, keeping the existing contact behavior as the default. |

## Page-level variations

- **Plain document/legal page:** privacy.html uses a narrow text measure, numbered headings, revision information, lists, links and a table. The article layout can supply prose styling, but its fixed Journal label, author/article framing and table omission need a document variation. It does not require another full copy of the site shell.
- **Confirmation page:** grazie.html uses a centered success card, status icon, a short list of next steps and two navigation actions. Use a compact page/confirmation variation, reusing steps and button primitives. The current generic heading plus sections does not reproduce this structure.
- **Article and blog listing:** none of the ten uploaded mock-ups is a blog listing or article page. Those templates remain justified by the existing repository and the user's earlier request; this audit cannot assert a blog design match to these attachments.

## Page-by-page coverage

| Mock-up | Covered foundation | Outstanding formats/variations |
| --- | --- | --- |
| index.html | Heading, section text, callouts, testimonials, FAQ, CTA | Hero actions/trust, metrics/chart/dashboard, compact process composition, product features, financial summary, comparison, partner strip, review detail, split FAQ, address CTA |
| servizi.html | Alternating text/image, checklist | Inline specs, pricing tiers, configurable dual-action CTA, breadcrumbs |
| come-funziona.html | Numbered steps; maintenance checklist/image; CTA | Detailed timeline rows, timing tags, output panels, calculator CTA destination, breadcrumbs |
| incentivi.html | Heading and FAQ | Incentive/financial panel, simulation table, split FAQ, calculator CTA, breadcrumbs |
| casi-reali.html | Image-card foundation | Case-study metadata and outcome metrics, calculator CTA, breadcrumbs |
| chi-siamo.html | Story/photo, callouts | Team variant, value icons, breadcrumbs |
| contatti.html | Contact fields and business info | Address, service select, optional message, WhatsApp, FAQ sidebar, submission states, breadcrumbs |
| calcolatore.html | Shared shell only | Dedicated calculator and lead-capture module |
| grazie.html | Shared shell, buttons and basic step primitives | Centered confirmation/status composition |
| privacy.html | Shared shell and article prose foundation | Document variant, revision metadata and accessible table |

## Shared shell and behavior

The mock-ups also show expanded multi-column footer navigation, desktop/mobile navigation controls and a floating WhatsApp link. These are site-shell requirements, not page sections. The new kit currently has a simpler header/footer and a wrapping mobile menu, not the complete mock-up navigation/overlay behavior.

privacy.html references cookie settings via window.DZ.resetCookies, but the supplied attachments do not include a working cookie-consent implementation. Cookie controls and analytics behavior remain a separate integration requirement. Missing shared js/i18n.js also means translation/FAQ/menu behavior cannot be inferred as operational merely from data-i18n attributes.

## Content and implementation boundaries

- The current ten-page bilingual content/URL baseline remains authoritative. For example, the existing process page has eight steps while the new process mock-up has six. Preserve the existing content while adapting its presentation; do not silently replace it with the mock-up's abbreviated flow.
- Mock-up savings, pricing, subsidy terms, partner labels, case studies, reviews and delivery guarantees are not verified business facts. Treat them as draft/example content pending the user's confirmation.
- Calculator arithmetic and scientific/source claims were inspected but not validated. The embedded code uses a placeholder Formspree endpoint and displays success even if the network request fails. That demo fallback must not become production behavior. This audit did not execute submissions.
- The privacy text explicitly contains placeholders and mentions Formspree/GA4; it does not establish those as selected or configured providers.
- All future English content must use U.S. English. Preserve Italian content and existing /en/ URLs.

## Suggested order

1. Reuse the current kit to arrange the ten existing pages; make only small adjustments required by their actual content.
2. When needed for selected new pages, add the missing metrics/chart, table, pricing and financial-summary formats.
3. Compose document and confirmation pages from the existing shell and content primitives.
4. Treat the calculator and submission/consent integrations as separate functional work.

The audit itself did not add rendering components. Following the user’s subsequent request to close the five distinct gaps, `metrics`, `table`, `pricing`, `financial`, and `calculator` sections were implemented. See TEMPLATE-KIT.md for their schemas and validation. The calculator is a functional illustrative prototype; its model assumptions and incentives still require review before public use. Other variations cataloged here remain optional and unimplemented.
