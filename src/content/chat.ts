/**
 * The help widget's script.
 *
 * This is a scripted assistant, not a language model: every line it can say is
 * written here. That is a deliberate constraint for a medical practice — the
 * widget cannot invent a price, a clinical claim, or an opening hour.
 *
 * Facts are pulled from `thryve.ts` rather than retyped, so hours, address,
 * phone and the service list cannot drift out of step with the rest of the
 * site. Anything the content export does not state — current membership
 * pricing, most of all — is answered by handing the visitor to the phone
 * instead of guessing.
 */

import { services, site } from "@/content/thryve";

export type ChatTopic = {
  id: string;
  /** Lowercase substrings that route a typed message to this topic. */
  keywords: string[];
  /** One paragraph per line. */
  reply: string[];
};

export const greeting = [
  `Hi, and welcome to ${site.name}.`,
  "I can help with our services, opening hours, membership and booking an appointment. How can I help you?",
];

export const topics: ChatTopic[] = [
  {
    id: "services",
    keywords: [
      "service",
      "treat",
      "offer",
      "what do you do",
      "help with",
      "primary care",
      "dpc",
      "hormone",
      "weight",
      "peptide",
      "piezowave",
      "shockwave",
      "dutch",
      "dot",
      "physical",
      "acute",
      "sick",
      /* PiezoWave 2 is our pain and tissue-repair service, so a general
         "do you treat pain" belongs here rather than at the handover. */
      "pain",
    ],
    reply: [
      `We combine modern medicine with advanced therapies under one roof in ${site.city}:`,
      services.map((s) => s.title).join(" · "),
      "You can read the full detail for each on our medical services and aesthetic services pages, or call us on " +
        site.phone +
        " and we will point you to the right one.",
    ],
  },
  {
    id: "aesthetics",
    keywords: [
      "aesthetic",
      "skin",
      "skinpen",
      "microneedl",
      "collagen",
      "wrinkle",
      "scar",
      "acne",
      "facial",
      "botox",
      "filler",
    ],
    reply: [
      "Our aesthetic work is regenerative rather than cosmetic. We offer SkinPen® microneedling — an FDA-cleared, minimally invasive treatment that prompts your skin to build its own collagen and elastin.",
      "Treatments take 30–45 minutes with minimal downtime. Mild redness, similar to a light sunburn, may last 24–48 hours, and a series is often recommended for best results. It is performed here by our licensed aesthetician.",
      "We do not currently offer injectables such as Botox or fillers.",
    ],
  },
  {
    id: "hours",
    keywords: [
      "hour",
      "open",
      "close",
      "when",
      "where",
      "location",
      "address",
      "direction",
      "park",
      "find you",
      "naples",
      "weekend",
      "saturday",
      "sunday",
    ],
    reply: [
      `We are at ${site.address.join(", ")}, with parking on site.`,
      site.hours.map((h) => `${h.day}: ${h.time}`).join("\n"),
    ],
  },
  {
    id: "membership",
    keywords: [
      "member",
      "price",
      "pricing",
      "cost",
      "fee",
      "how much",
      "afford",
      "monthly",
      "subscription",
      "join",
      "sign up",
    ],
    reply: [
      "Our Direct Primary Care model runs on one simple monthly membership fee rather than billing insurance per visit. That covers same-day or next-day appointments, extended unhurried visits, direct phone, text or email access to your provider, and discounted labs and medications — with no copays and no surprise bills.",
      `I do not have the current fee to hand, and I would rather not quote you the wrong number. Call us on ${site.phone} and we will walk you through exactly what membership costs and what it includes.`,
    ],
  },
  {
    id: "insurance",
    keywords: [
      "insurance",
      "insured",
      "medicare",
      "medicaid",
      "copay",
      "claim",
      "coverage",
      "bill",
    ],
    reply: [
      "Direct Primary Care is a membership model, so we do not bill insurance for each visit. Instead of copays and per-visit claims, you pay one monthly fee and your provider's time is not dictated by an insurer.",
      `Because the details depend on your own situation, the fastest answer is a quick call to ${site.phone}.`,
    ],
  },
  {
    id: "booking",
    keywords: [
      "book",
      "appoint",
      "schedul",
      "availab",
      "slot",
      "reserve",
      "consult",
      "visit",
      "see someone",
      "new patient",
    ],
    reply: [
      "New patients are welcome. You can book instantly through the online scheduler — the Book now button at the top of any page — and it confirms straight away.",
      `Or call us on ${site.phone} during opening hours and we will find you a time.`,
    ],
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "phone",
      "call",
      "number",
      "email",
      "fax",
      "reach",
      "speak",
      "instagram",
      "facebook",
      "tiktok",
      "social",
    ],
    reply: [
      `Phone ${site.phone}, fax ${site.fax}. The phone is answered at the practice, not by a call centre.`,
      "You can also send us a message from the contact page, or find us on Instagram, Facebook and TikTok.",
    ],
  },
];

/**
 * What the assistant says when a typed message matches nothing it knows.
 *
 * It names the limitation rather than pretending: a scripted assistant that
 * bluffs is worse than one that hands over.
 */
export const fallback: ChatTopic = {
  id: "fallback",
  keywords: [],
  reply: [
    "I only know a few things — our services, hours, membership and booking — and that one is outside them, so I would rather not guess.",
    `Call us on ${site.phone} and someone at the practice will give you a proper answer.`,
  ],
};

/**
 * The reply to an attached file.
 *
 * Nothing is uploaded: the practice has no secure intake for patient records,
 * and a chat widget is the wrong place to send lab results or clinical photos.
 * The file stays in the visitor's browser and the assistant says so plainly.
 */
export const fileReply: ChatTopic = {
  id: "file",
  keywords: [],
  reply: [
    "Thank you, but I cannot receive files here — nothing you attach is sent to the practice, and a website chat is not a secure place for medical records or photos.",
    `Please bring anything like that to your appointment, or call us on ${site.phone} and we will tell you the safe way to send it.`,
  ],
};

/*
 * Anything clinical goes straight to a human. Checked before topic matching,
 * so "I have chest pain" can never be answered with opening hours.
 */
const URGENT = [
  "emergency",
  "chest pain",
  "can't breathe",
  "cant breathe",
  "breathing",
  "bleeding",
  "suicid",
  "overdose",
  "stroke",
  "unconscious",
  "911",
];

/** Asking for advice, whatever the wording around it. Always a handover. */
const ADVICE = [
  "diagnos",
  "should i take",
  "should i stop",
  "is it safe",
  "safe for me",
  "safe to take",
  "dose",
  "dosage",
  "side effect",
  "prescri",
  "my results",
  "test result",
  "what's wrong with me",
  "whats wrong with me",
  "do i have",
  "pregnan",
];

/*
 * A symptom word alone is not a handover: "do you treat back pain" is a fair
 * question about PiezoWave, and answering it with "I can't give medical
 * advice" is both unhelpful and slightly absurd. It becomes a handover only
 * when the visitor is describing their own body.
 */
const FIRST_PERSON = [
  "i have",
  "i've got",
  "ive got",
  "i feel",
  "i am having",
  "i'm having",
  "im having",
  "do i need",
  "my ",
];

const SYMPTOM = [
  "symptom",
  "hurts",
  "pain",
  "rash",
  "fever",
  "infect",
  "swollen",
  "lump",
  "dizzy",
  "nausea",
];

export const urgent: ChatTopic = {
  id: "urgent",
  keywords: [],
  reply: [
    "If this is an emergency, call 911 or go to your nearest emergency room now.",
    `Otherwise please call us on ${site.phone} and speak to someone directly.`,
  ],
};

export const clinical: ChatTopic = {
  id: "clinical",
  keywords: [],
  reply: [
    "I am not able to give medical advice — that needs a provider who knows your history, and I am a website assistant.",
    `Please call us on ${site.phone} and we will get you to the right person.`,
  ],
};

/**
 * Route a typed message.
 *
 * Safety checks run first, then the topic whose keyword match is longest —
 * length as the tie-break, so "insurance" beats a bare "in" and a message
 * mentioning two topics lands on the more specific one.
 */
export function matchTopic(input: string): ChatTopic {
  const text = input.toLowerCase().trim();
  if (!text) return fallback;

  if (URGENT.some((k) => text.includes(k))) return urgent;
  if (ADVICE.some((k) => text.includes(k))) return clinical;
  if (FIRST_PERSON.some((k) => text.includes(k)) && SYMPTOM.some((k) => text.includes(k))) {
    return clinical;
  }

  let best: ChatTopic | undefined;
  let bestLength = 0;

  for (const topic of topics) {
    for (const keyword of topic.keywords) {
      if (text.includes(keyword) && keyword.length > bestLength) {
        best = topic;
        bestLength = keyword.length;
      }
    }
  }

  return best ?? fallback;
}
