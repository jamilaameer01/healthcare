import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { imageAt, mission, missionClose, partners, serviceById, site, team } from "@/content/thryve";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Thryve Wellness" },
      {
        name: "description",
        content:
          "Meet the team behind Thryve Wellness in Naples, Florida, and the certified partners whose testing and technology we use.",
      },
      { property: "og:title", content: "About — Thryve Wellness" },
      {
        property: "og:description",
        content:
          "A concierge-level wellness practice in Naples, Florida — the team, the mission and our certified partners.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApproachPage,
});

/* The Direct Primary Care model, in the practice's own terms. */
const PRINCIPLES = [
  {
    id: "01",
    title: "Access, not appointments won",
    copy: "Same-day or next-day appointments, with direct phone, text or email access to your provider.",
  },
  {
    id: "02",
    title: "Time that isn't rationed",
    copy: "Extended, unhurried visits — because insurance is not dictating visit length or treatment decisions.",
  },
  {
    id: "03",
    title: "Transparent membership",
    copy: "One simple monthly fee: no copays, no surprise bills, and discounted labs and medications.",
  },
  {
    id: "04",
    title: "Precision before prescription",
    copy: "Comprehensive lab testing and clinical evaluation identify what your body needs to respond.",
  },
];

function ApproachPage() {
  return (
    <>
      <section className="bg-ivory pb-20 pt-40 md:pb-24 md:pt-52">
        <Container wide>
          <SectionLabel>About the practice</SectionLabel>
          <Reveal as="h1" className="display-lg mt-10 max-w-[18ch]" stagger={0.13}>
            <span className="block">Refined wellness.</span>
            <span className="block">Elevated results.</span>
          </Reveal>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">{mission}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{missionClose}</p>
        </Container>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-12 md:grid-cols-2" blur={false} stagger={0.1}>
            {PRINCIPLES.map((p) => (
              <div key={p.id} className="rule-line pt-6">
                <span className="label-mono text-ink-soft">{p.id}</span>
                <h2 className="mt-4 text-2xl tracking-[-0.025em]">{p.title}</h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">{p.copy}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ---------- the team, with full bios ---------- */}
      <section className="bg-ivory py-16 md:py-24">
        <Container wide>
          <SectionLabel>The team</SectionLabel>

          <div className="mt-12 space-y-20 md:space-y-28">
            {team.map((member, i) => (
              <Reveal
                key={member.name}
                className={`grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                }`}
                blur={false}
                stagger={0.08}
              >
                <div className="media-depth-drift aspect-4/5 w-full overflow-hidden rounded-lg bg-linen sm:mx-auto sm:max-w-[420px] lg:mx-0 lg:max-w-none">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    loading="lazy"
                    width={1200}
                    height={1500}
                    className="size-full object-cover object-top"
                  />
                </div>

                <div>
                  <h2 className="display-sm">{member.name}</h2>
                  <p className="mt-2 text-sm text-clay">{member.role}</p>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="max-w-[62ch]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- certified partners ---------- */}
      <section className="bg-sand py-16 md:py-20">
        <Container wide>
          <SectionLabel>Certified partners</SectionLabel>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            The testing and technology behind our treatment plans.
          </p>

          <Reveal className="mt-12 flex flex-wrap gap-5" blur={false} stagger={0.1}>
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-[180px] flex-col items-center gap-4 rounded-lg border border-line bg-white p-6 transition-colors duration-500 ease-cinematic hover:border-clay/40"
              >
                <img src={p.image} alt="" loading="lazy" className="h-16 w-full object-contain" />
                <span className="text-center text-sm leading-snug text-ink-soft transition-colors duration-500 group-hover:text-ink">
                  {p.name}
                </span>
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <Container wide className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={imageAt(serviceById("direct-primary-care"), 3).src}
            alt={imageAt(serviceById("direct-primary-care"), 3).alt}
            loading="lazy"
            width={1200}
            height={900}
            className="w-full rounded-lg border border-line object-cover"
          />
          <div>
            <h2 className="display-md max-w-[18ch]">Membership, not transactions.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              {serviceById("direct-primary-care").description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink href={site.bookingUrl} external>
                Book an appointment
              </ActionLink>
              <ActionLink href={site.phoneHref} variant="outline" withArrow={false}>
                {site.phone}
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
