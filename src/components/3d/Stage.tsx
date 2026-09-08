import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useHydrated, useReducedMotion, useMediaQuery } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Canvas = lazy(() => import("@react-three/fiber").then((m) => ({ default: m.Canvas })));

export type SceneQuality = "high" | "low";

export type SceneProps = {
  quality: SceneQuality;
  progress: { current: number };
  pointer: { current: { x: number; y: number } };
};

type StageProps = {
  /** Lazily imported scene module, so three.js only ships when the section is reached. */
  load: () => Promise<{ default: ComponentType<SceneProps> }>;
  progress?: { current: number };
  className?: string;
  /** Rendered before the canvas mounts, and permanently for reduced motion. */
  fallback?: ReactNode;
  camera?: { position: [number, number, number]; fov: number };
};

/**
 * Hydration-, viewport- and preference-aware WebGL mount point.
 * Nothing is downloaded or rendered until the section is close to the viewport.
 */
export function Stage({
  load,
  progress,
  className,
  fallback = null,
  camera = { position: [0, 0, 5], fov: 38 },
}: StageProps) {
  const host = useRef<HTMLDivElement>(null);
  const localProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);

  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const quality: SceneQuality = isDesktop ? "high" : "low";

  useEffect(() => {
    const el = host.current;
    if (!el || !hydrated || reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated, reduced]);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    void load().then((m) => {
      if (alive) setScene(() => m.default);
    });
    return () => {
      alive = false;
    };
  }, [visible, load]);

  useEffect(() => {
    if (!visible || !isTablet) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [visible, isTablet]);

  const showCanvas = hydrated && !reduced && Scene !== null;

  return (
    <div ref={host} className={cn("relative", className)}>
      {fallback}
      {showCanvas ? (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <Canvas
              dpr={[1, quality === "high" ? 1.75 : 1.25]}
              camera={camera}
              gl={{
                antialias: quality === "high",
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <Scene quality={quality} progress={progress ?? localProgress} pointer={pointer} />
            </Canvas>
          </div>
        </Suspense>
      ) : null}
    </div>
  );
}
