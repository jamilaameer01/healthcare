import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import { team } from "@/content/thryve";

/*
 * The practice's own philosophy, in the team's words and with their photos.
 * Independent of the review cards further down the page.
 */
const STORIES = team.map((member) => ({
  excerpt: member.excerpt,
  name: member.name,
  detail: member.role,
  image: member.image,
  alt: `Portrait of ${member.name}, ${member.role}`,
}));

export function PatientStories() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${STORIES.length * 50}%`,
        pin: "[data-story-stage]",
        anticipatePin: 1,
        scrub: true,
        /* Refreshed after the earlier pinned sections. */
        refreshPriority: -1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(STORIES.length - 1, Math.floor(self.progress * STORIES.length));
          setActive(i);
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  /*
   * `isolate` keeps the absolutely-positioned portraits inside this
   * section's own stacking context. Without it they paint above an
   * earlier pinned (position: fixed) section, since they come later in
   * the DOM and neither carries a z-index.
   */
  return (
    <section id="team" ref={root} className="isolate bg-ink py-14 text-linen md:py-0">
      {/*
        ---------- mobile: stacked list ----------

        The pinned rotation only runs at md+, so below that the three people
        would have shown as stacked quotes against a single frozen portrait.
        Each one gets its own block instead.
      */}
      <div className="md:hidden">
        <Container wide>
          <p className="label-mono text-clay">Meet the people behind your care</p>

          <div className="mt-8 space-y-12">
            {STORIES.map((s) => (
              <article key={s.name}>
                <div className="aspect-4/5 w-full max-w-[300px] overflow-hidden rounded-lg bg-mist">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={1200}
                    height={1500}
                    className="size-full object-cover object-top"
                  />
                </div>

                <p className="mt-6 text-base leading-[1.65] text-on-dark">{s.excerpt}</p>
                <p className="mt-4 text-sm text-on-dark-soft">
                  {s.name} · {s.detail}
                </p>
              </article>
            ))}
          </div>

          <ActionLink to="/about" variant="onDarkOutline" className="mt-10">
            Read about the practice
          </ActionLink>
        </Container>
      </div>

      {/* ---------- desktop: pinned rotation ---------- */}
      <div data-story-stage className="hidden md:flex md:min-h-screen md:items-center md:py-10">
        <Container wide>
          <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1fr_0.7fr] md:items-center md:gap-12">
            <div>
              <p className="label-mono text-clay">Meet the people behind your care</p>

              {/*
                The quotes are stacked absolutely, so this box has to reserve
                room for the longest one — at display-md over 24ch it ran to
                six lines and collided with the content below.
              */}
              <div className="relative mt-6 md:min-h-[19rem] lg:min-h-[17rem]">
                {STORIES.map((s, i) => (
                  <blockquote
                    key={s.name}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-cinematic",
                      i === active
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-6 opacity-0",
                    )}
                  >
                    {/* Dark section: keep type on the on-dark palette. */}
                    <p className="max-w-[52ch] text-lg leading-[1.65] text-on-dark md:text-xl md:leading-[1.6]">
                      {s.excerpt}
                    </p>
                    <footer className="mt-7 text-sm text-on-dark-soft">
                      {s.name} · {s.detail}
                    </footer>
                  </blockquote>
                ))}
              </div>

              {/* Outside the quote stack: those are absolutely positioned in a
                  fixed-height box, so anything placed inside it would collide
                  with the longest excerpt. */}
              <ActionLink to="/about" variant="onDarkOutline" className="mt-2">
                Read about the practice
              </ActionLink>
            </div>

            {/* Portrait frame: the team photos are tall originals. */}
            <div className="media-depth-drift relative aspect-4/5 w-full overflow-hidden rounded-lg bg-mist sm:mx-auto sm:max-w-[360px] md:mx-0 md:ml-auto md:max-h-[460px] md:max-w-[380px]">
              {STORIES.map((s, i) => (
                <img
                  key={s.name}
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className={cn(
                    "absolute inset-0 size-full object-cover object-top transition-all duration-[900ms] ease-cinematic",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
