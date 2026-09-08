import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: 15, suffix: "+", label: "Years of care" },
  { value: 25, suffix: "K+", label: "Patients supported" },
  { value: 98, suffix: "%", label: "Patient satisfaction" },
  { value: 40, suffix: "+", label: "Specialists" },
];

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-stat]"));
    if (prefersReducedMotion()) {
      nodes.forEach((n) => (n.textContent = n.dataset["value"] ?? ""));
      return;
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = Number(node.dataset["value"] ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.v));
          },
        });
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-sand py-24 md:py-32">
      <Container wide>
        <p className="label-mono text-clay">In numbers</p>
        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rule-line py-8 pr-6 lg:py-10">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display-md flex items-baseline tabular-nums">
                  <span data-stat data-value={s.value}>
                    0
                  </span>
                  <span>{s.suffix}</span>
                </span>
                <span className="mt-4 block text-sm text-ink-soft">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
