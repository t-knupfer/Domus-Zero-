# Step 4a: existing-page migration

Completed locally on October 27, 2026, on branch `redesign/template-kit`. Production remains on `casa-mia-zero`. No push, deployment, repository membership change or Netlify configuration change was made.

## Migrated pages

| Page | Italian URL | English URL |
| --- | --- | --- |
| Home | / | /en/ |
| About | /chi-siamo/ | /en/about/ |
| Process | /il-nostro-processo/ | /en/our-process/ |
| Services | /i-nostri-servizi/ | /en/our-services/ |
| Contact | /contatto/ | /en/contact/ |

Each original `.html` file now declares the shared `redesign/page.njk` layout, its existing title/description/permalink, page language and paired language URL. A sibling `.11tydata.json` holds its content and selected sections. Both languages use the same templates and approved single-font headings. English is U.S. English.

## Content and behavior retained

- All 128 active heading, paragraph, list and founder-attribution blocks captured before migration are present after migration, allowing only the approved U.S. English spelling change from handover to handoff.
- Home retains its original headline, introductory copy, consultation action, about section, four linked service cards, detailed service checklist, three reasons to choose Domus Zero, and shared contact CTA. No calculator, incentive examples, pricing or invented reviews from the new mock-ups were added to Home.
- About retains its narrative and the full statement attributed to Stefan Knupfer, with his role, process link and contact CTA.
- Process retains all eight original steps in each language, not the six-step draft flow in the mock-ups.
- Services retains all eight service points, consultation link and contact CTA.
- Contact retains the business email and telephone. Per the October 29 request, the displayed address is now only “Domus Zero / Firenze FI Italy”; the extra introduction, section heading and Directions link are removed, and the closing line follows the contact information. There is no form or submission workflow.
- The existing nine redirect rules remain byte-for-byte unchanged.
- Desktop navigation and mobile dropdown follow the agreed five-page order. The mobile header contains the logo, tap-to-call icon, language flag and hamburger. Each language flag points to the matching page in the other language.
- Canonical URLs, existing descriptions, title data, social metadata and favicon links are retained or restored in the shared layout. Paired alternate-language metadata was added; Italian pages correctly declare `lang="it"`, English pages `lang="en-US"`.

## Assets and scope

At the initial migration, twenty original content-image references across the ten pages were retained. On October 29, 2026 the owner requested replacement of all content photography; those references are now superseded by the six supplied real photos, with no decorative image on Contact. See [Image selection](IMAGE-SELECTION.md) for placements and missing subjects. The About image reference `solar_install.JPG` was corrected to the actual lowercase filename. Broken decorative remote graphics and the CTA's incorrect uppercase background path are superseded by the shared template styles. Home's four remote stock-meeting photos were replaced with relevant images already in the repository. The replacement adds six optimized WebP images; no external dependencies were introduced.

The migrated public pages make no third-party asset requests. The old home-only Netlify Identity login widget was not carried into the public redesign; the existing `/admin/` files remain unchanged. Administrative authentication has not been validated or reconfigured.

Blog, FAQ, Reviews and admin files outside the ten-page baseline were left unchanged. Preview/demo routes under `/design-system/` remain noindex and excluded from the sitemap. Privacy/legal pages, other new pages, analytics, cookie consent, lead capture and backend integrations remain separate work. The illustrative calculator remains a preview component, not part of the migrated production paths.

## Validation

The production build passed in the isolated runtime copy, leaving generated legacy CSS outside the checkout.

Four migration checks validate built output against `tests/fixtures/migration-baseline.json`: preservation of original content and links, language/SEO metadata, approved replacement images and local asset paths, contact details, redirects and sitemap membership. Run them after a build with:

```bash
DOMUS_BUILD_DIR=/workspace/domus-runtime/public python3 -m unittest discover -s tests -p test_migration.py -v
```

Browser checks exercise all ten pages at 1440px, 768px, 390px and 320px, including rendered content, image decoding, canonical and alternate language paths, current-page navigation, hamburger keyboard behavior and contact CTAs. No JavaScript errors, failed asset responses, forms or third-party requests were observed. The section-gallery checks also passed after the shared layout changes.

This validates local migration, not live deployment or user visual approval. Browser renders are saved outside the checkout in `/workspace/design-preview/migration/`; REVIEW.md there links all desktop/mobile versions.

## Superseding image removal — October 29, 2026

The owner requested a photo-free working version. All 50 repository photo files, including the six uploaded replacements, have been deleted and their rendering references removed. Earlier photo selections and manifest references are historical. See [Current image status](IMAGE-SELECTION.md). Logos and interface icons remain.

## Current images — October 30, 2026

The twenty approved real, stock and generated sources have been placed on the migrated pages in both languages. This supersedes the photo-free state above. See [Current image selection](IMAGE-SELECTION.md) for placements, display copies, the driveway maintenance association and the requested 12px “Representative” / “Rappresentativa” overlays. Contact remains image-free.

## Page refinements — October 31, 2026

See [Current page/image decisions](IMAGE-SELECTION.md) for the more compact top/bottom bands, full-width About introduction, subtler 9px representative labels, removal of the Services detail strip and all Process images, and restored Contact aerial-road image. These supersede earlier image placements and label sizing.

## Additional refinements — October 31, 2026

The Home callouts and closing CTA now use the existing light green background. Services places its introductory paragraph across the full content width. Desktop Process steps use four equal-height rows, pairing 1/5, 2/6, 3/7 and 4/8, with the original 1–8 reading order on mobile. Contact has an 84px minimum footer height on desktop (twice the regular 42px) and a larger mobile footer. Other page footers retain their compact sizing.

The agreed future repository name is `domus-zero-website`; see [Repository identity](REPOSITORY.md) for remote-access status.
