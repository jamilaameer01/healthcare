import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import weight from "@/assets/goal-weight.jpg";
import hair from "@/assets/goal-hair.jpg";
import labs from "@/assets/goal-labs.jpg";
import preventive from "@/assets/care-primary.jpg";
import wellness from "@/assets/care-wellness.jpg";

const OPTIONS = [
  {
    id: "weight",
    label: "Lose weight",
    headline: "A plan your body agrees with.",
    copy: "Clinical review, nutrition support and treatment where it helps — adjusted month by month.",
    cta: "Start weight care",
    image: weight,
    alt: "A person preparing a fresh balanced meal in a sunlit kitchen",
    tone: "bg-ivory",
  },
  {
    id: "hair",
    label: "Keep my hair",
    headline: "Act early. Keep more.",
    copy: "An honest assessment of what's happening and the treatments that actually have evidence.",
    cta: "Start hair care",
    image: hair,
    alt: "A person with healthy hair in warm window light",
    tone: "bg-sand",
  },
  {
    id: "hormones",
    label: "Balance my hormones",
    headline: "Energy, mood, sleep — measured.",
    copy: "Full hormone panels read by a clinician, with a plan instead of a printout.",
    cta: "Test my levels",
    image: labs,
    alt: "A clinician handling sample vials in a bright laboratory",
    tone: "bg-linen",
  },
  {
    id: "preventive",
    label: "Stay ahead",
    headline: "Find it early. Stay ahead.",
    copy: "Annual review, screening and risk mapping, planned in years rather than visits.",
    cta: "Plan a review",
    image: preventive,
    alt: "A clinician and patient reviewing a health plan together",
    tone: "bg-ivory",
  },
  {
    id: "wellness",
    label: "Feel better day to day",
    headline: "Small changes, held in place.",
    copy: "Nutrition, sleep, movement and mental health, planned as one programme.",
    cta: "Explore wellness",
    image: wellness,
    alt: "A person stretching in a sunlit room",
    tone: "bg-clay-soft/40",
  },
];

export function CareFinder() {
  const [active, setActive] = useState(0);
  const current = OPTIONS[active]!;

  return (
    <section
      id="discover"
      className={cn("py-10 transition-colors duration-700 ease-cinematic", current.tone)}
    >
      <Container wide>
        <TextReveal
          className="display-md mx-auto max-w-[18ch] text-center text-ink"
          lines={[
            <>
              What are you <span className="text-clay">looking for?</span>
            </>,
          ]}
        />

        <div className="mx-auto mt-12 grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ul className="border-t border-ink/12">
              {OPTIONS.map((o, i) => (
                <li key={o.id} className="border-b border-ink/12">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "display-sm transition-all duration-500 ease-cinematic",
                        i === active ? "translate-x-2 text-ink" : "text-ink/45",
                      )}
                    >
                      {o.label}
                    </span>
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full transition-all duration-500",
                        i === active ? "bg-clay" : "bg-transparent",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10 max-w-lg">
              <h3 key={`h-${current.id}`} className="display-sm animate-fade-in">
                {current.headline}
              </h3>
              <p
                key={`p-${current.id}`}
                className="mt-4 animate-fade-in leading-relaxed text-ink-soft"
              >
                {current.copy}
              </p>
              <div key={`c-${current.id}`} className="mt-8 animate-fade-in">
                <ActionLink to="/book">{current.cta}</ActionLink>
              </div>
            </div>
          </div>

          <div className="media-depth-drift relative aspect-4/3 w-full overflow-hidden rounded-lg bg-linen sm:mx-auto sm:max-w-[420px] lg:aspect-5/4 lg:max-h-[460px] lg:max-w-[580px]">
            {OPTIONS.map((o, i) => (
              <img
                key={o.id}
                src={o.image}
                alt={o.alt}
                loading="lazy"
                width={1200}
                height={1500}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-all duration-[900ms] ease-cinematic",
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
