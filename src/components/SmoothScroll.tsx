import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useRouterState } from "@tanstack/react-router";
import {
  gsap,
  PAGE_INTRO_MS,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/motion";
import { scrollToId, setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in
 * sync. Disabled entirely when the user prefers reduced motion.
 *
 * Also owns where a navigation lands: route changes and `#anchor` links are
 * scrolled through Lenis rather than by the browser — see `@/lib/scroll`.
 */
export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const target = hash.replace(/^#/, "");
    const previous = lastPath.current;
    lastPath.current = pathname;

    /*
     * Same page: the layout is already settled and measured, so a click on an
     * in-page link has to answer immediately rather than after the wait below.
     */
    if (previous === pathname) {
      if (target) scrollToId(target);
      return;
    }

    /*
     * A new page, on the other hand, cannot be measured yet: the intro still
     * holds a transform on the wrapper, so every pinned section below would
     * take its start from the wrong place and the scroll would fight itself
     * for the rest of the page. Re-measure first, then land on the anchor.
     */
    const settle = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (target) scrollToId(target);
    }, PAGE_INTRO_MS + 60);

    return () => window.clearTimeout(settle);
  }, [pathname, hash]);

  return null;
}
