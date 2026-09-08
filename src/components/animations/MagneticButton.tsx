import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Wraps a control and gives it a restrained magnetic pull on pointer move.
 */
export function MagneticButton({
  children,
  strength = 0.22,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      quickX((e.clientX - (r.left + r.width / 2)) * strength);
      quickY((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
