import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TiltCard } from "@/components/animations/TiltCard";
import { cn } from "@/lib/utils";
import weight from "@/assets/goal-weight.jpg";
import hair from "@/assets/goal-hair.jpg";
import labs from "@/assets/goal-labs.jpg";
import preventive from "@/assets/care-primary.jpg";
import wellness from "@/assets/care-wellness.jpg";

const CATEGORIES = [
  {
    title: "Weight management",
    copy: "A plan built on your body, not a diet trend.",
    image: weight,
    alt: "A person preparing a fresh balanced meal in a sunlit kitchen",
    span: "sm:col-span-2 lg:col-span-7",
    ratio: "aspect-4/3",
  },
  {
    title: "Hair health",
    copy: "Treat thinning early, with real clinical advice.",
    image: hair,
    alt: "A person with healthy hair standing in warm window light",
    span: "lg:col-span-5",
    ratio: "aspect-4/5",
  },
  {
    title: "Hormone health",
    copy: "Testing and treatment for energy, mood and sleep.",
    image: labs,
    alt: "A clinician handling sample vials in a bright laboratory",
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
  {
    title: "Preventive health",
    copy: "Find things early. Stay ahead of them.",
    image: preventive,
    alt: "A patient talking with her clinician in a bright consultation room",
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
  {
    title: "Wellness",
    copy: "Sleep, movement and nutrition, coached over months.",
    image: wellness,
    alt: "A person stretching in a sunlit room",
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
];

export function CareCategories() {
  return (
    <section id="care" className="bg-sand py-24 md:py-36">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <TextReveal className="display-md max-w-[16ch]" lines={["Start with", "your goal."]} />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            Choose what matters most right now. One team, one record, one plan.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12" stagger={0.08} y={40}>
          {CATEGORIES.map((c) => (
            <TiltCard key={c.title} intensity={5} className={cn(c.span)}>
              <a
                href="#discover"
                className="group relative block h-full overflow-hidden rounded-lg bg-ivory"
              >
                <ParallaxImage
                  src={c.image}
                  alt={c.alt}
                  width={1200}
                  height={1500}
                  amount={8}
                  className={cn("w-full", c.ratio)}
                  imgClassName="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
                  <div className="text-on-dark">
                    <h3 className="display-sm">{c.title}</h3>
                    <p className="mt-2 max-w-[28ch] text-sm text-on-dark/85">{c.copy}</p>
                  </div>
                  <span className="mb-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/35 text-on-dark transition-colors duration-500 group-hover:bg-on-dark group-hover:text-ink">
                    <Arrow />
                  </span>
                </div>
              </a>
            </TiltCard>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
