import { useEffect, useRef } from "react";
import { ActionLink } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

export type VisualTreatment = {
  number: string;
  eyebrow: string;
  title: string;
  statement: string;
  image: string;
  alt: string;
  imagePosition?: string;
  tone?: "light" | "dark";
  align?: "left" | "right";
  size?: "wide" | "contained";
  cta?: string;
};

export function VisualTreatmentPanel({ treatment }: { treatment: VisualTreatment }) {
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = panel.current;
    if (!el || prefersReducedMotion()) return;

    const image = el.querySelector<HTMLElement>("[data-treatment-image]");
    const content = el.querySelector<HTMLElement>("[data-treatment-content]");
    const rule = el.querySelector<HTMLElement>("[data-treatment-rule]");
    if (!image || !content || !rule) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(8% 0% 8% 0%)", y: 56, rotateX: 2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          rotateX: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        content.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        },
      );

      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: treatment.align === "right" ? "right center" : "left center",
          scrollTrigger: { trigger: el, start: "top 68%", once: true },
        },
      );

      gsap.fromTo(
        image,
        { scale: 1.08, yPercent: -3 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [treatment.align]);

  const light = treatment.tone === "light";

  return (
    <article
      ref={panel}
      className={cn(
        "treatment-panel group relative isolate min-h-[72svh] overflow-hidden rounded-lg bg-linen [perspective:1200px] md:min-h-[76vh]",
        treatment.size === "contained" ? "w-full lg:w-[86%]" : "w-full",
        treatment.align === "right" && treatment.size === "contained" ? "lg:ml-auto" : "",
      )}
    >
      <img
        data-treatment-image
        src={treatment.image}
        alt={treatment.alt}
        width={1600}
        height={1100}
        loading="lazy"
        className={cn(
          "absolute inset-0 size-full object-cover will-change-transform transition-[filter] duration-700 ease-cinematic group-hover:saturate-[1.06]",
          treatment.imagePosition,
        )}
      />
      <div
        className={cn("absolute inset-0", light ? "treatment-scrim-light" : "treatment-scrim-dark")}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex min-h-[52%] flex-col justify-end p-6 sm:p-9 md:p-12 lg:p-16",
          treatment.align === "right" ? "items-end text-right" : "items-start text-left",
          light ? "text-ink" : "text-on-dark",
        )}
      >
        <div data-treatment-content className="w-full max-w-2xl">
          <div
            className={cn(
              "mb-5 flex items-center gap-3",
              treatment.align === "right" ? "justify-end" : "justify-start",
            )}
          >
            <span className="label-mono">Treatment {treatment.number}</span>
            <span aria-hidden className="size-1 rounded-full bg-current opacity-60" />
            <span className="text-xs font-medium">{treatment.eyebrow}</span>
          </div>
          <h3 className="display-treatment max-w-[12ch]">{treatment.title}</h3>
          <p
            className={cn(
              "mt-5 max-w-md text-sm leading-relaxed sm:text-base",
              treatment.align === "right" ? "ml-auto" : "",
              light ? "text-ink-soft" : "text-on-dark-soft",
            )}
          >
            {treatment.statement}
          </p>
          <div className={cn("mt-7", treatment.align === "right" ? "flex justify-end" : "")}>
            <ActionLink
              to="/book"
              variant={light ? "solid" : "onDark"}
              className="min-h-11 px-5 text-sm"
            >
              {treatment.cta ?? "Explore treatment"}
            </ActionLink>
          </div>
          <span
            data-treatment-rule
            aria-hidden
            className={cn(
              "mt-8 block h-px w-full origin-left",
              light ? "bg-ink/25" : "bg-on-dark/35",
            )}
          />
        </div>
      </div>
    </article>
  );
}
