import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { Stage } from "@/components/3d/Stage";
import { cn } from "@/lib/utils";

import { panels, site } from "@/content/thryve";

const SYSTEMS = panels;

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
    <section id="assessment" className="bg-sand py-12 md:py-16">
      <Container wide>
        <p className="label-mono text-clay">Testing and assessment</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <TextReveal
              className="display-md max-w-[15ch]"
              lines={["Precision testing", "comes first."]}
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              The DUTCH Test evaluates hormone and adrenal function — including their metabolites —
              alongside the panels below. Choose one to see what we review.
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
              <ActionLink href={site.bookingUrl} external>
                Book an assessment
              </ActionLink>
            </div>
          </div>

          <Stage
            load={() => import("@/components/3d/SystemsScene")}
            progress={progress}
            /*
             * The scene is ~4 units wide but only ~2 tall, so the box is
             * kept landscape and the field of view tightened to match —
             * otherwise the composition floats in empty vertical space.
             */
            camera={{ position: [0, 0, 4.2], fov: 33 }}
            className="h-[320px] w-full md:h-[400px] lg:-mr-8 lg:h-[440px] xl:-mr-16"
          />
        </div>
      </Container>
    </section>
  );
}
