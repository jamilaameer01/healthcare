import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";
import { imageAt, serviceById, site } from "@/content/thryve";
import { focal } from "@/content/imageFocus";

/* Each goal maps to a real service; copy is drawn from that service. */
const OPTIONS = [
  {
    id: "weight",
    label: "Lose weight",
    headline: "Science-backed, not a fad.",
    service: serviceById("weight-management"),
    tone: "bg-ivory",
  },
  {
    id: "hormones",
    label: "Balance my hormones",
    headline: "Energy, mood, sleep — measured.",
    service: serviceById("hormone-optimization"),
    tone: "bg-sand",
  },
  {
    id: "peptides",
    label: "Recover and perform",
    headline: "Repair, signalled at cell level.",
    service: serviceById("peptide-therapy"),
    tone: "bg-linen",
  },
  {
    id: "primary",
    label: "Find a provider I keep",
    headline: "Healthcare, the way it should be.",
    service: serviceById("direct-primary-care"),
    tone: "bg-ivory",
  },
  {
    id: "skin",
    label: "Improve my skin",
    headline: "Collagen, built by your own skin.",
    service: serviceById("aesthetic-skinpen"),
    tone: "bg-clay-soft/40",
  },
];

export function CareFinder() {
  const [active, setActive] = useState(0);
  const current = OPTIONS[active]!;

  return (
    <section
      id="discover"
      className={cn("py-10 transition-colors duration-700 ease-cinematic", current.tone)}
    >
      <Container wide>
        <TextReveal
          className="display-md mx-auto max-w-[18ch] text-center text-ink"
          lines={[
            <>
              What are you <span className="text-clay">looking for?</span>
            </>,
          ]}
        />

        <div className="mx-auto mt-12 grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ul className="border-t border-ink/12">
              {OPTIONS.map((o, i) => (
                <li key={o.id} className="border-b border-ink/12">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "display-sm transition-all duration-500 ease-cinematic",
                        i === active ? "translate-x-2 text-ink" : "text-ink/45",
                      )}
                    >
                      {o.label}
                    </span>
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full transition-all duration-500",
                        i === active ? "bg-clay" : "bg-transparent",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10 max-w-lg">
              <h3 key={`h-${current.id}`} className="display-sm animate-fade-in">
                {current.headline}
              </h3>
              <p
                key={`p-${current.id}`}
                className="mt-4 animate-fade-in leading-relaxed text-ink-soft"
              >
                {current.service.description}
              </p>
              <div key={`c-${current.id}`} className="mt-8 animate-fade-in">
                <ActionLink href={site.bookingUrl} external>
                  Book a consultation
                </ActionLink>
              </div>
            </div>
          </div>

          <div className="media-depth-drift relative aspect-4/3 w-full overflow-hidden rounded-lg bg-linen sm:mx-auto sm:max-w-[420px] lg:aspect-5/4 lg:max-h-[460px] lg:max-w-[580px]">
            {OPTIONS.map((o, i) => {
              const image = imageAt(o.service, 1);

              return (
                <img
                  key={o.id}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  style={focal(image.src)}
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-all duration-[900ms] ease-cinematic",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
