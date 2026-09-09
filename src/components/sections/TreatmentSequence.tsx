import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ui/ActionButton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { gsap, registerGsap, useMediaQuery, useReducedMotion } from "@/lib/motion";

import {
  lead,
  leadImage,
  medicalServiceById,
  type MedicalService,
} from "@/content/medical-services";

export type TreatmentScene = {
  id: string;
  /** Heading, copy and imagery all come from the medical service. */
  service: MedicalService;
  name: string;
  /** Distinct spatial recipe so no two scenes read the same. */
  shape: {
    mainRotate: [number, number, number];
    accent: string;
    blobClass: string;
    mainClass: string;
  };
};

/* One scene per medical service, keeping each scene's distinct spatial recipe. */
const SCENES: TreatmentScene[] = [
  {
    id: "dpc",
    service: medicalServiceById("direct-primary-care"),
    name: "Healthcare the way it was meant to be.",
    shape: {
      mainRotate: [3, -8, -1.5],
      accent: "var(--clay)",
      blobClass: "left-[6%] top-[14%] size-[46vmin] rounded-[46%_54%_38%_62%]",
      mainClass: "w-[62%] max-w-[620px] aspect-[4/3] rounded-[2.25rem]",
    },
  },
  {
    id: "weight",
    service: medicalServiceById("weight-management"),
    name: "Progress, built around you.",
    shape: {
      mainRotate: [-4, 9, 1.5],
      accent: "var(--accent)",
      blobClass: "right-[8%] bottom-[10%] size-[52vmin] rounded-[62%_38%_58%_42%]",
      mainClass: "w-[70%] max-w-[720px] aspect-[4/3] rounded-[2rem]",
    },
  },
  {
    id: "hormone",
    service: medicalServiceById("hormone-optimization"),
    name: "Understand what changed.",
    shape: {
      mainRotate: [5, 6, -2.5],
      accent: "var(--clay)",
      blobClass: "left-[12%] bottom-[16%] size-[40vmin] rounded-full",
      mainClass: "w-[56%] max-w-[560px] aspect-[4/3] rounded-[2.5rem]",
    },
  },
  {
    id: "peptides",
    service: medicalServiceById("peptide-therapy"),
    name: "Signals your body already knows.",
    shape: {
      mainRotate: [-2, -10, 2],
      accent: "var(--accent)",
      blobClass: "right-[14%] top-[12%] size-[44vmin] rounded-[38%_62%_47%_53%]",
      mainClass: "w-[60%] max-w-[600px] aspect-[4/3] rounded-[2.75rem]",
    },
  },
  {
    id: "piezowave",
    service: medicalServiceById("piezowave-2"),
    name: "Healing, focused precisely.",
    shape: {
      mainRotate: [4, 11, -1],
      accent: "var(--clay)",
      blobClass: "left-[8%] top-[18%] size-[50vmin] rounded-[54%_46%_35%_65%]",
      mainClass: "w-[64%] max-w-[660px] aspect-[4/3] rounded-[2rem]",
    },
  },
  {
    id: "acute",
    service: medicalServiceById("acute-care"),
    name: "Seen quickly, by someone who knows you.",
    shape: {
      mainRotate: [-5, -7, 1],
      accent: "var(--accent)",
      blobClass: "right-[10%] bottom-[14%] size-[48vmin] rounded-[60%_40%_55%_45%]",
      mainClass: "w-[66%] max-w-[680px] aspect-[4/3] rounded-[2.5rem]",
    },
  },
];

/**
 * How long each treatment holds the stage before handing off. Every duration
 * in the choreography below is a fraction of this, so the whole sequence
 * speeds up or slows down from this one number.
 */
const SCENE_MS = 2400;

export function TreatmentSequence() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /** Bumped on every hand-off so the timer and the progress bar stay in step. */
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();

  /*
   * The sequence plays itself instead of being scrubbed by the scroll, and
   * it is no longer pinned — scrolling moves straight on to the next
   * section while the loop keeps running behind it.
   *
   * Below md the sequence is replaced by a stacked list, so nothing here
   * needs to run at all.
   */
  const playing = isDesktop && inView && !reduced;

  // Only advance while the section is actually on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || !isDesktop) return;

    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      threshold: 0.35,
    });
    io.observe(el);

    return () => io.disconnect();
  }, [isDesktop]);

  // Restart the turn cleanly when the section comes back into view.
  useEffect(() => {
    if (playing) setCycle((c) => c + 1);
  }, [playing]);

  /*
   * A chained timeout rather than an interval: a manual jump bumps `cycle`
   * and so restarts the wait, instead of inheriting a part-spent tick.
   */
  useEffect(() => {
    if (!playing) return;

    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % SCENES.length);
      setCycle((c) => c + 1);
    }, SCENE_MS);

    return () => window.clearTimeout(id);
  }, [playing, cycle]);

  // Depth choreography for whichever treatment currently holds the stage.
  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || !isDesktop) return;

    const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", el);
    const stage = stages[active];
    if (!stage) return;

    const bg = stage.querySelector<HTMLElement>("[data-layer='bg']")!;
    const blob = stage.querySelector<HTMLElement>("[data-layer='blob']")!;
    const main = stage.querySelector<HTMLElement>("[data-layer='main']")!;
    const chips = gsap.utils.toArray<HTMLElement>("[data-layer='chip']", stage);
    const rot = SCENES[active]!.shape.mainRotate;

    // Crossfade: the outgoing scene sinks away under the incoming one.
    stages.forEach((s, i) => {
      gsap.to(s, {
        opacity: i === active ? 1 : 0,
        duration: reduced ? 0 : (SCENE_MS / 1000) * 0.26,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    });

    // Static, readable fallback for reduced motion.
    if (reduced) {
      gsap.set(bg, { opacity: 1, clearProps: "transform" });
      gsap.set(blob, { opacity: 0.7, clearProps: "transform" });
      gsap.set([main, ...chips], { opacity: 1, clearProps: "transform" });
      return;
    }

    const secs = SCENE_MS / 1000;
    /* Entrances take a share of the turn, so they keep pace with SCENE_MS. */
    const settle = secs * 0.42;
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl
      // Assemble: the plate arrives out of depth and squares up.
      .fromTo(
        main,
        {
          z: -260,
          rotateX: rot[0],
          rotateY: rot[1] * 1.6,
          rotateZ: rot[2] * 0.4,
          scale: 0.86,
          xPercent: 0,
          yPercent: 6,
          opacity: 0,
        },
        {
          z: 40,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          duration: settle,
          ease: "power3.out",
        },
        0,
      )
      // Then drift toward the viewer for the rest of its turn.
      .to(
        main,
        {
          z: 170,
          rotateX: rot[0] * 0.4,
          rotateY: rot[1] * 0.5,
          rotateZ: rot[2] * 0.6,
          xPercent: -4,
          scale: 1.05,
          duration: secs - settle,
          ease: "sine.inOut",
        },
        settle,
      )
      .fromTo(
        bg,
        { z: -700, scale: 1.25, opacity: 0 },
        { z: -440, scale: 1.12, opacity: 1, duration: secs * 0.4, ease: "power2.out" },
        0,
      )
      .to(bg, { z: -880, scale: 1.28, duration: secs * 0.6, ease: "sine.inOut" }, secs * 0.4)
      .fromTo(
        blob,
        { z: -420, xPercent: 0, yPercent: 0, rotate: 0, opacity: 0 },
        { opacity: 0.7, duration: secs * 0.34, ease: "power2.out" },
        0,
      )
      .to(
        blob,
        { z: -540, xPercent: 16, yPercent: -10, rotate: 22, duration: secs, ease: "sine.inOut" },
        0,
      );

    chips.forEach((chip, ci) => {
      tl.fromTo(
        chip,
        { z: 0, xPercent: 0, yPercent: 0, rotate: 0, opacity: 0 },
        { opacity: 1, duration: secs * 0.3, ease: "power2.out" },
        secs * 0.05 * ci,
      ).to(
        chip,
        {
          z: 110 + ci * 80,
          xPercent: (ci % 2 === 0 ? 1 : -1) * (26 + ci * 12),
          yPercent: (ci % 2 === 0 ? -1 : 1) * (18 + ci * 9),
          rotate: (ci % 2 === 0 ? 1 : -1) * 20,
          duration: secs,
          ease: "sine.inOut",
        },
        0,
      );
    });

    return () => {
      tl.kill();
    };
  }, [active, isDesktop, reduced]);

  const scene = SCENES[active]!;

  const goTo = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section
      id="treatment"
      aria-label="Treatments"
      className="relative bg-ivory"
      style={{ ["--seq-accent" as string]: scene.shape.accent }}
    >
      {/*
        ---------- mobile: stacked list ----------

        The 3D sequence needs a tall viewport and a hover-free pointer to read
        at all; on a phone the copy landed on top of the plate. Below md the
        same content is a plain scrollable list instead.
      */}
      <div className="md:hidden">
        <Container wide className="py-14">
          <p className="label-mono text-clay">Medical services</p>

          <div className="mt-8 space-y-12">
            {SCENES.map((s) => {
              const picture = leadImage(s.service);

              return (
                <article key={s.id}>
                  <div
                    className={cn(
                      "w-full overflow-hidden rounded-lg",
                      picture?.fit === "contain"
                        ? "flex aspect-16/9 items-center justify-center border border-line bg-white p-5"
                        : "aspect-4/3 bg-linen",
                    )}
                  >
                    <img
                      src={picture?.src}
                      alt={s.service.title}
                      loading="lazy"
                      width={1400}
                      height={1050}
                      className={
                        picture?.fit === "contain"
                          ? "max-h-full w-auto max-w-full object-contain"
                          : "size-full object-cover object-top"
                      }
                    />
                  </div>

                  <h3 className="display-sm mt-5">{s.service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{lead(s.service)}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-12">
            <ActionLink to="/services" className="w-full">
              View all services
            </ActionLink>
          </div>
        </Container>
      </div>

      {/* ---------- desktop: auto-playing 3D sequence ---------- */}
      <div ref={root} className="relative z-20 hidden h-svh overflow-hidden md:block">
        {/*
          ---------- 3D visual space ----------

          On desktop the stage starts to the right of the copy column,
          so the composition fills the empty right side instead of
          sitting centred underneath the type.
        */}
        <div className="seq-space absolute inset-y-0 left-0 right-0 md:left-[28%]">
          {SCENES.map((s) => (
            <div key={s.id} data-stage className="seq-stage absolute inset-0 opacity-0">
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
                    /*
                     * The plate is capped in height so it cannot outgrow the
                     * stage as the loop drifts it toward the viewer.
                     */
                    "seq-plate relative max-h-[58svh] overflow-hidden max-md:!w-[88%] max-md:max-h-[46svh]",
                    leadImage(s.service)?.fit === "contain"
                      ? "flex items-center justify-center bg-white p-8"
                      : "bg-linen",
                    s.shape.mainClass,
                  )}
                >
                  <img
                    src={leadImage(s.service)?.src}
                    alt={s.service.title}
                    loading="lazy"
                    width={1400}
                    height={1050}
                    className={cn(
                      leadImage(s.service)?.fit === "contain"
                        ? "max-h-full w-auto max-w-full object-contain"
                        : /* anchor to the top so faces stay in frame */
                          "size-full object-cover object-top",
                    )}
                  />
                </figure>
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
            <p className="label-mono text-clay">Medical services</p>
            <p className="label-mono text-ink-soft">
              {String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </p>
          </div>

          <div key={scene.id} className="max-w-xl animate-fade-in">
            {/* The service's own title is the heading, with a short lead-in. */}
            <h2 className="display-lg text-ink">{scene.service.title}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              {lead(scene.service)}
            </p>
            <div className="pointer-events-auto mt-7">
              <ActionLink to="/services" className="min-h-11 px-5 text-sm">
                View all services
              </ActionLink>
            </div>
          </div>

          {/*
            The bar used to track scroll progress; now it tracks the
            auto-play and doubles as a way to jump between treatments —
            the only way through the set when motion is reduced.
          */}
          <div className="pointer-events-auto mt-8 flex gap-2">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={s.service.title}
                aria-current={i === active}
                className="group relative h-6 flex-1 cursor-pointer"
              >
                <span
                  className={cn(
                    "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden bg-ink/15 transition-colors duration-500 ease-cinematic",
                    i !== active && "group-hover:bg-ink/40",
                  )}
                >
                  {i === active && (
                    /*
                     * Keyed on the cycle so the fill restarts with the
                     * timer; with the timer stopped it simply sits full.
                     */
                    <span
                      key={cycle}
                      className="absolute inset-0 origin-left bg-ink/60"
                      style={
                        playing
                          ? { animation: `seq-progress ${SCENE_MS}ms linear forwards` }
                          : undefined
                      }
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
