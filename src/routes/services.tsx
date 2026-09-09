import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { cn } from "@/lib/utils";
import { medicalServices, type ServiceItem } from "@/content/medical-services";
import { site } from "@/content/thryve";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Medical Services — Thryve Wellness" },
      {
        name: "description",
        content:
          "Direct primary care, acute care, DOT physicals, medical weight management, peptide therapy, hormone optimization, PiezoWave 2 and the DUTCH Test in Naples, Florida.",
      },
      { property: "og:title", content: "Medical Services — Thryve Wellness" },
      {
        property: "og:description",
        content: "Every medical service offered at Thryve Wellness in Naples, Florida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

/** Body copy for one item: paragraphs and bulleted lists, in order. */
function ItemBody({ item }: { item: ServiceItem }) {
  if (!item.parts?.length) return null;

  return (
    <div className="space-y-5">
      {item.parts.map((part, i) =>
        part.type === "p" ? (
          <p key={i} className="max-w-[64ch] text-base leading-relaxed text-ink-soft">
            {part.text}
          </p>
        ) : (
          <ul key={i} className="space-y-3">
            {part.items.map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-clay" />
                <span className="max-w-[58ch]">{line}</span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      {/* ---------- page opening ---------- */}
      <section className="bg-ivory pb-16 pt-40 md:pb-20 md:pt-52">
        <Container wide>
          <SectionLabel>Medical services</SectionLabel>
          <TextReveal
            as="h1"
            immediate
            className="display-lg mt-10 max-w-[20ch]"
            lines={["Everything we", "look after."]}
          />
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">
            Modern medicine and advanced therapies under one roof in {site.city} — from everyday
            primary care to hormone optimization, peptides and focused shockwave therapy.
          </p>

          {/* jump links, so a long page stays navigable */}
          <Reveal className="mt-12 flex flex-wrap gap-2" blur={false} stagger={0.05}>
            {medicalServices.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-line bg-white/60 px-4 py-2 text-sm text-ink-soft transition-colors duration-500 ease-cinematic hover:border-clay/40 hover:text-ink"
              >
                {s.title}
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ---------- one block per service category ---------- */}
      {medicalServices.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={cn("py-16 md:py-24", index % 2 === 0 ? "bg-sand" : "bg-ivory")}
        >
          <Container wide>
            <Reveal className="max-w-3xl" blur={false} stagger={0.08}>
              <p className="label-mono text-clay">
                {String(index + 1).padStart(2, "0")} / {String(medicalServices.length).padStart(2, "0")}
              </p>
              <h2 className="display-md mt-5 max-w-[24ch]">{service.title}</h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
                {service.description}
              </p>
            </Reveal>

            {service.symptoms ? (
              <Reveal
                className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
                blur={false}
                stagger={0.05}
              >
                {service.symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="rule-line pt-4 text-base leading-relaxed text-ink-soft"
                  >
                    {symptom}
                  </div>
                ))}
              </Reveal>
            ) : null}

            <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
              {service.items.map((item, i) => {
                const hasText = Boolean(item.parts?.length || item.title);

                /* Image-only items sit in a row; items with copy alternate. */
                if (!hasText && item.image) {
                  return (
                    <ParallaxImage
                      key={i}
                      src={item.image}
                      alt={`${service.title} at Thryve Wellness`}
                      width={1400}
                      height={1050}
                      amount={6}
                      zoom={1.05}
                      className="mx-auto aspect-3/2 w-full max-w-[900px] rounded-lg"
                    />
                  );
                }

                return (
                  <Reveal
                    key={i}
                    className={cn(
                      "grid items-center gap-10 lg:gap-16",
                      item.image ? "lg:grid-cols-2" : "max-w-3xl",
                    )}
                    blur={false}
                    stagger={0.08}
                  >
                    {item.image ? (
                      <div
                        className={cn(
                          "media-depth-drift w-full overflow-hidden rounded-lg",
                          item.fit === "contain"
                            ? "flex aspect-3/2 items-center justify-center border border-line bg-white p-8"
                            : "aspect-4/3 bg-linen",
                          /* alternate sides on desktop */
                          i % 2 === 1 ? "lg:order-last" : "",
                        )}
                      >
                        <img
                          src={item.image}
                          alt={item.title ? `${item.title}` : service.title}
                          loading="lazy"
                          width={1400}
                          height={1050}
                          className={cn(
                            "transition-transform duration-[1200ms] ease-cinematic",
                            item.fit === "contain"
                              ? "max-h-full w-auto max-w-full object-contain"
                              : "size-full object-cover",
                          )}
                        />
                      </div>
                    ) : null}

                    <div>
                      {item.title && item.title !== service.title ? (
                        <h3 className="display-sm mb-6 max-w-[24ch]">{item.title}</h3>
                      ) : null}
                      <ItemBody item={item} />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      ))}

      {/* ---------- closing call to action ---------- */}
      <section className="dark-section py-16 md:py-24">
        <Container wide>
          <TextReveal
            className="display-md max-w-[20ch] text-on-dark"
            lines={["Not sure where", "to start?"]}
          />
          <p className="mt-6 max-w-md text-base leading-relaxed text-on-dark-soft">
            Book a consultation and we will map the right testing and treatment around your goals.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionLink href={site.bookingUrl} external variant="onDark">
              Book an appointment
            </ActionLink>
            <ActionLink href={site.phoneHref} variant="onDarkOutline" withArrow={false}>
              {site.phone}
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  );
}
