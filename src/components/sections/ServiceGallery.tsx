import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import {
  VisualTreatmentPanel,
  type VisualTreatment,
} from "@/components/sections/VisualTreatmentPanel";
import hair from "@/assets/goal-hair.jpg";
import wellness from "@/assets/care-wellness.jpg";
import primary from "@/assets/care-primary.jpg";

const SERVICES: VisualTreatment[] = [
  {
    number: "04",
    eyebrow: "Hair health",
    title: "Keep what feels like you.",
    statement: "Clinician-guided care designed around your pattern, progress and pace.",
    image: hair,
    alt: "Close-up editorial portrait showing healthy hair",
    tone: "dark",
    size: "wide",
    align: "right",
    imagePosition: "object-center",
    cta: "Explore hair care",
  },
  {
    number: "05",
    eyebrow: "Hormone health",
    title: "Understand what has changed.",
    statement: "Thoughtful testing and expert review for energy, metabolism and long-term health.",
    image: primary,
    alt: "A patient having a focused conversation with a clinician",
    tone: "dark",
    size: "contained",
    align: "left",
    cta: "Explore hormone care",
  },
  {
    number: "06",
    eyebrow: "Ongoing wellness",
    title: "Wellness",
    statement: "Nutrition, sleep and movement support that stays with you beyond one appointment.",
    image: wellness,
    alt: "A person stretching in a sunlit room",
    tone: "dark",
    size: "contained",
    align: "right",
    cta: "Explore wellness",
  },
];

export function ServiceGallery() {
  return (
    <section id="services" className="overflow-hidden bg-sand py-24 md:py-36">
      <Container wide>
        <div className="max-w-3xl">
          <p className="label-mono text-clay">More ways to feel well</p>
          <TextReveal className="display-lg mt-6" lines={["Care that sees", "the whole picture."]} />
        </div>
        <div className="mt-20 space-y-20 md:mt-28 md:space-y-32 lg:space-y-44">
          {SERVICES.map((item) => (
            <VisualTreatmentPanel key={item.number} treatment={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
