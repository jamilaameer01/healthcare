import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";

export function Statement() {
  return (
    <section className="bg-ivory py-28 md:py-48">
      <Container wide>
        <TextReveal
          className="display-lg max-w-[16ch]"
          lines={["Healthcare should", "feel human."]}
          stagger={0.12}
        />
        <Reveal className="mt-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end" blur={false}>
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
            Longer appointments. One record. A team that remembers you. Everything else is detail.
          </p>
          <p className="label-mono text-clay">Est. 2011 · London</p>
        </Reveal>
      </Container>
    </section>
  );
}
