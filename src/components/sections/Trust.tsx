import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

/**
 * The 15-years figure lives in the headline rather than the ledger, so the
 * section has a lead voice instead of four figures competing at one size.
 */
const FIGURES = [
  { value: 25, suffix: "K+", label: "Patients supported" },
  { value: 98, suffix: "%", label: "Patient satisfaction", share: 98 },
  { value: 40, suffix: "+", label: "Specialists" },
];

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const figures = Array.from(el.querySelectorAll<HTMLElement>("[data-figure]"));
    const measure = el.querySelector<HTMLElement>("[data-measure]");

    const settle = () => {
      figures.forEach((node) => (node.textContent = node.dataset["value"] ?? ""));
      if (measure) measure.style.width = `${measure.dataset["share"] ?? 0}%`;
    };

    if (prefersReducedMotion()) {
      settle();
      return;
    }

    const ctx = gsap.context(() => {
      /* One trigger, one timeline: the ledger resolves as a single moment. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      figures.forEach((node, i) => {
        const target = Number(node.dataset["value"] ?? 0);
        const counter = { v: 0 };

        tl.to(
          counter,
          {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = String(Math.round(counter.v));
            },
          },
          i * 0.12,
        );
      });

      if (measure) {
        tl.fromTo(
          measure,
          { width: "0%" },
          {
            width: `${measure.dataset["share"] ?? 0}%`,
            duration: 1.4,
            ease: "power2.out",
          },
          0.12,
        );
      }
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-sand py-16 md:py-24">
      <Container wide>
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="lg:pt-2">
            <p className="label-mono text-clay">The record</p>

            <h2 className="display-md mt-6 max-w-[20ch] text-ink">
              Fifteen years of care in one practice.
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
              Long enough that most of what we know about your health, we learned first-hand.
            </p>
          </div>

          <dl className="lg:pt-1">
            {FIGURES.map((f) => (
              <div key={f.label} className="border-t border-ink/12 py-7 first:border-t-0 lg:py-8">
                <div className="flex items-baseline justify-between gap-8">
                  <dt className="text-sm leading-relaxed text-ink-soft">{f.label}</dt>
                  <dd className="display-md shrink-0 tabular-nums text-ink">
                    <span data-figure data-value={f.value}>
                      0
                    </span>
                    <span className="text-clay">{f.suffix}</span>
                  </dd>
                </div>

                {/*
                  Only the proportion gets a measure — it is the one figure a
                  bar can honestly represent.
                */}
                {f.share ? (
                  <div aria-hidden className="mt-5 h-px w-full bg-ink/12">
                    <div
                      data-measure
                      data-share={f.share}
                      className="h-px bg-clay"
                      style={{ width: 0 }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
