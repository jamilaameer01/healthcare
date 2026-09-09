import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import {
  VisualTreatmentPanel,
  type VisualTreatment,
} from "@/components/sections/VisualTreatmentPanel";
import treatment from "@/assets/goal-treatment.jpg";
import weight from "@/assets/goal-weight.jpg";
import labs from "@/assets/goal-labs.jpg";

const FEATURED_TREATMENTS: VisualTreatment[] = [
  {
    number: "01",
    eyebrow: "Clinician-led care",
    title: "Treatment that fits your life.",
    statement: "Reviewed by a clinician, delivered discreetly and adjusted as your results change.",
    image: treatment,
    alt: "An amber medication bottle and plain carton on a warm ivory surface",
    tone: "light",
    size: "wide",
    align: "left",
    cta: "Start a consultation",
  },
  {
    number: "02",
    eyebrow: "Weight management",
    title: "Progress, built around you.",
    statement:
      "A plan shaped by your health, habits and goals — with treatment when it is right for you.",
    image: weight,
    alt: "A person preparing a fresh balanced meal in a sunlit kitchen",
    tone: "dark",
    size: "contained",
    align: "right",
    cta: "Explore weight care",
  },
  {
    number: "03",
    eyebrow: "Assessments and labs",
    title: "Clear answers. Earlier.",
    statement: "Focused testing turns the signals in your body into a plan you can act on.",
    image: labs,
    alt: "A clinician preparing a sample in a warm, modern laboratory",
    tone: "dark",
    size: "contained",
    align: "left",
    cta: "Book an assessment",
  },
];

export function FeaturedTreatment() {
  return (
    <section id="treatment" className="overflow-hidden bg-ivory py-24 md:py-36">
      <Container wide>
        <Reveal className="mx-auto max-w-3xl text-center" stagger={0.08}>
          <p className="label-mono text-clay">Care, made visible</p>
          <TextReveal className="display-lg mt-6" lines={["Treatment that", "fits your life."]} />
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
            Personal care, shown simply — from the first conversation to every step after.
          </p>
        </Reveal>

        <div className="mt-20 space-y-20 md:mt-28 md:space-y-32 lg:space-y-44">
          {FEATURED_TREATMENTS.map((item) => (
            <VisualTreatmentPanel key={item.number} treatment={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
