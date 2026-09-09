import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Stage } from "@/components/3d/Stage";

const BEATS = [
  {
    title: "A clinician signs every plan",
    copy: "Written and reviewed by a licensed clinician — never generated and sent.",
  },
  {
    title: "Only what the evidence supports",
    copy: "If a treatment doesn't hold up in the research, we won't prescribe it.",
  },
  {
    title: "Safety monitored throughout",
    copy: "Bloodwork and check-ins are scheduled around your treatment, not left to you.",
  },
];

/**
 * Scroll-driven statement on clinical rigour: the treatment field resolves
 * around a single focus as the visitor moves through the section.
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
        end: "+=90%",
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
        className="relative flex min-h-[58vh] items-center py-16 md:min-h-screen md:py-20"
      >
        <Stage
          load={() => import("@/components/3d/SystemsScene")}
          progress={progress}
          camera={{ position: [0, 0, 4.8], fov: 42 }}
          className="pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/70 to-transparent md:to-transparent"
        />
        <Container wide className="relative">
          <p className="label-mono text-clay-soft">Evidence first</p>
          <TextReveal
            className="display-lg mt-8 max-w-[14ch] text-on-dark"
            lines={["Medicine,", "not guesswork."]}
            stagger={0.1}
          />
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-on-dark-soft">
            Every plan starts with what the research actually supports.
          </p>
        </Container>
      </div>

      <Container wide className="relative pb-16 md:pb-20">
        <ul className="grid gap-px overflow-hidden md:grid-cols-3">
          {BEATS.map((b) => (
            <li key={b.title} data-beat className="border-t border-white/12 py-8 pr-8">
              <h3 className="display-sm text-on-dark">{b.title}</h3>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-on-dark-soft">{b.copy}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
