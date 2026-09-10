import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink, Arrow } from "@/components/ui/ActionButton";
import labs from "@/assets/goal-labs.jpg";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { cn } from "@/lib/utils";
import { medicalServices, type MedicalService, type ServiceItem } from "@/content/medical-services";
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

/** One photograph. Brand marks and product shots are never cropped. */
function ServiceImage({ item, alt }: { item: ServiceItem; alt: string }) {
  const contain = item.fit === "contain";

  return (
    <div
      className={cn(
        "media-depth-drift w-full overflow-hidden rounded-lg",
        contain
          ? "flex aspect-4/3 items-center justify-center border border-line bg-white p-6"
          : "aspect-4/3 bg-linen",
      )}
    >
      <img
        src={item.image}
        alt={alt}
        loading="lazy"
        width={1400}
        height={1050}
        style={contain ? {} : focal(item.image!)}
        className={cn(
          contain ? "max-h-full w-auto max-w-full object-contain" : "size-full object-cover",
        )}
      />
    </div>
  );
}

/**
 * Every photograph a category has, stacked in one column: the first at full
 * width, the rest paired below it. The column holds still while the copy
 * beside it scrolls, so a long passage never leaves the page half empty.
 */
function ServiceImages({ service }: { service: MedicalService }) {
  const images = service.items.filter((i) => i.image);
  if (!images.length) return null;

  const [first, ...rest] = images;

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <ServiceImage item={first!} alt={first!.title ?? `${service.title} at ${site.name}`} />

      {rest.length ? (
        <div className={cn("mt-4 grid gap-4", rest.length > 1 && "grid-cols-2")}>
          {rest.map((item, i) => (
            <ServiceImage key={i} item={item} alt={`${service.title} at ${site.name}`} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ServiceSection({ service, index }: { service: MedicalService; index: number }) {
  const copy = service.items.filter((i) => i.parts?.length || i.title);

  return (
    <section
      id={service.id}
      className={cn("scroll-mt-28 py-14 md:py-20", index % 2 === 0 ? "bg-sand" : "bg-ivory")}
    >
      {/* Wider side margins than the opening section, so each category sits in from the edge. */}
      <Container wide className="lg:px-20 xl:px-28">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ServiceImages service={service} />

          <Reveal blur={false} stagger={0.08}>
            <p className="label-mono text-clay">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(medicalServices.length).padStart(2, "0")}
            </p>
            <h2 className="display-md mt-5">{service.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              {service.description}
            </p>

            {service.symptoms ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="rule-line pt-4 text-base leading-relaxed text-ink-soft"
                  >
                    {symptom}
                  </div>
                ))}
              </div>
            ) : null}

            {copy.length ? (
              <div className="rule-line mt-10 space-y-10 pt-10">
                {copy.map((item, i) => (
                  <div key={item.title ?? i}>
                    {item.title && item.title !== service.title ? (
                      <h3 className="display-sm mb-4 max-w-[26ch]">{item.title}</h3>
                    ) : null}
                    <ItemBody item={item} />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10">
              <ActionLink href={site.bookingUrl} external>
                Book a consultation
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ServicesPage() {
  return (
    <>
      {/* ---------- page opening ---------- */}
      <section className="bg-ivory pb-14 pt-28 md:pb-20 md:pt-36">
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

            {/*
              A clinician at the bench rather than an empty room: this page is
              the medical scope, and the testing behind it is what the copy
              beside this frame is about. The source is portrait, so the crop
              point in `imageFocus` holds the hands and samples in frame.
            */}
            <ParallaxImage
              src={labs}
              alt="A clinician preparing samples in a bright laboratory"
              width={1200}
              height={1500}
              amount={8}
              zoom={1.06}
              priority
              imgStyle={focal(labs)}
              className="aspect-4/3 w-full rounded-lg sm:aspect-16/10 lg:aspect-4/3"
            />
          </div>

          {/*
            The index doubles as navigation for a long page — hairline rows in
            the site's own rule language rather than a cloud of pills.
          */}
          <Reveal
            className="mt-16 grid gap-x-14 border-t border-ink/12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
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
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ---------- closing call to action ---------- */}
      <section className="dark-section py-16 md:py-24">
        <Container wide>
          <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
            <TextReveal
              className="display-md max-w-[20ch] text-on-dark"
              lines={["Not sure where", "to start?"]}
            />
            <div>
              <p className="max-w-md text-base leading-relaxed text-on-dark-soft">
                Book a consultation and we will map the right testing and treatment around your
                goals.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external variant="onDark">
                  Book an appointment
                </ActionLink>
                <ActionLink href={site.phoneHref} variant="onDarkOutline" withArrow={false}>
                  {site.phone}
                </ActionLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
