import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TiltCard } from "@/components/animations/TiltCard";
import { imageAt, serviceById } from "@/content/thryve";

/* SkinPen aftercare detail, from the aesthetic-services content. */
const skinpenExpect =
  "Treatments take 30-45 minutes with minimal downtime. Mild redness, similar to a light sunburn, may last 24-48 hours.";

const ARTICLES = [
  {
    tag: "Aesthetics",
    title: "What SkinPen® microneedling actually does",
    copy: skinpenExpect,
    image: imageAt(serviceById("aesthetic-skinpen"), 1).src,
    alt: imageAt(serviceById("aesthetic-skinpen"), 1).alt,
    href: "#care",
  },
  {
    tag: "Hormone testing",
    title: "Why we use the DUTCH Test",
    copy: serviceById("dutch-test").description,
    image: imageAt(serviceById("dutch-test"), 0).src,
    alt: imageAt(serviceById("dutch-test"), 0).alt,
    href: "#assessment",
  },
  {
    tag: "Peptides",
    title: "How peptide therapy signals repair",
    copy: serviceById("peptide-therapy").description,
    image: imageAt(serviceById("peptide-therapy"), 1).src,
    alt: imageAt(serviceById("peptide-therapy"), 1).alt,
    href: "#treatment",
  },
];

export function Education() {
  return (
    <section id="resources" className="bg-ivory py-24 md:py-36">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TextReveal className="display-md max-w-[16ch]" lines={["Understand", "your options."]} />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            The treatments and testing we use most, explained plainly.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.08} y={40}>
          {ARTICLES.map((a) => (
            <TiltCard key={a.title} className="h-full">
              <a href={a.href} className="group block h-full">
                <ParallaxImage
                  src={a.image}
                  alt={a.alt}
                  width={1200}
                  height={1500}
                  amount={6}
                  zoom={1.06}
                  className="aspect-4/5 w-full rounded-lg"
                  imgClassName="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-[1.05]"
                />
                <p className="label-mono mt-6 text-clay">{a.tag}</p>
                <h3 className="display-sm mt-3 max-w-[22ch]">{a.title}</h3>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-ink-soft">{a.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink">
                  Learn more <Arrow />
                </span>
              </a>
            </TiltCard>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
