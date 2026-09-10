/**
 * Thryve Wellness — content source of truth.
 *
 * Text comes from the client's content export (`thryve-content-export/`).
 * Long passages are condensed to fit the section they appear in, but no
 * claim, figure, service or testimonial has been invented: where the export
 * has no content (patient reviews, clinic statistics), the sections use the
 * clinic's own words instead of made-up copy.
 *
 * Imagery:
 * - Real people (team) and real brands (partners, SkinPen) use the client's
 *   own photos, requested from their CDN at a higher resolution than the
 *   export's 600x300 crops.
 * - The export's service illustrations are cool-toned AI renders that clash
 *   with this design, so illustrative service imagery uses the site's own
 *   curated photography instead.
 */

import carePrimary from "@/assets/care-primary.jpg";
import careSpecialist from "@/assets/care-specialist.jpg";
import careMens from "@/assets/care-mens.jpg";
import goalWeight from "@/assets/goal-weight.jpg";
import goalTreatment from "@/assets/goal-treatment.jpg";
import goalLabs from "@/assets/goal-labs.jpg";
import goalTools from "@/assets/goal-tools.jpg";
import goalHair from "@/assets/goal-hair.jpg";
import eduPreventive from "@/assets/edu-preventive.jpg";

/* Client CDN base for the clinic's own photography. */
const CDN = "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6";

export type ServiceImage = { src: string; alt: string };

/* Request the client's own images at 1200w rather than the export's 720w. */
const img = (file: string, alt: string): ServiceImage => ({
  src: `${CDN}/${file}/:/rs=w:1200,cg:true`,
  alt,
});

/*
 * The client's service photography, screened before use. Five supplied
 * images are deliberately NOT referenced anywhere: three carry posters of a
 * body in underwear, one a reproductive-anatomy chart, and one shows a bare
 * torso — none suit a public-facing clinic page.
 */
const photo = {
  consultCouple: img(
    "ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_47_09%20PM.png",
    "A provider explaining a care plan to two patients",
  ),
  bloodPressure: img(
    "ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_57_22%20PM.png",
    "A provider checking a patient's blood pressure",
  ),
  consultPair: img(
    "ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_49_03%20PM.png",
    "A provider in conversation with two patients",
  ),
  coldFlu: img("image0-d89c6db.png", "A patient at home with cold and flu symptoms"),
  sinus: img("image0-d49ad1b.png", "A patient easing sinus pain with a tissue"),
  bloodDraw: img(
    "CA6A4428-7C01-45B1-B66D-B3700B7481F3.PNG",
    "A clinician drawing blood for a hormone panel",
  ),
  glp1: img(
    "image0-33bd881.png",
    "A provider explaining a weight-management medication to a patient",
  ),
  strength: img("image0-8c78b61.png", "A patient training with a dumbbell in a bright gym"),
  skinpenDevice: img("Skin-pen-pic-1536x1098.jpg", "The SkinPen® microneedling device"),
  couple: img(
    "ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_14_25%20PM.png",
    "Two patients outdoors in warm afternoon light",
  ),
};

export const site = {
  name: "Thryve Wellness",
  tagline: "Refined Wellness. Elevated Results.",
  city: "Naples, Florida",
  phone: "239-248-5560",
  phoneHref: "tel:2392485560",
  fax: "1-800-880-6198",
  faxHref: "tel:18008806198",
  address: ["2950 Tamiami Trail North", "Suite 5, Unit 31", "Naples, FL 34103"],
  addressLine: "2950 Tamiami Trail North, Suite 5, Unit 31, Naples, FL, USA",
  mapQuery: "2950+Tamiami+Trail+North+Suite+5+Naples+FL",
  bookingUrl: "https://app.squareup.com/appointments/book/i5stqx76hob2cg/L418Y8T8TPKBJ/start",
  facebook: "https://www.facebook.com/1041181485737041",
  instagram: "https://www.instagram.com/wellnessthryve/",
  tiktok: "https://www.tiktok.com/@thryve.wellness6",
  hours: [
    { day: "Monday – Friday", time: "9:00 am – 5:00 pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
};

/** The clinic's mission statement, as supplied. */
export const mission =
  "At Thryve Wellness, our mission is to empower every patient to achieve optimal health through preventative and personalized care. We combine modern medicine with advanced therapies — including hormone optimization, peptides, and weight management — to restore balance, enhance vitality, and support long-term well-being.";

export const missionClose =
  "We are committed to building provider-patient relationships where you feel heard, educated and equipped to take control of your health and thryve.";

export type Service = {
  id: string;
  title: string;
  /** One line for cards and list rows. */
  short: string;
  /** The category description from the export, condensed where needed. */
  description: string;
  bullets?: string[];
  /**
   * Distinct images for this service. Sections take different indexes so the
   * same photo does not appear twice as you scroll.
   */
  images: ServiceImage[];
};

/** Nth image for a service, cycling if it has fewer. */
export const imageAt = (s: Service, index: number): ServiceImage =>
  s.images[index % s.images.length]!;

/**
 * This site's own curated photography for a service — the bundled assets
 * rather than the client's CDN photos. Used where the warm editorial look
 * matters more than showing the clinic's own image.
 */
export const studioImage = (s: Service): ServiceImage =>
  s.images.find((i) => !i.src.startsWith("http")) ?? s.images[0]!;

export const services: Service[] = [
  {
    id: "direct-primary-care",
    title: "Direct Primary Care",
    short: "Unlimited access to your provider for one monthly membership.",
    description:
      "A modern approach to healthcare built on access, relationship and transparency. Instead of billing insurance for every visit, you pay a simple monthly membership — no copays, no surprise bills, no rushed appointments.",
    bullets: [
      "Same-day or next-day appointments",
      "Extended, unhurried visits",
      "Direct phone, text or email access to your provider",
      "Preventative care and wellness planning",
      "Chronic disease management",
      "Discounted labs and medications",
    ],
    images: [
      photo.consultCouple,
      photo.consultPair,
      photo.bloodPressure,
      { src: carePrimary, alt: "A patient in an unhurried consultation with her provider" },
    ],
  },
  {
    id: "hormone-optimization",
    title: "Hormone Optimization",
    short: "Precision testing for energy, mood, metabolism and sleep.",
    description:
      "Hormone optimization begins with precision testing and a personalized approach. Hormones impact energy, mood, metabolism, sleep and long-term health, so treatment starts with understanding your own physiology.",
    bullets: [
      "Comprehensive hormone evaluation",
      "Testosterone replacement therapy",
      "Bio-identical hormone pellets",
    ],
    images: [
      photo.bloodDraw,
      { src: goalLabs, alt: "A clinician preparing samples in a bright laboratory" },
    ],
  },
  {
    id: "weight-management",
    title: "Weight Management",
    short: "Medically guided, built on labs rather than diet trends.",
    description:
      "A personalized, medically guided approach to body composition that goes far beyond diet alone — metabolism, hormones, nutrition, movement, sleep and lifestyle. Comprehensive lab testing identifies what your body actually needs to respond.",
    bullets: [
      "Comprehensive lab testing and clinical evaluation",
      "Root-cause review: hormones, insulin resistance, inflammation",
      "Ongoing clinical adjustment as results change",
    ],
    images: [
      photo.glp1,
      { src: goalWeight, alt: "A person preparing a fresh, balanced meal in a sunlit kitchen" },
    ],
  },
  {
    id: "peptide-therapy",
    title: "Peptide Therapy",
    short: "Signaling molecules that support recovery, immunity and repair.",
    description:
      "Peptides are short chains of amino acids that act as signaling molecules within the body. They communicate with cells to support repair, recovery, metabolism and immune function.",
    bullets: [
      "Recovery and tissue repair",
      "Metabolic and immune support",
      "Sleep, energy and performance",
    ],
    images: [
      photo.strength,
      { src: goalTreatment, alt: "Clinical treatment supplies on a warm neutral surface" },
    ],
  },
  {
    id: "aesthetic-skinpen",
    title: "SkinPen® Microneedling",
    short: "FDA-cleared microneedling that builds your own collagen.",
    description:
      "SkinPen® microneedling is an FDA-cleared, minimally invasive treatment. Precise, controlled micro-injuries trigger the skin's natural wound-healing response, stimulating new collagen and elastin — the building blocks for smoother, healthier-looking skin.",
    bullets: [
      "Improves fine lines and wrinkles",
      "Reduces acne and surgical scars",
      "Enhances skin texture and tone",
      "Improves sun damage and hyperpigmentation",
    ],
    images: [
      { src: goalHair, alt: "Close-up portrait showing clear, healthy skin in warm daylight" },
      photo.skinpenDevice,
    ],
  },
  {
    id: "piezowave-2",
    title: "PiezoWave 2",
    short: "Focused shockwave therapy for pain and tissue repair.",
    description:
      "An advanced focused shockwave device that stimulates the body's natural healing response. High-energy acoustic waves are directed into tissue to support circulation, repair and pain relief — without surgery or downtime.",
    images: [{ src: goalTools, alt: "Modern clinical equipment in a calm treatment room" }],
  },
  {
    id: "acute-care",
    title: "Acute Care",
    short: "Same-week treatment for sudden illness and minor injury.",
    description:
      "Treatment for sudden illnesses or minor injuries that need prompt attention but are not life-threatening — seen quickly, by a provider who already knows your history.",
    bullets: [
      "Cold, flu and COVID symptoms",
      "Sinus infections and sore throats",
      "Urinary tract infections",
      "Minor cuts, burns or sprains",
      "Rashes and allergic reactions",
    ],
    images: [
      photo.coldFlu,
      photo.sinus,
      { src: careSpecialist, alt: "A provider examining a patient in a bright consultation room" },
    ],
  },
  {
    id: "dutch-test",
    title: "DUTCH Test",
    short: "A complete picture of your hormone and adrenal health.",
    description:
      "The DUTCH (Dried Urine Test for Comprehensive Hormones) Test is a panel of validated tests giving a complete evaluation of hormone and adrenal function, including their metabolites — the detail a standard blood panel misses.",
    images: [{ src: eduPreventive, alt: "Laboratory results being reviewed with a patient" }],
  },
  {
    id: "dot-physical",
    title: "DOT Physicals",
    short: "Certified exams for commercial drivers.",
    description:
      "The medical examination required by the Department of Transportation for commercial motor vehicle drivers, confirming you meet the health requirements to operate a CMV safely. Includes vision, hearing, blood pressure and urine testing.",
    images: [{ src: careMens, alt: "A driver having a routine medical examination" }],
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id)!;

/** What a Direct Primary Care membership includes, from the export. */
export const membership = [
  {
    id: "01",
    title: "Same-day or next-day appointments",
    copy: "Care when you need it, not in three weeks.",
  },
  {
    id: "02",
    title: "Direct access to your provider",
    copy: "Phone, text or email — you reach Kathy, not a call centre.",
  },
  {
    id: "03",
    title: "Extended, unhurried visits",
    copy: "Insurance isn't dictating how long your appointment runs.",
  },
  {
    id: "04",
    title: "Discounted labs and medications",
    copy: "Transparent pricing, with no copays or surprise bills.",
  },
];

/** Hormone and metabolic panels reviewed during an evaluation. */
export const panels = [
  {
    name: "Hormone balance",
    copy: "Estrogen, progesterone and testosterone, with their metabolites.",
  },
  { name: "Adrenal function", copy: "Cortisol patterning across the day, and DHEA." },
  { name: "Thyroid & metabolic", copy: "Thyroid function, glucose and insulin resistance." },
  // { name: "Inflammation", copy: "Markers that quietly stall weight and recovery." },
  { name: "Nutrient status", copy: "Deficiencies that hold results back once treatment starts." },
];

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  /** Short bio for cards — condensed from the full bio in the export. */
  short: string;
  /** A few lines from this person's own bio, for the practice section. */
  excerpt: string;
  /** Full bio, as supplied, for the About page. */
  bio: string[];
};

export const team: TeamMember[] = [
  {
    name: "Kathy Valerie Verdes",
    role: "APRN, A-GNP-C",
    /* Full frame at 1200w: the export's 1200x600 banner crop cut the portrait. */
    image: `${CDN}/IMG_2999.JPG/:/rs=w:1200,cg:true`,
    short:
      "Board-certified Nurse Practitioner specializing in adult primary care, hormone optimization and metabolic health.",
    excerpt:
      "At Thryve Wellness, Kathy focuses on proactive, preventative, and performance-driven healthcare. She is especially sought after for her expertise in hormone optimization and medical weight management, guiding patients toward restored balance, enhanced vitality, and long-term metabolic strength.",
    bio: [
      "Kathy Verdes is a Master's-prepared, board-certified Nurse Practitioner specializing in adult primary care, hormone optimization, and metabolic health. With an extensive background in acute and chronic care, she blends clinical excellence with a highly personalized, concierge-level approach to modern medicine.",
      "Her experience includes years of advanced patient care across diverse medical settings, including her leadership role at Naples Clinic, where she delivered elevated, relationship-centered care to a wide range of patients. This foundation allows her to provide thoughtful, precise treatment plans tailored to each individual's unique physiology and goals.",
      "At Thryve Wellness, Kathy focuses on proactive, preventative, and performance-driven healthcare. She is especially sought after for her expertise in hormone optimization and medical weight management, guiding patients toward restored balance, enhanced vitality, and long-term metabolic strength.",
      "Known for her attention to detail and commitment to excellence, Kathy partners closely with her patients, offering comprehensive diagnostics, customized strategies, and ongoing support in a private, elevated setting.",
    ],
  },
  {
    name: "Dee Calderin",
    role: "NCMA, Licensed Aesthetician",
    image: `${CDN}/A630E891-3CC7-4E38-971F-FFE26F5849DD.jpg/:/rs=w:1200,cg:true`,
    short:
      "Over 20 years in the medical field, spanning phlebotomy, primary care, hormone and allergy practice — and advanced skincare.",
    excerpt:
      "With over 20 years of experience in the medical field, Dee brings a rare combination of clinical expertise and aesthetic artistry to patient care. Her clinical skill set, combined with her calm and welcoming presence, ensures that every patient feels comfortable, confident, and well cared for.",
    bio: [
      "With over 20 years of experience in the medical field, Dee brings a rare combination of clinical expertise and aesthetic artistry to patient care. Her background spans both front and back office operations, giving her a comprehensive understanding of the patient experience — from the first point of contact to hands-on clinical support.",
      "Dee's extensive training includes phlebotomy, primary care, hormone and allergy specialty practice, where she has played an integral role in delivering efficient, compassionate, and detail-oriented care.",
      "As a licensed aesthetician, Dee is passionate about helping patients look and feel their best. She blends her medical knowledge with advanced skincare techniques to support healthy, radiant skin and overall wellness.",
      "Fluent in Spanish, Dee is able to connect with a diverse patient population, ensuring clear communication and a more inclusive, comfortable experience for every individual she serves.",
    ],
  },
  {
    name: "Dan Verdes",
    role: "Office Manager",
    image: `${CDN}/IMG_0465.jpg/:/rs=w:1200,cg:true`,
    short:
      "Oversees daily operations, with formal schooling in mental health and a focus on how the practice actually feels to visit.",
    excerpt:
      "As Office Manager, Dan oversees daily operations with precision and efficiency, ensuring that every aspect of the patient experience — from scheduling to follow-up — is smooth and personalized. His ability to blend organization with empathy plays a key role in delivering a higher level of care.",
    bio: [
      "Dan Verdes brings a strong foundation in both healthcare operations and mental health education, creating a seamless and supportive experience for every patient who walks through the doors of Thryve Wellness.",
      "With formal schooling in mental health, Dan offers a unique perspective that goes beyond traditional office management. He understands the importance of compassion, communication, and creating an environment where patients feel comfortable, respected, and truly cared for.",
      "As Office Manager, Dan oversees daily operations with precision and efficiency, ensuring that every aspect of the patient experience — from scheduling to follow-up — is smooth and personalized.",
    ],
  },
];

/**
 * ⚠️ PLACEHOLDER REVIEWS — NOT REAL PATIENTS. REPLACE BEFORE LAUNCH.
 *
 * The content package contains no patient reviews (see
 * `thryve-content-export/reviews-section-NOTE.txt`), so these are invented
 * names and text standing in for layout purposes only. Publishing fabricated
 * testimonials on a live medical site is unlawful in the US under the FTC's
 * Rule on Consumer Reviews and Testimonials (16 CFR Part 465).
 *
 * Replace this array with real reviews, or point the section at a live source
 * (e.g. the practice's Google reviews) before the site goes public.
 */
export const placeholderReviews = [
  {
    name: "Sarah M.",
    service: "Direct Primary Care",
    rating: 5,
    quote:
      "The first practice where I've never felt rushed. My provider had already read my history before I sat down, and I left with an actual plan.",
  },
  {
    name: "James T.",
    service: "Weight Management",
    rating: 5,
    quote:
      "Six months in and the plan has been adjusted every single time my labs changed. Nothing about it has felt like a fad diet.",
  },
  {
    name: "Priya R.",
    service: "Hormone Optimization",
    rating: 5,
    quote:
      "My energy and sleep had been off for two years. The testing finally explained why, and someone took the time to walk me through the results.",
  },
  {
    name: "Michael D.",
    service: "Membership",
    rating: 5,
    quote:
      "I can text my provider and get an answer the same day. After years of phone trees and waiting rooms, that alone is worth the membership.",
  },
  {
    name: "Elena V.",
    service: "SkinPen® Microneedling",
    rating: 5,
    quote:
      "Three sessions in and my skin texture is genuinely different. I appreciated the honesty about what to expect and how long it would take.",
  },
  {
    name: "Robert K.",
    service: "PiezoWave 2",
    rating: 5,
    quote:
      "Shoulder pain I'd carried for years. A short course of shockwave therapy and I'm back training without thinking about it.",
  },
];

/*
 * Certified partners.
 *
 * The three marks are very different objects — a wide wordmark, a square
 * certification seal, and (for SkinPen) a photograph rather than a logo at
 * all. The About page therefore contains each one inside a fixed-height band
 * instead of scaling it to a shared width, which is what keeps them level
 * with one another.
 */
export const partners = [
  {
    name: "DUTCH Test",
    href: "https://dutchtest.com/",
    image: `${CDN}/IMG_3189.jpg/:/rs=w:692,cg:true`,
  },
  {
    name: "SkinPen®",
    href: "https://skinpen.com/",
    image: `${CDN}/Skin-pen-pic-1536x1098-720e2ed.jpg/:/rs=w:560,cg:true`,
  },
  {
    name: "EvexiPEL",
    href: "https://www.evexias.com/",
    image: `${CDN}/EvexiPEL-Certified-Provider-Seal_%20(2).png/:/rs=w:400,cg:true`,
  },
];

/** SkinPen® detail, for the explainer cards. */
export const skinpen = {
  device: `${CDN}/Skin-pen-pic-1536x1098.jpg/:/rs=w:1400,cg:true`,
  expect:
    "Treatments take 30–45 minutes with minimal downtime. Mild redness, similar to a light sunburn, may last 24–48 hours.",
  why: [
    "Safe for all skin types",
    "FDA-cleared technology",
    "Stimulates natural collagen — no fillers required",
  ],
};
