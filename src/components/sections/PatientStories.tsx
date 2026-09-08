import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import patient1 from "@/assets/patient-1.jpg";
import patient2 from "@/assets/patient-2.jpg";
import patient3 from "@/assets/care-mens.jpg";

const STORIES = [
  {
    quote: "For the first time, healthcare actually felt designed for me.",
    name: "Claire R.",
    detail: "Patient since 2019",
    image: patient1,
    alt: "Portrait of a patient in warm natural light",
  },
  {
    quote: "One phone call, and someone already knew my history.",
    name: "David L.",
    detail: "Patient since 2016",
    image: patient2,
    alt: "Portrait of a patient smiling by a window",
  },
  {
    quote: "They gave me time. That changed the diagnosis.",
    name: "Marcus T.",
    detail: "Patient since 2021",
    image: patient3,
    alt: "Portrait of a patient at home",
  },
];

export function PatientStories() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${STORIES.length * 70}%`,
        pin: "[data-story-stage]",
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(STORIES.length - 1, Math.floor(self.progress * STORIES.length));
          setActive(i);
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-ink py-24 text-linen md:py-0">
      <div data-story-stage className="md:flex md:min-h-screen md:items-center md:py-24">
        <Container wide>
          <p className="label-mono text-clay">Patient experience</p>
          <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-16">
            <div className="relative md:min-h-[18rem]">
              {STORIES.map((s, i) => (
                <blockquote
                  key={s.name}
                  className={cn(
                    "transition-all duration-700 ease-cinematic md:absolute md:inset-0",
                    i === active
                      ? "opacity-100 md:translate-y-0"
                      : "md:pointer-events-none md:translate-y-6 md:opacity-0",
                    i !== active ? "mt-14 md:mt-0" : "",
                  )}
                >
                  <p className="display-md max-w-[18ch]">“{s.quote}”</p>
                  <footer className="mt-8 text-sm text-ink-soft">
                    {s.name} · {s.detail}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="media-depth-drift relative aspect-4/5 w-full overflow-hidden rounded-lg bg-mist">
              {STORIES.map((s, i) => (
                <img
                  key={s.name}
                  src={s.image}
                  alt={s.alt}
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
      </div>
    </section>
  );
}
