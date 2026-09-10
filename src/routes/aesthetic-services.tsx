import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink, Arrow } from "@/components/ui/ActionButton";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { cn } from "@/lib/utils";
import {
  aestheticHero,
  aestheticServices,
  type AestheticPart,
  type AestheticService,
} from "@/content/aesthetic-services";
import { site, team } from "@/content/thryve";
import { focal } from "@/content/imageFocus";

export const Route = createFileRoute("/aesthetic-services")({
  head: () => ({
    meta: [
      { title: "Aesthetic Services — Thryve Wellness" },
      {
        name: "description",
        content:
          "SkinPen® microneedling in Naples, Florida — FDA-cleared, minimally invasive treatment that stimulates your own collagen and elastin.",
      },
      { property: "og:title", content: "Aesthetic Services — Thryve Wellness" },
      {
        property: "og:description",
        content:
          "FDA-cleared SkinPen® microneedling at Thryve Wellness in Naples, Florida, with a licensed aesthetician.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AestheticServicesPage,
});

/** The practice's licensed aesthetician, for the credential block. */
const aesthetician = team.find((m) => m.role.includes("Aesthetician"));

/** One run of body copy: prose, or the claim list. */
function Part({ part }: { part: AestheticPart }) {
  if (part.type === "p") {
    return <p className="max-w-[64ch] text-base leading-relaxed text-ink-soft">{part.text}</p>;
  }

  return (
    <ul className="space-y-3">
      {part.items.map((line) => (
        <li key={line} className="flex gap-3 text-base leading-relaxed text-ink-soft">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-clay" />
          <span className="max-w-[58ch]">{line}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One treatment. The photographs hold still in their column while the copy
 * beside it scrolls, so a long passage never leaves half the row empty —
 * the same arrangement the medical-services page uses.
 *
 * The lead frame is 4:5 rather than 4:3: this copy runs long, and a portrait
 * crop stands closer to its height than a landscape one, so the two columns
 * end up a similar size instead of the picture stopping a third of the way
 * down. A second photograph sits under it where the content supplies one.
 */
function TreatmentSection({
  service,
  index,
  total,
}: {
  service: AestheticService;
  index: number;
  total: number;
}) {
  const [lead, ...rest] = service.images;

  return (
    <section
      id={service.id}
      className={cn("scroll-mt-28 py-14 md:py-20", index % 2 === 0 ? "bg-sand" : "bg-ivory")}
    >
      <Container wide className="lg:px-20 xl:px-28">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/*
              4:3 for the lead: the treatment photograph is 1.4:1, so this
              frame trims a sliver off the sides and nothing off the top or
              bottom — where the device and the patient's face are.
            */}
            <div className="media-depth-drift aspect-4/3 w-full overflow-hidden rounded-lg bg-linen">
              <img
                src={lead!.src}
                alt={lead!.alt}
                loading="lazy"
                width={lead!.w}
                height={lead!.h}
                style={focal(lead!.src)}
                className="size-full object-cover"
              />
            </div>

            {rest.length ? (
              <div className={cn("mt-4 grid gap-4", rest.length > 1 && "grid-cols-2")}>
                {rest.map((image) => (
                  <div
                    key={image.src}
                    className="aspect-16/10 w-full overflow-hidden rounded-lg bg-linen"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      width={image.w}
                      height={image.h}
                      style={focal(image.src)}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <Reveal blur={false} stagger={0.08}>
            {/* A position marker only earns its place once there is a list to hold. */}
            {total > 1 ? (
              <p className="label-mono text-clay">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            ) : null}
            <h2 className={cn("display-md", total > 1 && "mt-5")}>{service.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              {service.description}
            </p>

            <div className="rule-line mt-10 space-y-10 pt-10">
              {service.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="display-sm mb-4 max-w-[26ch]">{section.heading}</h3>
                  <div className="space-y-5">
                    {section.parts.map((part, i) => (
                      <Part key={i} part={part} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ActionLink href={site.bookingUrl} external>
                Book a consultation
              </ActionLink>
              {/* The device is credited in text: its only photograph is a
                  product shot on a white ground, which cannot sit in this
                  layout without opening a white hole in the page. */}
              {service.device ? (
                <a
                  href={service.device.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft underline decoration-clay/40 underline-offset-4 transition-colors hover:text-ink"
                >
                  {service.device.name}
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function AestheticServicesPage() {
  const total = aestheticServices.length;

  return (
    <>
      {/* ---------- page opening ---------- */}
      <section className="bg-ivory pb-14 pt-28 md:pb-20 md:pt-36">
        <Container wide>
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
            <div>
              <SectionLabel>Aesthetic services</SectionLabel>
              <TextReveal
                as="h1"
                immediate
                className="display-lg mt-8 max-w-[15ch]"
                lines={["Skin that repairs", "itself."]}
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Our aesthetic work is regenerative rather than cosmetic — treatments that prompt
                your skin to rebuild its own collagen, delivered in {site.city} by a licensed
                aesthetician.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external>
                  Book a consultation
                </ActionLink>
                <ActionLink href={site.phoneHref} variant="outline" withArrow={false}>
                  {site.phone}
                </ActionLink>
              </div>
            </div>

            {/*
              An explicit height at lg rather than stretching to the copy
              column: matching that column made the opening photograph tower
              over the page. 24rem sits it close to the height of the label,
              heading, paragraph and buttons beside it, with `items-end`
              bringing the two to a common baseline.
            */}
            <ParallaxImage
              src={aestheticHero.src}
              alt={aestheticHero.alt}
              width={aestheticHero.w}
              height={aestheticHero.h}
              amount={8}
              zoom={1.06}
              imgStyle={focal(aestheticHero.src)}
              priority
              className="aspect-16/10 w-full rounded-lg lg:aspect-auto lg:h-[24rem]"
            />
          </div>

          {/*
            The index doubles as navigation once the page is long enough to
            need it. With a single treatment it would be a one-row list
            pointing at the section directly below it, so it stays hidden.
          */}
          {total > 1 ? (
            <Reveal
              className="mt-16 grid gap-x-14 border-t border-ink/12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
              blur={false}
              stagger={0.05}
            >
              {aestheticServices.map((s) => (
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
          ) : null}
        </Container>
      </section>

      {/* ---------- one block per treatment ---------- */}
      {aestheticServices.map((service, index) => (
        <TreatmentSection key={service.id} service={service} index={index} total={total} />
      ))}

      {/* ---------- who performs the treatment ---------- */}
      {aesthetician ? (
        <section className="bg-ivory py-16 md:py-24">
          <Container wide>
            <div className="grid items-center gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
              <div className="media-depth-drift aspect-4/5 w-full overflow-hidden rounded-lg bg-linen sm:mx-auto sm:max-w-[400px] lg:mx-0 lg:max-w-none">
                <img
                  src={aesthetician.image}
                  alt={`Portrait of ${aesthetician.name}, ${aesthetician.role}`}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="size-full object-cover object-top"
                />
              </div>

              <div>
                <SectionLabel>Who treats you</SectionLabel>
                <h2 className="display-md mt-8 max-w-[20ch]">{aesthetician.name}</h2>
                <p className="mt-3 text-sm text-clay">{aesthetician.role}</p>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                  {aesthetician.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="max-w-[62ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <ActionLink to="/about" variant="outline">
                    Meet the full team
                  </ActionLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ---------- closing call to action ---------- */}
      <section className="dark-section py-16 md:py-24">
        <Container wide>
          <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
            <TextReveal
              className="display-md max-w-[20ch] text-on-dark"
              lines={["Start with a", "skin consultation."]}
            />
            <div>
              <p className="max-w-md text-base leading-relaxed text-on-dark-soft">
                We assess your skin in person and map the number of sessions your goals actually
                need — no package you did not ask for.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external variant="onDark">
                  Book a consultation
                </ActionLink>
                <ActionLink to="/contact" variant="onDarkOutline" withArrow={false}>
                  Contact the practice
                </ActionLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
