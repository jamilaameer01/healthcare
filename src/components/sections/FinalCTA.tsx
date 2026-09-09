import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import cta from "@/assets/cta-lifestyle.jpg";
import { missionClose, site } from "@/content/thryve";

export function FinalCTA() {
  return (
    <section className="bg-ivory pb-24 pt-8 md:pb-32">
      <Container wide>
        <div className="relative overflow-hidden rounded-xl">
          <ParallaxImage
            src={cta}
            alt="Two people walking outdoors in warm late afternoon light"
            width={1920}
            height={1080}
            amount={10}
            className="aspect-4/5 w-full sm:aspect-16/10 lg:aspect-21/9"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-8 md:p-14">
              <TextReveal
                className="display-lg text-on-dark"
                lines={["Refined wellness.", "Elevated results."]}
                stagger={0.09}
              />
              <p className="mt-6 max-w-md text-base leading-relaxed text-on-dark/85">
                {missionClose}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external variant="onDark">
                  Book an appointment
                </ActionLink>
                <ActionLink
                  href={site.phoneHref}
                  variant="onDarkOutline"
                  withArrow={false}
                >
                  {site.phone}
                </ActionLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
