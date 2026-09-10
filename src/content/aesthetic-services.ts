/**
 * Aesthetic-services content, generated from the client's export
 * (`thryve-content-export/aesthetic-services.json`).
 *
 * The export supplies one treatment (SkinPen® microneedling). The shape below
 * is a list so a second treatment is a data edit rather than a layout change:
 * add an entry and the page renders it, and the index row in the page header
 * appears on its own once there is more than one.
 *
 * Text is the client's own.
 *
 * Imagery follows the convention set in `thryve.ts`: the site's own curated
 * photography rather than the export's assets. The export's only picture here
 * is the manufacturer's product shot of the device on a white studio ground —
 * it can only be shown letterboxed in a white box, which reads as a hole in
 * the page, so the device is credited with a link instead and the treatment is
 * illustrated with skin photography that fills its frame.
 */

import goalHair from "@/assets/goal-hair.jpg";
import careWomens from "@/assets/care-womens.jpg";

/** A run of body copy: prose, or a list of claims. */
export type AestheticPart = { type: "p"; text: string } | { type: "list"; items: string[] };

export type AestheticSection = {
  heading: string;
  parts: AestheticPart[];
};

export type AestheticImage = { src: string; alt: string };

export type AestheticService = {
  id: string;
  title: string;
  /** One line for the page header and the index row. */
  short: string;
  /** The opening description, before the sections. */
  description: string;
  /**
   * Photography for this treatment, all of it cropped to fill its frame. The
   * first is the lead; the page uses the rest below it where it has room.
   */
  images: AestheticImage[];
  /** The device manufacturer, credited as a text link under the copy. */
  device?: { name: string; href: string };
  sections: AestheticSection[];
};

export const aestheticServices: AestheticService[] = [
  {
    id: "skinpen-microneedling",
    title: "SkinPen® Microneedling",
    short: "FDA-cleared microneedling that builds your own collagen.",
    description:
      "SkinPen® microneedling is an FDA-cleared, minimally invasive treatment that works with your skin rather than on top of it — activating the repair process that produces new collagen and elastin.",
    images: [
      { src: goalHair, alt: "Close-up portrait showing clear, healthy skin in warm daylight" },
    ],
    device: { name: "SkinPen® by Crown Aesthetics", href: "https://skinpen.com/" },
    sections: [
      {
        heading: "How it works",
        parts: [
          {
            type: "p",
            text: "SkinPen uses precise, controlled micro-injuries to trigger the skin's natural wound-healing response. This process stimulates new collagen and elastin production — the essential building blocks for smoother, healthier-looking skin.",
          },
        ],
      },
      {
        heading: "What it improves",
        parts: [
          {
            type: "list",
            items: [
              "Fine lines and wrinkles",
              "Acne scars and surgical scars",
              "Skin texture and tone",
              "The appearance of pores",
              "Sun damage and hyperpigmentation",
              "Overall skin firmness",
              "A brighter, refreshed complexion",
            ],
          },
        ],
      },
      {
        heading: "What to expect",
        parts: [
          {
            type: "p",
            text: "Treatments are quick — typically 30–45 minutes — with minimal downtime. Mild redness similar to a light sunburn may occur for 24–48 hours. A series of treatments is often recommended for optimal results.",
          },
        ],
      },
      {
        heading: "Why patients choose it",
        parts: [
          {
            type: "list",
            items: [
              "Safe for all skin types",
              "FDA-cleared technology",
              "Non-surgical and minimally invasive",
              "Stimulates natural collagen — no fillers required",
              "Long-lasting results with proper skincare maintenance",
            ],
          },
          {
            type: "p",
            text: "SkinPen® doesn't just treat the surface — it activates your skin's natural regenerative process, helping you achieve smoother, firmer and more youthful-looking skin from within.",
          },
        ],
      },
    ],
  },
];

/**
 * The page's opening photograph. Held separately from the treatments so the
 * hero and the first treatment's lead frame are never the same picture.
 */
export const aestheticHero: AestheticImage = {
  src: careWomens,
  alt: "A patient in warm, natural daylight at the practice",
};

/** Look up one treatment. */
export const aestheticServiceById = (id: string) => aestheticServices.find((s) => s.id === id)!;
