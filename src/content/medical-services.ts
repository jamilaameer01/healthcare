/**
 * Full medical-services content, generated from the client's export
 * (`thryve-content-export/medical-services.json`). Text is the client's own,
 * with the export's mis-encoded dashes repaired.
 *
 * Five supplied images are deliberately absent: three carried posters of a
 * body in underwear, one a reproductive-anatomy chart, and one showed a bare
 * torso. Brand marks and product shots are flagged `contain` so they are
 * never cropped.
 */

export type ServicePart =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type ServiceItem = {
  title?: string;
  image?: string;
  fit?: "cover" | "contain";
  parts?: ServicePart[];
};

export type MedicalService = {
  id: string;
  title: string;
  description: string;
  symptoms?: string[];
  items: ServiceItem[];
};

/** Look up one category. */
export const medicalServiceById = (id: string) =>
  medicalServices.find((s) => s.id === id)!;

/** First usable image for a category, with its fit. */
export const leadImage = (s: MedicalService) => {
  const item = s.items.find((i) => i.image);
  return item ? { src: item.image!, fit: item.fit ?? "cover" } : undefined;
};

/**
 * A short lead-in for cards and the home-page section: the opening sentence
 * of the category description rather than the whole passage.
 */
export const lead = (s: MedicalService, max = 180) => {
  if (s.description.length <= max) return s.description;
  const cut = s.description.slice(0, max);
  const stop = cut.lastIndexOf(". ");
  return stop > 90 ? cut.slice(0, stop + 1) : `${cut.trimEnd()}…`;
};

export const medicalServices: MedicalService[] =[
  {
    "id": "direct-primary-care",
    "title": "Direct Primary Care (DPC)",
    "description": "Primary Care is the foundation of your healthcare journey. It is comprehensive, ongoing medical care focused on prevention, early detection, diagnosis, and management of both acute and chronic conditions.",
    "items": [
      {
        "title": "Direct Primary Care (DPC)",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_47_09%20PM.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "p",
            "text": "Direct Primary Care is a modern approach to healthcare built on access, relationship, and transparency. Instead of billing insurance for every visit, patients pay a simple monthly membership fee — giving them unlimited access to their provider with no copays, no surprise bills, and no rushed appointments."
          },
          {
            "type": "p",
            "text": "This model allows your provider to focus on what truly matters: YOU."
          }
        ]
      },
      {
        "title": "What DPC Includes",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_57_22%20PM.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "list",
            "items": [
              "Same-day or next-day appointments",
              "Extended, unhurried visits",
              "Direct phone, text, or email access to your provider",
              "Comprehensive primary care services",
              "Preventative care and wellness planning",
              "Chronic disease management",
              "Sick visits and urgent needs",
              "Discounted labs and medications"
            ]
          }
        ]
      },
      {
        "title": "Benefits",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_49_03%20PM.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "p",
            "text": "Because insurance is not dictating visit length or treatment decisions, care becomes personal, proactive, and relationship-driven. Your provider has the time to understand your history, goals, and long-term health plan — not just treat symptoms."
          },
          {
            "type": "p",
            "text": "DPC is ideal for individuals, families, and small business owners who want consistent access to a trusted provider without the frustrations of traditional healthcare."
          },
          {
            "type": "p",
            "text": "It's healthcare the way it was meant to be accessible & centered entirely around you."
          }
        ]
      }
    ]
  },
  {
    "id": "acute-care",
    "title": "Acute Care",
    "description": "Acute care focuses on the treatment of sudden illnesses or minor injuries that need prompt attention but are not life-threatening.",
    "items": [
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/image0-d89c6db.png/:/rs=w:1400,cg:true",
        "fit": "cover"
      },
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/image0-d49ad1b.png/:/rs=w:1400,cg:true",
        "fit": "cover"
      },
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_51_19%20PM.png/:/rs=w:1400,cg:true",
        "fit": "cover"
      }
    ],
    "symptoms": [
      "Cold, flu, and COVID symptoms",
      "Sinus infections and sore throats",
      "Ear infections",
      "Urinary tract infections",
      "Minor cuts, burns, or sprains",
      "Rashes and allergic reactions",
      "Fever, nausea, vomiting, or diarrhea"
    ]
  },
  {
    "id": "dot-physical",
    "title": "DOT",
    "description": "A DOT physical is a medical examination that is required by the Department of Transportation for commercial motor vehicle (CMV) drivers to ensure that they are physically and mentally fit to operate a commercial vehicle. The purpose of the DOT physical is to ensure that drivers meet certain health requirements to operate a CMV safely. The medical exam may include tests for vision, hearing, blood pressure, and urine tests.",
    "items": [
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/65C91CB2-FD2D-414C-A76C-67B49DFAF3D3.PNG/:/rs=w:1400,cg:true",
        "fit": "cover"
      }
    ]
  },
  {
    "id": "weight-management",
    "title": "Weight Management",
    "description": "Weight management is a personalized, medically guided approach to achieving and maintaining a healthy body composition. It goes far beyond diet alone — focusing on metabolism, hormones, nutrition, movement, sleep, and overall lifestyle optimization.",
    "items": [
      {
        "title": "Medically Guided Weight Loss",
        "parts": [
          {
            "type": "p",
            "text": "This isn't a fad. This isn't guesswork. This is science-backed transformation."
          },
          {
            "type": "p",
            "text": "Medically guided weight loss is a personalized, strategic approach designed to address the root causes of weight gain — not just the symptoms. Hormones, metabolism, insulin resistance, inflammation, stress, sleep, and nutrient deficiencies all play a role. When one system is off, results stall. Through comprehensive lab testing and clinical evaluation, we identify what your body needs to respond effectively."
          }
        ]
      },
      {
        "title": "Comprehensive Lab Testing and Clinical Evaluation",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/image0-33bd881.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "list",
            "items": [
              "Metabolic and hormone optimization",
              "GLP-1 or other medical therapies when appropriate",
              "Targeted supplementation",
              "Nutrition strategy tailored to your physiology",
              "Lifestyle and strength-support protocols"
            ]
          },
          {
            "type": "p",
            "text": "This is not starvation. This is not one-size-fits-all. This is precision medicine designed around you."
          }
        ]
      },
      {
        "title": "The goal",
        "parts": [
          {
            "type": "p",
            "text": "The goal isn't just a lower number on the scale — it's improved body composition, balanced hormones, better energy, stabilized blood sugar, reduced inflammation, and restored confidence."
          },
          {
            "type": "p",
            "text": "Because sustainable weight loss happens when your body is working with you — not against you."
          },
          {
            "type": "p",
            "text": "Stronger. Leaner. Healthier. For the long term."
          }
        ]
      }
    ]
  },
  {
    "id": "peptide-therapy",
    "title": "Peptide Therapy",
    "description": "Peptides are short chains of amino acids — the building blocks of proteins — that act as powerful signaling molecules within the body. They communicate with cells to trigger specific biological responses, helping to regulate processes such as metabolism, tissue repair, hormone production, immune function, and fat loss.",
    "items": [
      {
        "title": "What Peptides Can Support",
        "parts": [
          {
            "type": "p",
            "text": "As we age, natural peptide production declines, which can impact recovery, body composition, energy, and overall performance. Peptide therapy uses targeted, prescription-grade peptides to support and enhance these natural functions in a precise and individualized way. What Peptides can support:"
          },
          {
            "type": "list",
            "items": [
              "Improved muscle tone and fat metabolism",
              "Enhanced recovery and injury healing",
              "Increased energy and stamina",
              "Sleep quality",
              "Immune system support",
              "Cognitive performance",
              "Skin and collagen health",
              "Hormone optimization"
            ]
          }
        ]
      },
      {
        "title": "How Treatment Works",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/image0-8c78b61.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "p",
            "text": "Peptides are typically administered through small subcutaneous injections or oral formulations, depending on the specific peptide and your goals. Treatment always begins with a comprehensive evaluation and, when appropriate, lab work to ensure a customized and safe protocol."
          }
        ]
      },
      {
        "title": "Why Patients Choose Peptide Therapy",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2002_14_25%20PM.png/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "p",
            "text": "Peptides work with your body — not against it. Instead of forcing a system to respond unnaturally, they enhance specific biological pathways already present in the body, making them a targeted and progressive approach to performance, longevity, and whole-body optimization."
          },
          {
            "type": "p",
            "text": "Our approach focuses on science-backed protocols, medical supervision, and personalized treatment plans designed to help you look, feel, and perform at your highest level."
          }
        ]
      }
    ]
  },
  {
    "id": "hormone-optimization",
    "title": "Hormone Optimization",
    "description": "At Thryve, hormone optimization begins with precision testing and a personalized approach. Hormones impact everything — energy, mood, metabolism, sleep, libido, mental clarity, muscle tone, and overall vitality. When levels are out of balance, even slightly, you feel it.",
    "items": [
      {
        "title": "Comprehensive Hormone Evaluation",
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/CA6A4428-7C01-45B1-B66D-B3700B7481F3.PNG/:/rs=w:1400,cg:true",
        "fit": "cover",
        "parts": [
          {
            "type": "p",
            "text": "Our comprehensive hormone evaluation includes detailed bloodwork to assess key markers such as:"
          },
          {
            "type": "list",
            "items": [
              "Testosterone (total & free)",
              "Estrogen & progesterone",
              "DHEA",
              "Thyroid panel (TSH, Free T3, Free T4, Reverse T3)",
              "Cortisol",
              "Insulin & metabolic markers",
              "Vitamin D and essential nutrient levels"
            ]
          },
          {
            "type": "p",
            "text": "This in-depth testing allows us to identify imbalances, deficiencies, and early signs of dysfunction — not just treat symptoms."
          },
          {
            "type": "p",
            "text": "After reviewing your results, we create a customized plan tailored to your goals and physiology."
          }
        ]
      },
      {
        "title": "Testosterone Replacement Therapy",
        "parts": [
          {
            "type": "p",
            "text": "Injectable testosterone replacement therapy is a highly effective treatment designed to restore optimal testosterone levels in men experiencing symptoms of deficiency. As testosterone naturally declines with age, many men notice fatigue, weight gain, low libido, decreased muscle mass, brain fog, irritability, and reduced performance."
          }
        ]
      },
      {
        "title": "Bio-Identical Pellet",
        "parts": [
          {
            "type": "p",
            "text": "Bioidentical hormone pellets are a safe, effective, and convenient way to restore hormonal balance and optimize how you feel every day. Made from plant-derived compounds that are structurally identical to the hormones your body naturally produces, these pellets provide consistent, steady dosing — eliminating the ups and downs often experienced with creams, pills, or injections."
          },
          {
            "type": "p",
            "text": "Once inserted, the pellets gradually release hormones over 3–4 months."
          }
        ]
      }
    ]
  },
  {
    "id": "piezowave-2",
    "title": "Piezo Wave 2",
    "description": "The PiezoWave 2 is an advanced focused shockwave therapy device designed to stimulate the body's natural healing response. Using high-energy acoustic waves, it targets precise areas of pain or tissue dysfunction without surgery, injections, or downtime.",
    "items": [
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/csm_PiezoWave2_720_405px_a3476023c0%20(1).jpg/:/rs=w:1400,cg:true",
        "fit": "contain",
        "parts": [
          {
            "type": "p",
            "text": "The device delivers focused sound waves deep into injured or inflamed tissue."
          },
          {
            "type": "p",
            "text": "How It Works"
          },
          {
            "type": "p",
            "text": "These waves:"
          },
          {
            "type": "list",
            "items": [
              "Increase blood flow",
              "Stimulate collagen production",
              "Activate stem cell response",
              "Break down scar tissue and calcifications",
              "Reduce chronic inflammation"
            ]
          },
          {
            "type": "p",
            "text": "This regenerative process promotes faster healing and long-term tissue repair rather than simply masking pain."
          },
          {
            "type": "list",
            "items": [
              "Chronic tendonitis",
              "Plantar fasciitis",
              "Shoulder, hip, knee",
              "Calcifications",
              "Erectile dysfunction (low-intensity protocol)"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "dutch-test",
    "title": "DUTCH (Dried Urine Test for Comprehensive Hormones)",
    "description": "The DUTCH (Dried Urine Test for Comprehensive Hormones) Test is a panel of validated tests that provide a complete evaluation of sex and adrenal hormones, including metabolites. Through comprehensive reporting, unparalleled clinical support and education, and peer-reviewed, validated research, DUTCH Providers have the tools and support they need to help solve their patients' complex hormone-related issues.",
    "items": [
      {
        "image": "https://img1.wsimg.com/isteam/ip/f0f8b0ea-42a5-4042-94cc-1824291818a6/IMG_3191.PNG/:/rs=w:1400,cg:true",
        "fit": "contain",
        "parts": [
          {
            "type": "p",
            "text": "We have a variety of panels that measure sex hormones, adrenal hormones, organic acids, cortisol, and sex hormone mapping across the menstrual cycle. We also offer the DUTCH Complete™, which is a bundle that includes the sex hormone, adrenal, and organic acid panels; the DUTCH Plus®, which is a DUTCH Complete™ plus the DUTCH CAR (Cortisol Awakening Response); and DUTCH Cycle Mapping™ PLUS which combines DUTCH Cycle Mapping™ with the DUTCH CAR."
          }
        ]
      }
    ]
  }
];
