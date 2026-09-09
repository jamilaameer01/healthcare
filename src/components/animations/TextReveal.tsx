import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Masked line-by-line reveal for headlines. Each line slides up from behind a clip.
 */
export function TextReveal({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.1,
  immediate = false,
}: {
  /** Plain strings, or nodes when a line needs its own emphasis colour. */
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-reveal-line]");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          stagger,
          ease: "power3.out",
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [delay, stagger, immediate]);

  const Component = Tag as "h2";

  return (
    <Component ref={ref as never} className={cn(className)}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em]">
          <span data-reveal-line className="block" style={{ opacity: 0 }}>
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}
