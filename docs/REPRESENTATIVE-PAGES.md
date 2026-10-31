# Step 3: representative pages

The agreed scope is **Our Services and Contact in U.S. English only**. Home and the Italian pages are deferred to step 4. Contact forms and backend integration are deferred until after migration.

## Pages to review

| Preview route | Existing content source | Intended production route in step 4 |
| --- | --- | --- |
| /design-system/services/ | src/content/pages/services.html plus the shared CTA | /en/our-services/ |
| /design-system/contact/ | src/content/pages/contact.html and src/_data/client.json | /en/contact/ |

These are complete review pages assembled from the shared layout and sections. They do not replace the existing production routes. They are excluded from collections/sitemap and carry noindex metadata, consistent with the other design previews.

Services preserves the existing narrative, all eight service points, the consultation link, shared contact CTA and availability information. The typography and presentation use the approved redesign. Links to Contact target the representative Contact page for a continuous review flow.

Contact displays the existing email address, telephone number, business address, map link and repository image. Contact data comes from client.json. It contains **no form**, including disabled forms, and has no submission/backend behavior. The reusable contact section supports this through detailsOnly: true.

Page-level servicesUrl and contactUrl overrides link these two previews together. The shared navigation defaults remain the original production paths when no overrides are supplied. Navigation to Home, About and Process still reaches the existing pages. The upper-right Italian flag links to each page's existing Italian counterpart, not to a newly built Italian preview. Only English representative pages were created.

## Review revisions

- Services has one small “Our Services” label above the hero; the repeated content-section label was removed.
- The hero uses a single sans-serif font throughout, with natural wrapping rather than mixed serif/sans-serif lines.
- Shared navigation follows the existing site's order: Home, About Us, Our Services, Our Process, Contact.
- The header uses the logo alone, with the phone number and language flag on the right. The casual contact button was removed.
- On mobile/tablet, the header shows the logo, a phone icon, language flag, and hamburger button. The five navigation links appear in a vertical dropdown, in the same order, using 16px Arial/Helvetica. The phone icon uses a normalized tel: link with an accessible label and a 44px touch target. It hands calling to the device rather than initiating a call itself. The menu supports keyboard activation, Tab, Escape, outside-click dismissal and reset on viewport changes. Without JavaScript the links remain available. Desktop keeps visible navigation and the full phone number.

## Validation and status

The production build passed. Browser checks cover desktop (1440px), tablet (768px), and mobile (390px and 320px), image loading, page language and metadata, internal link targets, the Services-to-Contact keyboard CTA flow, preservation of all eight service points, and contact details from client.json. Neither representative page contains form controls. The existing gallery's browser checks also passed after the shared component updates.

The representative-page review was followed by the user's authorization to migrate the existing pages in step 4a. All ten original pages now use the shared redesign layout on the local branch; see MIGRATION.md. These representative routes remain as historical review examples. No production deployment setting was changed, and nothing has been pushed or deployed.
