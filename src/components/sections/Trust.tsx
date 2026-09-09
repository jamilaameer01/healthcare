import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { partners, services } from "@/content/thryve";

/*
 * Figures are counted from the practice's own services and certifications —
 * the content package contains no patient statistics, and none are invented
 * here.
 */
const FIGURES = [
  { value: services.length, suffix: "", label: "Medical and aesthetic services" },
  { value: 20, suffix: "+", label: "Years of clinical experience on the team" },
  { value: partners.length, suffix: "", label: "Certified treatment partners" },
];

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const figures = Array.from(el.querySelectorAll<HTMLElement>("[data-figure]"));

    const settle = () => {
      figures.forEach((node) => (node.textContent = node.dataset["value"] ?? ""));
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
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-sand py-16 md:py-24">
      <Container wide>
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="lg:pt-2">
            <p className="label-mono text-clay">The practice</p>

            <h2 className="display-md mt-6 max-w-[20ch] text-ink">
              Concierge-level care, in one private practice.
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
              Certified through the partners whose testing and technology we use, so treatment
              decisions rest on validated results rather than guesswork.
            </p>

            {/*
              The supplied marks have opaque backgrounds and one is a device
              photo, so each sits on its own white tile rather than bare on
              the sand ground.
            */}
            <ul className="mt-10 flex flex-wrap gap-4">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full w-[136px] flex-col items-center gap-3 rounded-lg border border-line bg-white p-4 transition-colors duration-500 ease-cinematic hover:border-clay/40"
                  >
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-12 w-full object-contain"
                    />
                    <span className="text-center text-xs leading-snug text-ink-soft transition-colors duration-500 group-hover:text-ink">
                      {p.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className="lg:pt-1">
            {FIGURES.map((f) => (
              <div key={f.label} className="border-t border-ink/12 py-7 first:border-t-0 lg:py-8">
                <div className="flex items-baseline justify-between gap-4 sm:gap-8">
                  <dt className="max-w-[24ch] text-sm leading-relaxed text-ink-soft">{f.label}</dt>
                  <dd className="display-md shrink-0 tabular-nums text-ink">
                    <span data-figure data-value={f.value}>
                      0
                    </span>
                    <span className="text-clay">{f.suffix}</span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
