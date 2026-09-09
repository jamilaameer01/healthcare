import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { TiltCard } from "@/components/animations/TiltCard";
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

export function Specialists() {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el || paused || prefersReducedMotion()) return;
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
  }, [paused]);

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

      <ul
        ref={track}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mt-16 md:px-10"
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
    </section>
  );
}
