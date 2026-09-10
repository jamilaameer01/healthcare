import { useEffect, useRef, type CSSProperties } from "react";
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
  imgStyle,
  width,
  height,
  amount = 12,
  zoom = 1.12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Crop focus for the frame — see `focal` in `@/content/imageFocus`. */
  imgStyle?: CSSProperties;
  width: number;
  height: number;
  amount?: number;
  /** Starting scale for the drift. Lower it when the frame already crops hard. */
  zoom?: number;
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
        { yPercent: -amount / 2, scale: zoom },
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
  }, [amount, zoom]);

  return (
    <div ref={frame} className={cn("media-depth-drift overflow-hidden bg-linen", className)}>
      <img
        ref={img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={imgStyle}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cn("size-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
}
