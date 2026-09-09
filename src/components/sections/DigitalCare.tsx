
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NodeImage = {
  src: string;
  alt: string;
};

type Point3D = {
  x: number;
  y: number;
  z: number;
};

const NODE_IMAGES: NodeImage[] = [
  {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=700&q=90",
    alt: "Medical laboratory",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=90",
    alt: "Medical diagnostics",
  },
  {
    src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=700&q=90",
    alt: "Medical imaging",
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=90",
    alt: "Heart monitoring",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=90",
    alt: "Clinical diagnostics",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=90",
    alt: "Laboratory testing",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=90",
    alt: "Healthcare diagnostics",
  },
  {
    src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=700&q=90",
    alt: "Laboratory equipment",
  },
];

const CENTER_IMAGE =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=95";

/*
 * STAR TOPOLOGY
 *
 * Every outer node connects directly to the center hub.
 * Positions are intentionally irregular so this does NOT look like
 * an orbit, circle, ellipse, DNA structure, or ring.
 */
const NODE_LAYOUT: Point3D[] = [
  { x: -0.82, y: -0.72, z: 0.25 },
  { x: -0.18, y: -0.94, z: -0.35 },
  { x: 0.76, y: -0.66, z: 0.55 },
  { x: 0.94, y: 0.08, z: -0.15 },
  { x: 0.62, y: 0.82, z: 0.72 },
  { x: -0.08, y: 0.94, z: 0.1 },
  { x: -0.86, y: 0.62, z: -0.45 },
  { x: -0.98, y: -0.02, z: 0.65 },
];

/*
 * Small internal vertices give the network a more technical
 * topology feel without turning it into an orbit.
 */
const INTERNAL_POINTS: Point3D[] = [
  { x: -0.38, y: -0.34, z: 0.5 },
  { x: 0.34, y: -0.38, z: -0.35 },
  { x: 0.42, y: 0.32, z: 0.45 },
  { x: -0.34, y: 0.38, z: -0.2 },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const rotatePoint = (
  point: Point3D,
  rotationY: number,
  rotationX: number,
  rotationZ: number,
) => {
  let { x, y, z } = point;

  // Y rotation
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);

  const rotatedX = x * cosY - z * sinY;
  const rotatedZ = x * sinY + z * cosY;

  x = rotatedX;
  z = rotatedZ;

  // X rotation
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);

  const rotatedY = y * cosX - z * sinX;
  const rotatedZ2 = y * sinX + z * cosX;

  y = rotatedY;
  z = rotatedZ2;

  // Z rotation
  const cosZ = Math.cos(rotationZ);
  const sinZ = Math.sin(rotationZ);

  const rotatedX2 = x * cosZ - y * sinZ;
  const rotatedY2 = x * sinZ + y * cosZ;

  return {
    x: rotatedX2,
    y: rotatedY2,
    z,
  };
};

const projectPoint = (
  point: Point3D,
  rotationY: number,
  rotationX: number,
  rotationZ: number,
  radius: number,
) => {
  const rotated = rotatePoint(
    point,
    rotationY,
    rotationX,
    rotationZ,
  );

  /*
   * Perspective:
   * front = slightly larger
   * back = slightly smaller
   */
  const perspective = 1 + rotated.z * 0.13;

  const x = 50 + rotated.x * radius * perspective;
  const y = 50 + rotated.y * radius * perspective;

  return {
    x,
    y,
    z: rotated.z,
  };
};

export function DigitalCare() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const networkRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const internalLineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const network = networkRef.current;

    if (!section || !network) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /*
       * -----------------------------
       * RESPONSIVE NETWORK SIZE
       * -----------------------------
       */

      const getRadius = () => {
        const width = window.innerWidth;

        if (width < 480) return 34;
        if (width < 768) return 38;
        if (width < 1024) return 41;

        return 43;
      };

      /*
       * -----------------------------
       * NETWORK RENDER
       * -----------------------------
       */

      const renderNetwork = (
        rotationY: number,
        rotationX: number,
        rotationZ: number,
      ) => {
        const radius = getRadius();

        /*
         * Project outer nodes.
         */
        const projectedNodes = NODE_LAYOUT.map((point) =>
          projectPoint(
            point,
            rotationY,
            rotationX,
            rotationZ,
            radius,
          ),
        );

        /*
         * Project internal topology vertices.
         */
        const projectedInternal = INTERNAL_POINTS.map((point) =>
          projectPoint(
            point,
            rotationY,
            rotationX,
            rotationZ,
            radius,
          ),
        );

        /*
         * -----------------------------
         * OUTER IMAGE NODES
         * -----------------------------
         */

        projectedNodes.forEach((point, index) => {
          const node = nodeRefs.current[index];

          if (!node) return;

          const depth = clamp((point.z + 1) / 2, 0, 1);

          const scale = 0.76 + depth * 0.3;
          const opacity = 0.42 + depth * 0.58;

          const brightness = 0.78 + depth * 0.22;

          gsap.set(node, {
            left: `${point.x}%`,
            top: `${point.y}%`,
            xPercent: -50,
            yPercent: -50,
            scale,
            opacity,
            zIndex: Math.round(depth * 100),
            filter: `brightness(${brightness})`,
          });
        });

        /*
         * -----------------------------
         * CENTER CONNECTIONS
         * -----------------------------
         *
         * Every outer node connects to
         * the center hub.
         */
        projectedNodes.forEach((point, index) => {
          const line = lineRefs.current[index];

          if (!line) return;

          const depth = clamp((point.z + 1) / 2, 0, 1);

          gsap.set(line, {
            attr: {
              x1: 50,
              y1: 50,
              x2: point.x,
              y2: point.y,
            },
            opacity: 0.18 + depth * 0.32,
          });
        });

        /*
         * -----------------------------
         * INTERNAL TOPOLOGY
         * -----------------------------
         *
         * Connect outer nodes to nearby
         * internal vertices.
         */
        const internalConnections = [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
          [2, 2],
          [3, 2],
          [4, 2],
          [4, 3],
          [5, 3],
          [6, 3],
          [6, 0],
          [7, 0],
        ];

        internalConnections.forEach(([nodeIndex, internalIndex], index) => {
          const line = internalLineRefs.current[index];

          if (!line) return;

          const node = projectedNodes[nodeIndex];
          const internal = projectedInternal[internalIndex];

          if (!node || !internal) return;

          const depth = clamp(
            ((node.z + internal.z) / 2 + 1) / 2,
            0,
            1,
          );

          gsap.set(line, {
            attr: {
              x1: node.x,
              y1: node.y,
              x2: internal.x,
              y2: internal.y,
            },
            opacity: 0.08 + depth * 0.2,
          });
        });

        /*
         * -----------------------------
         * INTERNAL VERTEX DOTS
         * -----------------------------
         */

        projectedInternal.forEach((point, index) => {
          const dot = dotRefs.current[index];

          if (!dot) return;

          const depth = clamp((point.z + 1) / 2, 0, 1);

          gsap.set(dot, {
            attr: {
              cx: point.x,
              cy: point.y,
              r: 0.45 + depth * 0.45,
            },
            opacity: 0.3 + depth * 0.6,
          });
        });
      };

      /*
       * -----------------------------
       * REDUCED MOTION
       * -----------------------------
       */

      if (reducedMotion) {
        renderNetwork(0, 0, 0);

        return;
      }

      /*
       * -----------------------------
       * CONTINUOUS 3D MOTION
       * -----------------------------
       *
       * Everything except center image moves
       * as one connected network.
       */
      const motion = {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
      };

      const animation = gsap.to(motion, {
        rotationY: Math.PI * 2,
        duration: 26,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const time = gsap.ticker.time;

          const floatingX =
            Math.sin(time * 0.42) * 0.045;

          const floatingZ =
            Math.sin(time * 0.3) * 0.035;

          const rotationX =
            Math.sin(time * 0.52) * 0.12;

          const rotationZ =
            Math.sin(time * 0.31) * 0.035;

          renderNetwork(
            motion.rotationY + floatingZ,
            rotationX,
            rotationZ + floatingX,
          );
        },
      });

      /*
       * -----------------------------
       * CENTER IMAGE BREATHING
       * -----------------------------
       *
       * Center stays stable and does NOT rotate.
       */
      if (centerRef.current) {
        gsap.to(centerRef.current, {
          scale: 1.025,
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      /*
       * -----------------------------
       * SUBTLE SCROLL PARALLAX
       * -----------------------------
       *
       * Independent from network rotation.
       */
      gsap.fromTo(
        network,
        {
          y: 18,
        },
        {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        },
      );

      /*
       * Initial render.
       */
      renderNetwork(0, 0, 0);

      /*
       * Recalculate responsive positions.
       */
      const handleResize = () => {
        renderNetwork(
          motion.rotationY,
          motion.rotationX,
          motion.rotationZ,
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        animation.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f2eb] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          {/* --------------------------------
              CONTENT
          --------------------------------- */}

          <div className="relative z-30 max-w-xl">
            <span className="mb-5 inline-flex items-center rounded-full border border-[#c98055]/20 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#9a6042]">
              Digital care
            </span>

            <h2 className="max-w-lg text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#29231f] sm:text-5xl lg:text-6xl">
              Healthcare that
              <span className="block text-[#b76f4b]">
                connects everything.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-[#665c55] sm:text-lg">
              Your care should feel connected, intelligent, and
              effortless. One digital experience brings your
              treatment, diagnostics, progress, and care team
              together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-[#29231f]/10 bg-white/60 px-4 py-2 text-sm text-[#4d443e]">
                Personalized care
              </div>

              <div className="rounded-full border border-[#29231f]/10 bg-white/60 px-4 py-2 text-sm text-[#4d443e]">
                Smart diagnostics
              </div>

              <div className="rounded-full border border-[#29231f]/10 bg-white/60 px-4 py-2 text-sm text-[#4d443e]">
                Continuous support
              </div>
            </div>
          </div>

          {/* --------------------------------
              STAR TOPOLOGY
          --------------------------------- */}

          <div className="relative flex min-h-[440px] items-center justify-center sm:min-h-[560px] lg:min-h-[680px]">
            <div
              ref={networkRef}
              className="relative aspect-square w-[min(94vw,720px)] max-w-[720px] [perspective:1200px]"
            >
              {/* --------------------------------
                  SOFT BACK GLOW
              --------------------------------- */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c98055]/10 blur-3xl" />

              {/* --------------------------------
                  SVG STAR NETWORK
              --------------------------------- */}

              <svg
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id="topologyGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      stdDeviation="0.5"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* CENTER → OUTER NODE CONNECTIONS */}
                {NODE_LAYOUT.map((_, index) => (
                  <line
                    key={`center-line-${index}`}
                    ref={(element) => {
                      lineRefs.current[index] = element;
                    }}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="50"
                    stroke="#bd805e"
                    strokeWidth="0.28"
                    strokeLinecap="round"
                    filter="url(#topologyGlow)"
                  />
                ))}

                {/* OUTER → INTERNAL CONNECTIONS */}
                {Array.from({ length: 12 }).map((_, index) => (
                  <line
                    key={`internal-line-${index}`}
                    ref={(element) => {
                      internalLineRefs.current[index] = element;
                    }}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="50"
                    stroke="#c98055"
                    strokeWidth="0.18"
                    strokeLinecap="round"
                  />
                ))}

                {/* INTERNAL TOPOLOGY VERTICES */}
                {INTERNAL_POINTS.map((_, index) => (
                  <circle
                    key={`dot-${index}`}
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    cx="50"
                    cy="50"
                    r="0.5"
                    fill="#c98055"
                  />
                ))}
              </svg>

              {/* --------------------------------
                  OUTER IMAGE NODES
              --------------------------------- */}

              {NODE_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  ref={(element) => {
                    nodeRefs.current[index] = element;
                  }}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[76px]
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-white/80
                    bg-white
                    shadow-[0_18px_50px_rgba(62,45,35,0.13)]
                    sm:w-[100px]
                    sm:rounded-[22px]
                    lg:w-[116px]
                  "
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "left, top, transform, opacity",
                  }}
                >
                  <div className="relative aspect-[1.2/1] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2c211c]/10 to-transparent" />
                  </div>
                </div>
              ))}

              {/* --------------------------------
                  CENTER HUB
              --------------------------------- */}

              <div
                ref={centerRef}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-[200]
                  w-[150px]
                  -translate-x-1/2
                  -translate-y-1/2
                  sm:w-[190px]
                  lg:w-[225px]
                "
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <div
                  className="
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white
                    bg-white
                    p-2
                    shadow-[0_30px_80px_rgba(53,38,29,0.2)]
                    sm:rounded-[38px]
                    sm:p-2.5
                  "
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[30px]">
                    <img
                      src={CENTER_IMAGE}
                      alt="Connected digital healthcare"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241b17]/25 via-transparent to-white/5" />

                    <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-white/15 px-3 py-2 backdrop-blur-md">
                      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/90 sm:text-[10px]">
                        Connected care
                      </p>
                    </div>
                  </div>
                </div>

                {/* CENTER NODE DOT */}
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-[#c98055] opacity-0" />
              </div>

              {/* --------------------------------
                  SMALL TOPOLOGY LABEL
              --------------------------------- */}

              <div className="pointer-events-none absolute bottom-[3%] left-1/2 z-[210] -translate-x-1/2 whitespace-nowrap rounded-full border border-[#29231f]/10 bg-white/65 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#776a61] backdrop-blur-md sm:text-[10px]">
                Connected care network
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

