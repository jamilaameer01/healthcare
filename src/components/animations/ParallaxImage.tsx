import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Image that drifts and scales gently as the frame moves through the viewport.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  amount = 12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width: number;
  height: number;
  amount?: number;
  priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    registerGsap();
    const el = frame.current;
    const target = img.current;
    if (!el || !target || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { yPercent: -amount / 2, scale: 1.12 },
        {
          yPercent: amount / 2,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={frame} className={cn("media-depth-drift overflow-hidden bg-linen", className)}>
      <img
        ref={img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cn("size-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
}
