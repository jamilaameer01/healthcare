import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { Arrow } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { placeholderReviews } from "@/content/thryve";

/*
 * Patient review cards.
 *
 * ⚠️ Fed by PLACEHOLDER data — see `placeholderReviews` in @/content/thryve.
 * Swap that array for real reviews before launch; this section needs no
 * change. Separate from the "How we practise" section, which carries the
 * team's own quotes and portraits.
 */
const CARDS = placeholderReviews;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 20 20"
          className={i < rating ? "size-4 text-clay" : "size-4 text-ink/15"}
          fill="currentColor"
        >
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

/** Held long enough for a click's smooth scroll to land before the drift resumes. */
const NUDGE_MS = 700;

/*
 * The arrows straddle the cards' top border: `top-0` is the card's top edge
 * and `-translate-y-1/2` splits the control across it, lower half inside the
 * card, upper half out in the section's own ground.
 *
 * The fill is solid rather than translucent so the border it interrupts stops
 * cleanly at its rim instead of showing through.
 */
const CONTROL =
  "group absolute top-0 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink transition-colors duration-500 ease-cinematic hover:border-ink hover:bg-ink hover:text-on-dark";

export function Specialists() {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  /*
   * Held while an arrow's smooth scroll is in flight: the drift below writes
   * scrollLeft on every frame, which would cancel that scroll mid-way.
   */
  const [nudging, setNudging] = useState(false);
  const resume = useRef(0);

  useEffect(() => {
    const el = track.current;
    if (!el || paused || nudging || prefersReducedMotion()) return;
    let frame = 0;
    let previous = performance.now();

    const move = (now: number) => {
      const dt = Math.min(now - previous, 40);
      previous = now;
      el.scrollLeft += dt * 0.025;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [paused, nudging]);

  useEffect(() => () => window.clearTimeout(resume.current), []);

  /** Step the track one card in `dir`, pausing the drift until it lands. */
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;

    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    if (!first) return;

    // One card plus the gap, measured rather than guessed at each breakpoint.
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const half = el.scrollWidth / 2;

    /*
     * The track holds two copies of the cards, so a step can always be taken
     * from inside the first copy — and a step back off the start hops into
     * the second copy, where the same cards continue to the left.
     */
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (dir < 0 && el.scrollLeft < step) el.scrollLeft += half;

    setNudging(true);
    el.scrollBy({ left: dir * step, behavior: "smooth" });

    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setNudging(false), NUDGE_MS);
  };

  const cardLoop = [...CARDS, ...CARDS];

  return (
    <section id="specialists" className="bg-ivory py-16 md:py-24">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TextReveal className="display-md max-w-[16ch]" lines={["What patients", "tell us."]} />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            Experiences from across the practice, in patients' own words.
          </p>
        </div>
      </Container>

      {/*
        The pause handlers live on this wrapper rather than the track, so
        reaching for an arrow — which sits outside the track — holds the
        drift too instead of letting it slide out from under the pointer.
      */}
      <div
        className="relative mt-12 md:mt-16"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ul
          ref={track}
          id="review-track"
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-10"
        >
          {cardLoop.map((card, index) => (
            <li
              key={`${card.name}-${index}`}
              aria-hidden={index >= CARDS.length ? true : undefined}
              className="w-[80vw] shrink-0 snap-center sm:w-[48vw] lg:w-[30vw] xl:w-[24vw]"
            >
              <TiltCard intensity={4} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-lg border border-line bg-sand/50 p-7 md:p-8">
                  <div>
                    <Stars rating={card.rating} />
                    <blockquote className="mt-5">
                      <p className="text-lg leading-relaxed text-ink">“{card.quote}”</p>
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
                    {/* Initial-letter avatar rather than a photo. */}
                    <span
                      aria-hidden
                      className="font-display flex size-12 shrink-0 items-center justify-center rounded-full bg-clay/15 text-lg font-medium text-clay"
                    >
                      {card.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-[15px] font-medium tracking-[-0.01em] text-ink">
                        {card.name}
                      </p>
                      <p className="mt-0.5 text-sm text-clay">{card.service}</p>
                    </div>
                  </figcaption>
                </figure>
              </TiltCard>
            </li>
          ))}
        </ul>

        {/*
          The track drifts on its own and swipes natively; these step it a
          card at a time for anyone who would rather click — and are the
          only way through it when motion is reduced.
        */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-controls="review-track"
          aria-label="Previous review"
          className={cn(CONTROL, "left-8 md:left-14")}
        >
          <Arrow className="rotate-180 group-hover:-translate-x-1" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-controls="review-track"
          aria-label="Next review"
          className={cn(CONTROL, "right-8 md:right-14")}
        >
          <Arrow />
        </button>
      </div>
    </section>
  );
}
