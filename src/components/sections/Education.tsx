import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TiltCard } from "@/components/animations/TiltCard";
import nutrition from "@/assets/edu-nutrition.jpg";
import preventive from "@/assets/edu-preventive.jpg";
import wellness from "@/assets/edu-wellness.jpg";

const ARTICLES = [
  {
    tag: "Nutrition",
    title: "Eating for energy, not rules",
    copy: "What actually changes how you feel by Thursday.",
    image: nutrition,
    alt: "A woman preparing a fresh meal in a sunlit kitchen",
  },
  {
    tag: "Preventive care",
    title: "The checks worth doing in your 40s",
    copy: "A short, honest list — and what each one tells you.",
    image: preventive,
    alt: "A doctor and patient in conversation in a bright consultation room",
  },
  {
    tag: "Wellness",
    title: "Sleep is the first treatment",
    copy: "Why we start here before anything else.",
    image: wellness,
    alt: "A person stretching by a window in warm morning light",
  },
];

export function Education() {
  return (
    <section id="resources" className="bg-ivory py-24 md:py-36">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TextReveal className="display-md max-w-[16ch]" lines={["Understand", "your health."]} />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            Short reads from the clinicians you'd see in person.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.08} y={40}>
          {ARTICLES.map((a) => (
            <TiltCard key={a.title} className="h-full">
              <a href="/approach" className="group block h-full">
                <ParallaxImage
                  src={a.image}
                  alt={a.alt}
                  width={1200}
                  height={1500}
                  amount={6}
                  className="aspect-4/5 w-full rounded-lg"
                  imgClassName="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-[1.05]"
                />
                <p className="label-mono mt-6 text-clay">{a.tag}</p>
                <h3 className="display-sm mt-3 max-w-[20ch]">{a.title}</h3>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-ink-soft">{a.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink">
                  Read <Arrow />
                </span>
              </a>
            </TiltCard>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
