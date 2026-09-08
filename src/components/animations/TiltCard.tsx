import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useMediaQuery } from "@/lib/motion";

/**
 * Lightweight spatial treatment for image cards: real perspective tilt plus a
 * layered inner parallax, so photography reads as a 3D object rather than a flat tile.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const canTilt = useMediaQuery("(hover: hover) and (min-width: 768px)");

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = el.current;
    if (!node || reduced || !canTilt) return;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    node.style.setProperty("--rx", `${(-y * intensity).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(x * intensity).toFixed(2)}deg`);
    node.style.setProperty("--px", `${(x * intensity * 1.6).toFixed(2)}px`);
    node.style.setProperty("--py", `${(y * intensity * 1.6).toFixed(2)}px`);
  };

  const reset = () => {
    const node = el.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--px", "0px");
    node.style.setProperty("--py", "0px");
  };

  return (
    <div
      ref={el}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ perspective: "1200px" }}
      className={className}
    >
      <div
        className={cn(
          "h-full transition-transform duration-500 ease-cinematic will-change-transform",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translate3d(var(--px,0px),var(--py,0px),0)]",
          "[transform-style:preserve-3d]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
