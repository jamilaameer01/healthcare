import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { prefersReducedMotion } from "@/lib/motion";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const PEOPLE = [
  {
    name: "Dr. Elena Marsh",
    specialty: "Internal Medicine",
    copy: "Leads our preventive review programme.",
    credentials: "MBBS, MRCP",
    image: doctor1,
  },
  {
    name: "Dr. Anders Holt",
    specialty: "Cardiology",
    copy: "Long-term cardiovascular risk and rehabilitation.",
    credentials: "MD, FRCP",
    image: doctor2,
  },
  {
    name: "Dr. Amara Boateng",
    specialty: "Women's Health",
    copy: "Gynaecology, fertility and hormonal care.",
    credentials: "MBChB, MRCOG",
    image: doctor3,
  },
  {
    name: "Dr. Kenji Sato",
    specialty: "Diagnostic Imaging",
    copy: "Same-day imaging and reporting on site.",
    credentials: "MD, FRCR",
    image: doctor4,
  },
];

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

  const peopleLoop = [...PEOPLE, ...PEOPLE];

  return (
    <section id="specialists" className="bg-ivory py-24 md:py-36">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            className="display-md max-w-[16ch]"
            lines={["Meet the people", "behind your care."]}
          />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            A small team, deliberately. You will see the same faces for years.
          </p>
        </div>
      </Container>

      <ul
        ref={track}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mt-20 md:px-10"
      >
        {peopleLoop.map((p, index) => (
          <li
            key={`${p.name}-${index}`}
            aria-hidden={index >= PEOPLE.length ? true : undefined}
            className="group w-[76vw] shrink-0 snap-center sm:w-[46vw] lg:w-[26vw] xl:w-[22vw]"
          >
            <TiltCard intensity={6}>
              <div className="media-depth-drift aspect-3/4 w-full overflow-hidden rounded-lg bg-linen">
                <img
                  src={p.image}
                  alt={`Portrait of ${p.name}`}
                  loading="lazy"
                  width={800}
                  height={1100}
                  className="size-full object-cover transition-transform duration-[1200ms] ease-cinematic group-hover:scale-[1.05]"
                />
              </div>
            </TiltCard>
            <div className="mt-5">
              <h3 className="display-sm">{p.name}</h3>
              <p className="mt-1 text-sm text-clay">{p.specialty}</p>
              <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-ink-soft">{p.copy}</p>
              <p className="label-mono mt-4 text-ink-soft/70">{p.credentials}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
