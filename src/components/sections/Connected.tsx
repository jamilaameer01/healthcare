import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Stage } from "@/components/3d/Stage";

const BEATS = [
  {
    title: "Everything is measured together",
    copy: "Sleep, bloodwork, movement, mood — reviewed as one picture, not four appointments.",
  },
  {
    title: "One record, one team",
    copy: "Your clinicians see the same history, so you never repeat your story.",
  },
  {
    title: "Care that adapts",
    copy: "Your plan is revisited as results change, not once a year.",
  },
];

/**
 * Scroll-driven storytelling: fragments resolve into a connected network of
 * health signals as the visitor moves through the section.
 */
export function Connected() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=180%",
        pin: "[data-connected-stage]",
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-beat]").forEach((beat) => {
        gsap.fromTo(
          beat,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: beat, start: "top 88%", once: true },
          },
        );
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="dark-section relative overflow-hidden">
      <div
        data-connected-stage
        className="relative flex min-h-[70vh] items-center py-24 md:min-h-screen md:py-32"
      >
        <Stage
          load={() => import("@/components/3d/NetworkScene")}
          progress={progress}
          camera={{ position: [0, 0, 6.4], fov: 40 }}
          className="pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/70 to-transparent md:to-transparent"
        />
        <Container wide className="relative">
          <p className="label-mono text-clay-soft">The whole picture</p>
          <TextReveal
            className="display-lg mt-8 max-w-[14ch] text-on-dark"
            lines={["Your health", "is connected."]}
            stagger={0.1}
          />
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-on-dark-soft">
            We treat the system, not the symptom.
          </p>
        </Container>
      </div>

      <Container wide className="relative pb-24 md:pb-36">
        <ul className="grid gap-px overflow-hidden md:grid-cols-3">
          {BEATS.map((b) => (
            <li key={b.title} data-beat className="border-t border-white/12 py-10 pr-8">
              <h3 className="display-sm text-on-dark">{b.title}</h3>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-on-dark-soft">{b.copy}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
