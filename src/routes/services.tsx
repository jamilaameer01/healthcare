import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink, Arrow } from "@/components/ui/ActionButton";
import facility from "@/assets/facility.jpg";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { cn } from "@/lib/utils";
import { medicalServices, type ServiceItem } from "@/content/medical-services";
import { site } from "@/content/thryve";
import { focal } from "@/content/imageFocus";

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

/** Items that carry a heading or copy — rendered as two-column rows. */
const withCopy = (service: { items: ServiceItem[] }) =>
  service.items.filter((i) => Boolean(i.parts?.length || i.title));

/** Items that are only a photograph — collected into one grid. */
const imagesOnly = (service: { items: ServiceItem[] }) =>
  service.items.filter((i) => i.image && !i.parts?.length && !i.title);

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
      <section className="bg-ivory pb-14 pt-36 md:pb-20 md:pt-44">
        <Container wide>
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
            <div>
              <SectionLabel>Medical services</SectionLabel>
              <TextReveal
                as="h1"
                immediate
                className="display-lg mt-8 max-w-[16ch]"
                lines={["Everything we", "look after."]}
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Modern medicine and advanced therapies under one roof in {site.city} — from everyday
                primary care to hormone optimization and focused shockwave therapy.
              </p>
            </div>

            <ParallaxImage
              src={facility}
              alt="A quiet, daylit room at the practice"
              width={1600}
              height={1000}
              amount={8}
              zoom={1.06}
              className="aspect-4/3 w-full rounded-lg sm:aspect-16/10 lg:aspect-4/3"
            />
          </div>

          {/*
            The index doubles as navigation for a long page — hairline rows in
            the site's own rule language rather than a cloud of pills.
          */}
          <Reveal
            className="mt-16 grid gap-x-14 border-t border-ink/12 sm:grid-cols-2 md:mt-20"
            blur={false}
            stagger={0.05}
          >
            {medicalServices.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-baseline justify-between gap-6 border-b border-ink/12 py-5 transition-colors duration-500 ease-cinematic hover:text-clay"
              >
                <span className="text-[17px] tracking-[-0.01em]">{s.title}</span>
                <span className="shrink-0 text-ink/30 transition-colors duration-500 group-hover:text-clay">
                  <Arrow />
                </span>
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
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(medicalServices.length).padStart(2, "0")}
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

            {/*
              Items with copy alternate as two-column rows with their tops
              aligned; the image column is capped so a 4:3 photo cannot run
              away in height. Image-only items are collected into one tidy
              grid instead of a stack of full-width plates.
            */}
            <div className="mt-14 space-y-14 md:mt-16 md:space-y-20">
              {withCopy(service).map((item, i) => (
                <Reveal
                  key={item.title ?? i}
                  className={cn(
                    "grid items-start gap-8 lg:gap-14",
                    !item.image
                      ? "max-w-3xl"
                      : i % 2 === 1
                        ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]"
                        : "lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]",
                  )}
                  blur={false}
                  stagger={0.08}
                >
                  {item.image ? (
                    <div
                      className={cn(
                        "media-depth-drift w-full overflow-hidden rounded-lg",
                        item.fit === "contain"
                          ? "flex aspect-16/9 items-center justify-center border border-line bg-white p-6"
                          : "aspect-4/3 bg-linen",
                        i % 2 === 1 ? "lg:order-last" : "",
                      )}
                    >
                      <img
                        src={item.image}
                        alt={item.title ?? service.title}
                        loading="lazy"
                        width={1400}
                        height={1050}
                        style={item.fit === "contain" ? undefined : focal(item.image)}
                        className={cn(
                          item.fit === "contain"
                            ? "max-h-full w-auto max-w-full object-contain"
                            : "size-full object-cover",
                        )}
                      />
                    </div>
                  ) : null}

                  <div className="lg:pt-1">
                    {item.title && item.title !== service.title ? (
                      <h3 className="display-sm mb-5 max-w-[26ch]">{item.title}</h3>
                    ) : null}
                    <ItemBody item={item} />
                  </div>
                </Reveal>
              ))}

              {imagesOnly(service).length ? (
                <Reveal
                  className={cn(
                    "grid gap-5",
                    imagesOnly(service).length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-xl",
                  )}
                  blur={false}
                  stagger={0.08}
                >
                  {imagesOnly(service).map((item, i) => (
                    <ParallaxImage
                      key={i}
                      src={item.image!}
                      alt={`${service.title} at ${site.name}`}
                      width={1400}
                      height={1050}
                      imgStyle={focal(item.image!)}
                      amount={5}
                      zoom={1.04}
                      className="aspect-4/3 w-full rounded-lg"
                    />
                  ))}
                </Reveal>
              ) : null}
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
