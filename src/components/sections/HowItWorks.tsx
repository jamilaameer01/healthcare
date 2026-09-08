import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";

const STEPS = [
  { id: "01", title: "Tell us what you need", copy: "A short conversation, not a form maze." },
  {
    id: "02",
    title: "Get connected with the right care",
    copy: "Matched to a physician the same week.",
  },
  {
    id: "03",
    title: "Keep moving forward",
    copy: "One record, one plan, reviewed as life changes.",
  },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-step]");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.25, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          },
        );
      });

      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 1 },
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="dark-section py-24 md:py-36">
      <Container wide>
        <TextReveal
          className="display-md max-w-[16ch] text-on-dark"
          lines={["Healthcare,", "without the hassle."]}
        />

        <div className="relative mt-16 md:mt-24">
          <span
            aria-hidden
            className="absolute left-0 top-0 hidden h-full w-px bg-white/15 md:block"
          >
            <span data-progress className="block h-full w-px bg-clay" />
          </span>

          <ol className="md:pl-12 lg:pl-20">
            {STEPS.map((s) => (
              <li
                key={s.id}
                data-step
                className="grid gap-4 border-t border-white/12 py-10 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10 md:py-14"
              >
                <span className="label-mono text-clay-soft">{s.id}</span>
                <h3 className="display-md max-w-[16ch] text-on-dark">{s.title}</h3>
                <p className="max-w-xs text-base leading-relaxed text-on-dark-soft">{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
