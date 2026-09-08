import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Staggered, blur-to-sharp reveal for a block of children as it enters view.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = 0.12,
  y = 28,
  delay = 0,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  stagger?: number;
  y?: number;
  delay?: number;
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.children) as HTMLElement[];
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [stagger, y, delay, blur]);

  const Component = Tag as "div";

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
