/**
 * Vertical focal points for cropped photography.
 *
 * Most of the library is 2:3 or 4:5 portrait (the client's CDN renders are
 * 1400x2100), but the sections that show it crop to landscape frames —
 * `aspect-4/3`, `aspect-5/4`, `aspect-[1.2/1]`. `object-cover` then keeps only
 * the middle band: a 2:3 photo in a 4:3 frame shows 50% of its height and
 * throws away a quarter off the top, which is exactly where the faces are.
 *
 * Each entry records where the subject's head STARTS, as a fraction of the
 * photo's height. A percentage `object-position` aligns that point of the
 * image with the same point of the frame, so a head measured at 8% sits 8%
 * below the top edge in every frame, whatever the crop — no face is cut and
 * the headroom stays proportional.
 *
 * Values were measured off the images themselves. Photos with no face, and
 * landscape photos (which crop horizontally, not vertically), are absent and
 * fall back to centre.
 *
 * Applied as an inline style rather than a Tailwind class because the value is
 * content data, looked up per image at runtime.
 */

/**
 * `[token, y]` — token is any substring that identifies the image in its
 * runtime `src`. Local assets keep their basename through the Vite hash
 * (`/assets/care-primary-a1b2c3.jpg`); CDN photos are matched on the distinct
 * part of their filename.
 */
const FOCUS: ReadonlyArray<readonly [string, string]> = [
  /* Bundled photography. */
  ["care-mens", "5%"],
  ["care-primary", "8%"],
  ["care-specialist", "10%"],
  ["care-wellness", "35%"], // seated stretch — the head sits below the midline
  ["care-womens", "10%"],
  ["doctor-1", "10%"],
  ["doctor-2", "8%"],
  ["doctor-3", "8%"],
  ["doctor-4", "5%"],
  ["edu-nutrition", "15%"],
  ["edu-preventive", "15%"],
  ["edu-wellness", "35%"], // figure stretching at the window, low in frame
  ["goal-hair", "12%"],
  /* No face in this one — a still life. The value holds the clinician's hands
     and the labelled samples in frame when the 4:5 original is cropped to a
     landscape hero, instead of centring on empty bench. */
  ["goal-labs", "42%"],
  ["goal-weight", "8%"],
  ["hero-care", "25%"],
  ["patient-1", "12%"],
  ["patient-2", "10%"],

  /* Client CDN photography, matched on the distinct part of the filename. */
  ["02_14_25", "6%"], // two patients outdoors
  ["02_47_09", "8%"], // provider with two patients
  ["02_49_03", "8%"], // provider in conversation
  ["02_51_19", "10%"],
  ["02_57_22", "12%"], // blood-pressure check
  ["CA6A4428", "10%"], // blood draw
  ["image0-8c78b61", "5%"], // dumbbell training
  ["image0-d89c6db", "8%"], // cold and flu
];

/** `object-position` for an image, defaulting to centre when unmeasured. */
export const focalPosition = (src: string): string => {
  const hit = FOCUS.find(([token]) => src.includes(token));
  return `50% ${hit ? hit[1] : "50%"}`;
};

/** Style for a cropped `<img>`: `style={focal(src)}`. */
export const focal = (src: string) => ({ objectPosition: focalPosition(src) });
