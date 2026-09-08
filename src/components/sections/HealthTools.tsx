import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow, ActionLink } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import tools from "@/assets/goal-tools.jpg";

const TOOLS = [
  {
    id: "01",
    title: "Symptom check",
    copy: "Answer a few questions and see which care fits.",
  },
  {
    id: "02",
    title: "Lab results, explained",
    copy: "Every number in plain language, with what to do next.",
  },
  {
    id: "03",
    title: "Progress tracking",
    copy: "Weight, sleep and energy in one simple timeline.",
  },
  {
    id: "04",
    title: "Refills and reminders",
    copy: "Treatment kept on schedule without you chasing it.",
  },
];

export function HealthTools() {
  return (
    <section id="tools" className="bg-linen py-24 md:py-36">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="label-mono text-clay">Ongoing care</p>
            <TextReveal
              className="display-md mt-6 max-w-[16ch]"
              lines={["Tools that keep", "you moving."]}
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Care doesn't stop at the appointment. Everything you need between visits sits in one
              place.
            </p>
            <div className="mt-10">
              <ActionLink to="/book">Create your plan</ActionLink>
            </div>
          </div>

          <Reveal className="border-t border-ink/12" stagger={0.07} y={26}>
            {TOOLS.map((t) => (
              <div
                key={t.id}
                className="group flex items-start justify-between gap-6 border-b border-ink/12 py-6"
              >
                <div>
                  <span className="label-mono text-ink/40">{t.id}</span>
                  <h3 className="mt-2 text-xl font-medium text-ink">{t.title}</h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-soft">{t.copy}</p>
                </div>
                <span className="mt-6 text-ink/35 transition-colors duration-500 group-hover:text-clay">
                  <Arrow />
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-16">
          <ParallaxImage
            src={tools}
            alt="A woman on a sofa in warm daylight speaking with her clinician on her phone"
            width={1400}
            height={1200}
            amount={12}
            className="aspect-16/9 w-full overflow-hidden rounded-lg bg-mist"
          />
        </div>
      </Container>
    </section>
  );
}
