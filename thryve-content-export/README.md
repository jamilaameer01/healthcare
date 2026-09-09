# Thryve Wellness — content package

This is the **real, exact content** from the Thryve Wellness site — every
heading, paragraph, list item, price, phone number, address, and image URL —
pulled straight from the source (no rewriting, no summarizing, no invented
copy). It's meant to be handed to a design tool (e.g. Lovable) so it can
build a new look for the site **using this content as-is**, instead of
generating placeholder text or stock photos.

## ⚠️ Read this before feeding it to a design tool

Tell the tool explicitly: **"Use the text and image URLs in this package
exactly as given. Do not paraphrase, rewrite, summarize, or replace them,
and do not substitute different images."** AI website builders default to
generating their own placeholder copy and stock imagery — without that
instruction it will likely invent new text and pictures instead of using
what's here.

## What's in this folder

| File | Contents |
|---|---|
| `site.json` | Business name, tagline, phone/fax, address, booking URL, social links, nav links, weekly hours |
| `team.json` | The 3 team members: name, photo URL, full bio (as paragraphs) |
| `partners.json` | The 3 partner/brand logos with their links |
| `medical-services.json` | All 8 medical service categories (Direct Primary Care, Acute Care, DOT, Weight Management, Peptide Therapy, Hormone Optimization, Piezo Wave 2, DUTCH Test) with every item's title, body text/lists, and photo |
| `aesthetic-services.json` | The SkinPen® Microneedling page content (sections, bullet lists, image) |
| `pages-meta.json` | Page titles/descriptions per route, for `<title>`/meta tags |
| `not-found.json` | The 404 page's copy |
| `images-manifest.json` | Every image used anywhere on the site, flattened into one list with which page/section it belongs to and its alt text — use this as the master image checklist so nothing gets missed |
| `assets/logo.png` | The one image asset that actually exists as a local file (the clinic logo); everything else lives on the client's own CDN (see below) |
| `reviews-section-NOTE.txt` | Why there's no "Reviews" section content — read this before adding one |

## About the image URLs

Every image URL in these JSON files (other than the logo) points to the
client's real, live GoDaddy CDN (`img1.wsimg.com`) — these are the **actual
photos already in use on the current site**, at the exact crop the site
owner chose, not placeholders. They will keep working regardless of what
new design/host this content moves to, so there's no need to re-upload or
re-host them — just reference them by URL. If a redesign wants a different
crop of the same photo, keep the base filename and only change the resize
parameters after `/:/`.

## The Reviews section

The original site had a "Reviews" heading on the About page, but the review
content itself loaded live from a connected third-party service and was
never actually captured — there is no real review text to hand over. See
`reviews-section-NOTE.txt`. Don't let a design tool invent sample reviews
for this; either wire up a real reviews source or leave the section out
until real testimonials exist.

## Source

This content was extracted from `thryvewellnessclinic.com`'s static export
and is also the single source of truth used by the Next.js rebuild at
`../thryve-nextjs` (`lib/data.ts` and `lib/medical-services.ts`) — the two
should always agree. If you edit content, update both.
