import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { Stage } from "@/components/3d/Stage";
import heroCare from "@/assets/hero-care.jpg";
import ambientVideo from "@/assets/hero-ambient.mp4";
import ambientPoster from "@/assets/hero-ambient-poster.jpg";

const BADGES = [
  "Board-certified specialists",
  "Same-week appointments",
  "Care plans built for you",
];

/* Figures mirror the Trust section so the site tells one story. */
const PROOF = [
  { value: "15+", label: "Years of care" },
  { value: "25K+", label: "Patients supported" },
  { value: "98%", label: "Patient satisfaction" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ambient = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    registerGsap();
    const el = root.current;

    if (prefersReducedMotion()) {
      /* Hold the poster frame instead of looping. */
      if (ambient.current) {
        ambient.current.autoplay = false;
        ambient.current.pause();
        ambient.current.currentTime = 0;
      }

      /* The intro tweens never run, so reveal what they would have faded in. */
      if (el) gsap.set(el.querySelectorAll("[data-hero-fade]"), { opacity: 1, y: 0 });

      return;
    }

    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.35, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-frame]",
        { clipPath: "inset(12% 0% 12% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.out" },
      );

      gsap.to("[data-hero-img]", {
        scale: 1.1,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.to("[data-hero-copy]", {
        y: -60,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      });

      /* Resting opacity must match the class below — GSAP writes it inline. */
      gsap.fromTo(
        "[data-hero-ambient]",
        { opacity: 0, scale: 1.12 },
        { opacity: 0.65, scale: 1.05, duration: 2, ease: "power2.out" },
      );

      gsap.to("[data-hero-ambient]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1.4 },
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-ivory pt-28 md:pt-32">
      {/* Ambient background video — decorative, sits behind everything. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={ambient}
          data-hero-ambient
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={ambientPoster}
          disablePictureInPicture
          className="size-full scale-105 object-cover opacity-65 blur-[1.5px] saturate-[0.95] will-change-transform"
        >
          <source src={ambientVideo} type="video/mp4" />
        </video>

        <div className="hero-video-scrim absolute inset-0" />
      </div>

      <Container wide className="relative z-10 pb-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div data-hero-copy>
            <div
              data-hero-fade
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-2 pr-4 pl-2.5 opacity-0 backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay/60" />
                <span className="relative inline-flex size-2 rounded-full bg-clay" />
              </span>
              <span className="label-mono text-ink-soft">Now accepting new patients</span>
            </div>

            <TextReveal
              as="h1"
              immediate
              delay={0.15}
              className="display-xl"
              lines={["Better care.", "Made personal."]}
            />
            <p
              data-hero-fade
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft opacity-0"
            >
              Modern healthcare designed around you, your goals, and your everyday life.
            </p>
            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3 opacity-0">
              <ActionLink href="#care">Explore care</ActionLink>
              <ActionLink href="#specialists" variant="outline" withArrow={false}>
                Meet our specialists
              </ActionLink>
            </div>

            <ul data-hero-fade className="mt-9 flex flex-wrap gap-2 opacity-0">
              {BADGES.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-sm text-ink-soft backdrop-blur-sm"
                >
                  {badge}
                </li>
              ))}
            </ul>

           
          </div>

          <div className="media-depth-drift relative">
            <div
              data-hero-frame
              className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-linen sm:aspect-3/2 lg:aspect-auto lg:h-[74vh]"
            >
              <img
                data-hero-img
                src={heroCare}
                alt="A doctor listening to a patient in a warm, light-filled consultation room"
                width={1600}
                height={1920}
                fetchPriority="high"
                className="size-full object-cover will-change-transform"
              />
            </div>

            <Stage
              load={() => import("@/components/3d/OrganicScene")}
              progress={progress}
              camera={{ position: [0, 0, 6.6], fov: 38 }}
              className="pointer-events-none absolute -left-[14%] bottom-[6%] hidden aspect-square w-[38%] md:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
