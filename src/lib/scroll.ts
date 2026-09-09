import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/*
 * The live Lenis instance, owned here so navigation, in-page links and the
 * mobile menu can all drive the scroll Lenis controls.
 *
 * This matters: Lenis writes the scroll position every frame from its own
 * target. Anything that moves the page behind its back — a native `#anchor`
 * jump, `window.scrollTo`, `body { overflow: hidden }` — is either overridden
 * on the next frame or fought over, which reads as a jump that stalls and
 * snaps back. So every programmatic move goes through here.
 */
let lenis: Lenis | null = null;

/** Called by `SmoothScroll` as the instance comes and goes. */
export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** The fixed header's settled height, so an anchor doesn't land under it. */
const headerOffset = () => (window.innerWidth >= 768 ? 80 : 72);

/** Scroll to an element id through Lenis, falling back to native scrolling. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: -headerOffset() });
    return;
  }

  // Reduced motion, or before Lenis has started.
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - headerOffset(),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/**
 * Freeze the page behind an overlay. `body { overflow: hidden }` alone does
 * not stop Lenis — it keeps scrolling the window programmatically — so the
 * page drifts under an open menu and is somewhere else when it closes.
 */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}
