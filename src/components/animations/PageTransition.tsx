import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, PAGE_INTRO_MS, prefersReducedMotion } from "@/lib/motion";

/**
 * Subtle enter transition applied whenever the route path changes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: PAGE_INTRO_MS / 1000,
        ease: "power3.out",
        // A lingering transform on the page wrapper would break position: fixed
        // for every pinned section, so it is cleared once the intro finishes.
        onComplete: () => gsap.set(el, { clearProps: "transform,willChange" }),
      },
    );
    return () => {
      tween.kill();
      gsap.set(el, { clearProps: "opacity,transform" });
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
