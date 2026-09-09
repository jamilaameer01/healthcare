Build a marketing website for **Thryve Wellness**, a med-spa / wellness
clinic in Naples, FL. I'm attaching a content package (JSON files + a
README + a logo image) with the site's real, final content — every
heading, paragraph, price, phone number, address, and image URL. Use it
as follows.

## Non-negotiable rules

1. **Use the text in the JSON files verbatim.** Do not paraphrase,
   summarize, rewrite, "improve," or shorten any heading, paragraph, bio,
   or list item. If a field is empty or missing, leave that spot empty —
   don't invent copy to fill it.
2. **Use the image URLs exactly as given, don't replace them with stock
   photos or generated images.** Every URL in `images-manifest.json` (and
   inside the other JSON files) is a real, live photo already hosted on
   the client's own CDN — just reference the URL directly as the `src`.
   The only local file is `assets/logo.png` (the clinic logo); use that
   file for the logo instead of generating a new one.
3. **Don't add sections, pages, services, or team members that aren't in
   the data.** If you want to add something purely structural (e.g. a
   sticky nav, a back-to-top button), that's fine — just don't add new
   business content (fake testimonials, extra services, made-up stats).
4. **Reviews section:** there is no real review/testimonial content —
   see `reviews-section-NOTE.txt`. Don't invent sample reviews. Either
   leave a "Reviews" section out entirely, or add a simple placeholder
   block that's obviously empty/"coming soon" rather than fabricated
   quotes.

## Pages to build

- **Home** (`site.json` for tagline/phone/booking link) — hero with the
  business name and tagline, a prominent "Schedule an Appointment" button
  linking to `site.json.bookingUrl` (opens in a new tab), and a short
  "Our Mission" section (the mission paragraph is in the README/content —
  it's the same intro paragraph that opens `team.json`'s tone; if you
  need the exact wording, it's: *"At Thryve Wellness, our mission is to
  empower every patient to achieve optimal health through preventative,
  and personalized care. We combine modern medicine with advance
  therapies- including hormone optimization, peptides, and weight
  management to restore balance, enhance vitality, and support long term
  well-being. We are committed to building provider-patient relationships
  where you will feel heard, educated and equipped to take control of
  your health and "Thryve"."*
- **About** — team bios from `team.json` (name, photo, full bio per
  person, 3 people), plus a "Partners" section using `partners.json`
  (logo + link to each partner's site).
- **Medical Services** — every category and item in
  `medical-services.json` (Direct Primary Care, Acute Care, DOT, Weight
  Management, Peptide Therapy, Hormone Optimization, Piezo Wave 2, DUTCH
  Test). Each category has a title + description (and sometimes a
  symptom list); each item has a title, image, and body text/lists.
  Preserve every item, even the ones that are image-only with no text.
- **Aesthetic Services** — the SkinPen® Microneedling content in
  `aesthetic-services.json` (intro, How It Works, Benefits list, What to
  Expect, Why Patients Choose SkinPen). The image links out to
  `https://skinpen.com/`.
- **Contact** — address, phone, fax, and weekly hours from `site.json`; a
  contact form (Name, Email, Message — no working backend needed, just
  the UI); a "Get directions" link/map using the real address; social
  links (Facebook/Instagram/TikTok) from `site.json`.
- **404 page** — copy is in `not-found.json`.

Every page shares the same header (logo + nav links from
`site.json.navLinks`, phone number, booking CTA) and footer (copyright,
socials, address).

## Design direction

This is a med-spa/wellness clinic — the design should feel calm, clean,
and premium/trustworthy (think: a boutique medical practice, not a loud
consumer brand). Good typography, generous white space, a soft neutral
palette, real photography treated respectfully (no aggressive filters).
Fully responsive. Within that, I want this to feel **designed, not
templated** — make it stand out, not generic-clinic-website #47.

**The hero has to be a moment, not just a headline-and-button.** Give it
real presence: layered depth (e.g. a soft blurred/parallax echo of the
logo or a background shape behind the foreground content), the tagline
set big and confident in a refined display typeface, the phone number and
booking button treated as secondary but present, a subtle scroll cue. It
should feel like the opening shot of the site, not a banner.

**Break up the long content sections with a few "cut" / interstitial
moments** — full-bleed bands that reset the rhythm between the denser
sections (mission → team → services → contact), the way an editorial
site or a design portfolio breathes between blocks of content instead of
running section-card-section-card-section-card back to back. Ideas
(pick what fits, using only real content — no invented stats/quotes):
- A full-width statement band that pulls out the tagline or one line from
  the mission paragraph, set large, on its own breathing room.
- A slow auto-scrolling marquee/ticker of the real medical-service
  category names (from `medical-services.json`) between the mission and
  team sections — each one a link to that service.
- A full-bleed real photo break (one of the clinic/team images) with a
  short real caption, before the contact section.
- A slim band with the address/hours/phone treated typographically as a
  transition into the footer, instead of the contact info just appearing
  in a plain block.

**Every section needs a reason to exist and a moment of motion** — no
section should just sit there static and no section should be filler.
Give each section a purposeful scroll-triggered entrance (fade/slide-up,
staggered by item for grids like the team or services), tasteful hover
states on cards/images (slight scale, image zoom, color shift), and where
it fits, subtle parallax on background imagery. Keep the motion **decent
and premium** — smooth easing, short durations, nothing bouncy, flashy,
or distracting from a healthcare brand. Motion should support the content,
not perform tricks.

## Files in this package

`site.json`, `team.json`, `partners.json`, `medical-services.json`,
`aesthetic-services.json`, `pages-meta.json` (page titles/meta
descriptions), `not-found.json`, `images-manifest.json` (master list of
every image + which page/section it belongs to), `assets/logo.png`,
`reviews-section-NOTE.txt`, and `README.md` (fuller explanation of all of
the above).
