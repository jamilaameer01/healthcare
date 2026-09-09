import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion, registerGsap, useMediaQuery } from "@/lib/motion";

import treatment from "@/assets/goal-treatment.jpg";
import weight from "@/assets/goal-weight.jpg";
import labs from "@/assets/goal-labs.jpg";
import hair from "@/assets/goal-hair.jpg";
import hormone from "@/assets/care-primary.jpg";
import wellness from "@/assets/care-wellness.jpg";
import float from "@/assets/treatment-float.png";
import texture from "@/assets/texture-1.jpg";

export type TreatmentScene = {
  id: string;
  category: string;
  name: string;
  statement: string;
  cta: string;
  main: string;
  mainAlt: string;
  aside: string;
  asideAlt: string;
  /** Distinct spatial recipe so no two scenes read the same. */
  shape: {
    mainRotate: [number, number, number];
    asideOffset: [number, number];
    accent: string;
    blobClass: string;
    mainClass: string;
  };
};

const SCENES: TreatmentScene[] = [
  {
    id: "treatment",
    category: "Clinician-led treatment",
    name: "Care that arrives with you.",
    statement: "Reviewed by a clinician, delivered discreetly, adjusted as your results change.",
    cta: "Start a consultation",
    main: treatment,
    mainAlt: "An amber medication bottle and plain carton on a warm ivory surface",
    aside: float,
    asideAlt: "Unbranded treatment pen and capsules",
    shape: {
      mainRotate: [3, -8, -1.5],
      asideOffset: [26, -18],
      accent: "var(--clay)",
      blobClass: "left-[6%] top-[14%] size-[46vmin] rounded-[46%_54%_38%_62%]",
      mainClass: "w-[68%] max-w-[640px] aspect-[4/5] rounded-[2.5rem]",
    },
  },
  {
    id: "weight",
    category: "Weight management",
    name: "Progress, built around you.",
    statement: "A plan shaped by your health, habits and goals — with treatment when it fits.",
    cta: "Explore weight care",
    main: weight,
    mainAlt: "A person preparing a fresh balanced meal in a sunlit kitchen",
    aside: texture,
    asideAlt: "Soft warm texture study",
    shape: {
      mainRotate: [-4, 9, 1.5],
      asideOffset: [-28, 20],
      accent: "var(--accent)",
      blobClass: "right-[8%] bottom-[10%] size-[52vmin] rounded-[62%_38%_58%_42%]",
      mainClass: "w-[78%] max-w-[820px] aspect-[16/10] rounded-[2rem]",
    },
  },
  {
    id: "labs",
    category: "Assessments and labs",
    name: "Clear answers. Earlier.",
    statement: "Focused testing turns the signals in your body into a plan you can act on.",
    cta: "Book an assessment",
    main: labs,
    mainAlt: "A clinician preparing a sample in a warm, modern laboratory",
    aside: float,
    asideAlt: "Unbranded treatment objects floating",
    shape: {
      mainRotate: [5, 6, -2.5],
      asideOffset: [30, 24],
      accent: "var(--clay)",
      blobClass: "left-[12%] bottom-[16%] size-[40vmin] rounded-full",
      mainClass: "w-[62%] max-w-[560px] aspect-square rounded-[3rem]",
    },
  },
  {
    id: "hair",
    category: "Hair health",
    name: "Keep what feels like you.",
    statement: "Guided care designed around your pattern, progress and pace.",
    cta: "Explore hair care",
    main: hair,
    mainAlt: "Close-up editorial portrait showing healthy hair",
    aside: texture,
    asideAlt: "Soft warm texture study",
    shape: {
      mainRotate: [-2, -10, 2],
      asideOffset: [-32, -16],
      accent: "var(--accent)",
      blobClass: "right-[14%] top-[12%] size-[44vmin] rounded-[38%_62%_47%_53%]",
      mainClass: "w-[58%] max-w-[520px] aspect-[3/4] rounded-[999px]",
    },
  },
  {
    id: "hormone",
    category: "Hormone health",
    name: "Understand what changed.",
    statement: "Thoughtful testing and expert review for energy, metabolism and long-term health.",
    cta: "Explore hormone care",
    main: hormone,
    mainAlt: "A patient having a focused conversation with a clinician",
    aside: float,
    asideAlt: "Unbranded treatment objects floating",
    shape: {
      mainRotate: [4, 11, -1],
      asideOffset: [24, -26],
      accent: "var(--clay)",
      blobClass: "left-[8%] top-[18%] size-[50vmin] rounded-[54%_46%_35%_65%]",
      mainClass: "w-[74%] max-w-[760px] aspect-[16/11] rounded-[2.25rem]",
    },
  },
  {
    id: "wellness",
    category: "Ongoing wellness",
    name: "Feel better, for longer.",
    statement: "Nutrition, sleep and movement support that stays with you beyond one appointment.",
    cta: "Explore wellness",
    main: wellness,
    mainAlt: "A person stretching in a sunlit room",
    aside: texture,
    asideAlt: "Soft warm texture study",
    shape: {
      mainRotate: [-5, -7, 1],
      asideOffset: [-26, 22],
      accent: "var(--accent)",
      blobClass: "right-[10%] bottom-[14%] size-[48vmin] rounded-[60%_40%_55%_45%]",
      mainClass: "w-[70%] max-w-[700px] aspect-[5/4] rounded-[2.75rem]",
    },
  },
];

export function TreatmentSequence() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const reduced = prefersReducedMotion();
    const depth = isDesktop ? 1 : 0.55;

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");

      // Static, readable fallback for reduced motion.
      if (reduced) {
        gsap.set(stages, { opacity: 1, position: "relative" });
        return;
      }

      gsap.set(stages, { opacity: 0 });
      gsap.set(stages[0]!, { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${SCENES.length * (isDesktop ? 120 : 100)}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          /*
           * This section pins and sits above another pinned section
           * (PatientStories). The earlier pin must be measured first,
           * or the later one inherits a stale start and pins while this
           * one is still fixed — the two then overlap on screen.
           */
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              SCENES.length - 1,
              Math.floor(self.progress * SCENES.length + 0.0001),
            );
            setActive(i);
          },
        },
      });

      stages.forEach((stage, i) => {
        const bg = stage.querySelector<HTMLElement>("[data-layer='bg']")!;
        const blob = stage.querySelector<HTMLElement>("[data-layer='blob']")!;
        const main = stage.querySelector<HTMLElement>("[data-layer='main']")!;
        const aside = stage.querySelector<HTMLElement>("[data-layer='aside']");
        const chips = gsap.utils.toArray<HTMLElement>("[data-layer='chip']", stage);
        const rot = SCENES[i]!.shape.mainRotate;
        const off = SCENES[i]!.shape.asideOffset;
        const t = i;

        // Scene 01 — assembled composition
        tl.fromTo(
          stage,
          { opacity: i === 0 ? 1 : 0 },
          { opacity: 1, duration: 0.18 },
          Math.max(0, t - 0.18),
        )
          .fromTo(
            main,
            { z: -260 * depth, rotateY: rot[1] * 1.6, rotateX: rot[0], scale: 0.86, yPercent: 6 },
            { z: 0, rotateY: 0, rotateX: 0, scale: 1, yPercent: 0, duration: 0.3 },
            Math.max(0, t - 0.18),
          )
          .fromTo(
            bg,
            { z: -700 * depth, scale: 1.25, opacity: 0 },
            { z: -420 * depth, scale: 1.12, opacity: 1, duration: 0.3 },
            Math.max(0, t - 0.18),
          )

          // Scene 02 — deconstruction: layers pull apart along Z
          .to(bg, { z: -900 * depth, scale: 1.3, duration: 0.42 }, t + 0.02)
          .to(
            main,
            {
              z: 180 * depth,
              rotateX: rot[0],
              rotateY: rot[1],
              rotateZ: rot[2],
              xPercent: -6,
              duration: 0.42,
            },
            t + 0.02,
          )
          .to(
            blob,
            { z: -520 * depth, xPercent: 18, yPercent: -12, rotate: 28, duration: 0.42 },
            t + 0.02,
          );

        if (aside) {
          tl.fromTo(
            aside,
            {
              z: 60 * depth,
              xPercent: off[0] * 0.45,
              yPercent: off[1] * 0.45,
              rotate: 0,
              opacity: 0.9,
            },
            {
              z: 380 * depth,
              xPercent: off[0],
              yPercent: off[1],
              rotate: rot[2] * 8,
              opacity: 1,
              duration: 0.42,
            },
            t + 0.02,
          );
        }
        chips.forEach((chip, ci) => {
          tl.to(
            chip,
            {
              z: (120 + ci * 90) * depth,
              xPercent: (ci % 2 === 0 ? 1 : -1) * (30 + ci * 14),
              yPercent: (ci % 2 === 0 ? -1 : 1) * (22 + ci * 10),
              rotate: (ci % 2 === 0 ? 1 : -1) * 24,
              duration: 0.42,
            },
            t + 0.02,
          );
        });

        // Scene 03 — transformation: the arrangement re-forms
        tl.to(
          main,
          {
            rotateY: -rot[1] * 1.4,
            rotateX: -rot[0] * 0.6,
            rotateZ: -rot[2],
            z: 60 * depth,
            xPercent: 5,
            scale: 1.04,
            duration: 0.28,
          },
          t + 0.5,
        )
          .to(blob, { xPercent: -14, yPercent: 10, rotate: -20, duration: 0.28 }, t + 0.5)

          // Scene 04 — hand-off into the next treatment
          .to(
            main,
            { z: 520 * depth, scale: 1.18, opacity: 0, rotateY: rot[1] * 0.5, duration: 0.24 },
            t + 0.8,
          )
          .to(bg, { opacity: 0, scale: 1.4, duration: 0.24 }, t + 0.82)
          .to(stage, { opacity: i === SCENES.length - 1 ? 1 : 0, duration: 0.2 }, t + 0.84);

        if (aside) tl.to(aside, { opacity: 0, z: 620 * depth, duration: 0.22 }, t + 0.8);
        if (chips.length) tl.to(chips, { opacity: 0, duration: 0.2 }, t + 0.8);
      });
    }, el);

    return () => ctx.revert();
  }, [isDesktop]);

  const scene = SCENES[active]!;

  return (
    <section
      id="treatment"
      aria-label="Treatments"
      className="relative bg-ivory"
      style={{ ["--seq-accent" as string]: scene.shape.accent }}
    >
      <div ref={root} className="relative z-20 h-svh overflow-hidden">
        {/*
          ---------- 3D visual space ----------

          On desktop the stage starts to the right of the copy column,
          so the composition fills the empty right side instead of
          sitting centred underneath the type.
        */}
        <div className="seq-space absolute inset-y-0 left-0 right-0 md:left-[28%]">
          {SCENES.map((s) => (
            <div key={s.id} data-stage className="seq-stage absolute inset-0">
              <div
                data-layer="bg"
                aria-hidden
                className="absolute inset-0 opacity-0"
                style={{
                  backgroundImage: `radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, ${s.shape.accent} 16%, transparent), transparent 70%)`,
                }}
              />
              <div
                data-layer="blob"
                aria-hidden
                className={cn("absolute blur-[2px] opacity-70", s.shape.blobClass)}
                style={{
                  background: `linear-gradient(140deg, color-mix(in oklab, ${s.shape.accent} 34%, transparent), transparent 72%)`,
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <figure
                  data-layer="main"
                  className={cn(
                    "seq-plate relative overflow-hidden bg-linen max-md:!w-[88%]",
                    s.shape.mainClass,
                  )}
                >
                  <img
                    src={s.main}
                    alt={s.mainAlt}
                    loading="lazy"
                    width={1200}
                    height={1400}
                    className="size-full object-cover"
                  />
                </figure>
              </div>

              <div className="absolute inset-0 hidden items-center justify-center md:flex">
                <img
                  data-layer="aside"
                  src={s.aside}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  width={520}
                  height={520}
                  className="seq-aside w-[26%] max-w-[280px] rounded-[1.75rem] object-contain"
                />
              </div>

              <span
                data-layer="chip"
                aria-hidden
                className="absolute left-[18%] top-[26%] hidden size-16 rounded-full border border-ink/15 bg-ivory/70 backdrop-blur-sm md:block"
              />
              <span
                data-layer="chip"
                aria-hidden
                className="absolute right-[20%] bottom-[24%] hidden h-10 w-28 rounded-full border border-ink/15 bg-ivory/60 md:block"
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] md:hidden"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--ivory) 94%, transparent) 12%, color-mix(in oklab, var(--ivory) 42%, transparent) 52%, transparent 82%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[58%] md:block"
          style={{
            background:
              "linear-gradient(to right, color-mix(in oklab, var(--ivory) 92%, transparent) 0%, color-mix(in oklab, var(--ivory) 70%, transparent) 42%, transparent 100%)",
          }}
        />

        {/* ---------- flat 2D typography ---------- */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28">
          <div className="flex items-start justify-between gap-6">
            <p className="label-mono text-clay">Treatments</p>
            <p className="label-mono text-ink-soft">
              {String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </p>
          </div>

          <div key={scene.id} className="max-w-xl animate-fade-in">
            <p className="label-mono text-ink-soft">{scene.category}</p>
            <h2 className="display-lg mt-4 text-ink">{scene.name}</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              {scene.statement}
            </p>
            <div className="pointer-events-auto mt-7">
              <ActionLink to="/book" className="min-h-11 px-5 text-sm">
                {scene.cta}
              </ActionLink>
            </div>
          </div>

          <div className="mt-8 flex gap-2" aria-hidden>
            {SCENES.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-px flex-1 origin-left transition-all duration-500 ease-cinematic",
                  i <= active ? "bg-ink/60" : "bg-ink/15",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
