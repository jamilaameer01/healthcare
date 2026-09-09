import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow, ActionLink } from "@/components/ui/ActionButton";

import { membership, site } from "@/content/thryve";

const TOOLS = membership;

export function HealthTools() {
  return (
    <section id="tools" className="bg-linen py-16 md:py-24">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="label-mono text-clay">Membership</p>
            <TextReveal
              className="display-md mt-6 max-w-[16ch]"
              lines={["What your", "membership includes."]}
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Because insurance isn't dictating visit length or treatment decisions, care becomes
              personal, proactive and relationship-driven.
            </p>
            <div className="mt-10">
              <ActionLink href={site.bookingUrl} external>
                Become a member
              </ActionLink>
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
      </Container>
    </section>
  );
}
