import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { Stage } from "@/components/3d/Stage";
import { cn } from "@/lib/utils";

const SYSTEMS = [
  { name: "Heart & circulation", copy: "Blood pressure, lipids, rhythm and long-term risk." },
  { name: "Metabolic health", copy: "Glucose, thyroid and how your body uses energy." },
  { name: "Sleep & recovery", copy: "Rest quality, fatigue patterns and daytime energy." },

  { name: "Musculoskeletal", copy: "Strength, mobility, pain and injury history." },
  { name: "Mental wellbeing", copy: "Stress, focus and how you actually feel day to day." },
  // { name: "Nutrition", copy: "Diet, deficiencies and practical everyday change." },
];

/**
 * Health assessment visualiser: choosing a system lights up the matching
 * orbital band in the 3D model beside it.
 */
export function HealthAssessment() {
  const [active, setActive] = useState(0);
  const progress = useRef(0);

  const select = (i: number) => {
    setActive(i);
    progress.current = i / (SYSTEMS.length - 1);
  };

  return (
    <section id="assessment" className="bg-sand py-24 md:py-36">
      <Container wide>
        <p className="label-mono text-clay">Your assessment</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <TextReveal
              className="display-md max-w-[15ch]"
              lines={["A full read on", "how you're doing."]}
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Choose a system to see what we look at.
            </p>

            <ul className="mt-10">
              {SYSTEMS.map((s, i) => (
                <li key={s.name} className="rule-line">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    aria-pressed={i === active}
                    className="group flex w-full items-baseline justify-between gap-6 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "display-sm transition-colors duration-500 ease-cinematic",
                        i === active ? "text-clay" : "text-ink",
                      )}
                    >
                      {s.name}
                    </span>
                    <span
                      className={cn(
                        "max-w-[22ch] text-sm leading-relaxed text-ink-soft transition-opacity duration-500 ease-cinematic",
                        i === active ? "opacity-100" : "opacity-0 md:opacity-40",
                      )}
                    >
                      {s.copy}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ActionLink to="/book">Book an assessment</ActionLink>
            </div>
          </div>

          <Stage
            load={() => import("@/components/3d/SystemsScene")}
            progress={progress}
            camera={{ position: [0, 0, 5.2], fov: 42 }}
            className="h-[440px] w-full rounded-xl bg-linen/60 md:h-[500px] lg:h-[540px]"
          />
        </div>
      </Container>
    </section>
  );
}
