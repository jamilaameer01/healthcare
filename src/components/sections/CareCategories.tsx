import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TiltCard } from "@/components/animations/TiltCard";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { serviceById, studioImage } from "@/content/thryve";

/*
 * The five headline services, sized by prominence in the existing grid.
 * These cards use the site's own curated photography, not the clinic's
 * service photos — those carry the Medical services section instead.
 */
const CATEGORIES = [
  {
    ...serviceById("hormone-optimization"),
    picture: studioImage(serviceById("hormone-optimization")),
    span: "sm:col-span-2 lg:col-span-7",
    ratio: "aspect-4/3",
  },
  {
    ...serviceById("weight-management"),
    picture: studioImage(serviceById("weight-management")),
    span: "lg:col-span-5",
    ratio: "aspect-4/5",
  },
  {
    ...serviceById("peptide-therapy"),
    picture: studioImage(serviceById("peptide-therapy")),
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
  {
    ...serviceById("direct-primary-care"),
    picture: studioImage(serviceById("direct-primary-care")),
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
  {
    ...serviceById("aesthetic-skinpen"),
    picture: studioImage(serviceById("aesthetic-skinpen")),
    span: "lg:col-span-4",
    ratio: "aspect-4/5",
  },
];

export function CareCategories() {
  return (
    <section id="care" className="bg-sand py-16 md:py-24">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <TextReveal className="display-md max-w-[16ch]" lines={["Start with", "your goal."]} />
          <p className="max-w-xs text-base leading-relaxed text-ink-soft">
            Modern medicine and advanced therapies, delivered in one private practice.
          </p>
        </div>

        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12" stagger={0.08} y={40}>
          {CATEGORIES.map((c) => (
            <TiltCard key={c.title} intensity={5} className={cn(c.span)}>
              {/*
                Still a real link, but the jump is handed to Lenis: a native
                fragment jump is overridden by its next frame, and lands the
                target under the fixed header.
              */}
              <a
                href="#discover"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("discover");
                }}
                className="group relative block h-full overflow-hidden rounded-lg bg-ivory"
              >
                <ParallaxImage
                  src={c.picture.src}
                  alt={c.picture.alt}
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
                    <p className="mt-2 max-w-[30ch] text-sm text-on-dark/85">{c.short}</p>
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
