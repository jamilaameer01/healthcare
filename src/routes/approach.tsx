import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { ActionLink } from "@/components/ui/ActionButton";
import texture2 from "@/assets/texture-2.jpg";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our approach — Meridian Health" },
      {
        name: "description",
        content:
          "How Meridian Health practises medicine: small patient lists, longer appointments, one shared record and care planned in years rather than visits.",
      },
      { property: "og:title", content: "Our approach — Meridian Health" },
      {
        property: "og:description",
        content:
          "Small patient lists, longer appointments and continuity of care from one named physician.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApproachPage,
});

const PRINCIPLES = [
  {
    id: "01",
    title: "Time as clinical infrastructure",
    copy: "Standard appointments run 45 minutes. Most diagnostic misses begin as a conversation that was cut short.",
  },
  {
    id: "02",
    title: "One named physician",
    copy: "You are not routed to whoever is free. Your physician stays with you across years and coordinates every referral.",
  },
  {
    id: "03",
    title: "A single record",
    copy: "Imaging, labs and notes live in one longitudinal file that every clinician in the building can read.",
  },
  {
    id: "04",
    title: "Prevention as default",
    copy: "Annual review, screening and risk mapping are part of membership rather than an upsell.",
  },
];

function ApproachPage() {
  return (
    <>
      <section className="bg-ivory pb-24 pt-40 md:pb-32 md:pt-52">
        <Container wide>
          <SectionLabel>Our approach</SectionLabel>
          <Reveal as="h1" className="display-lg mt-10 max-w-[18ch]" stagger={0.13}>
            <span className="block">Medicine practised</span>
            <span className="block">at conversational speed.</span>
          </Reveal>
          <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink-soft">
            Meridian was founded by four clinicians who wanted to run a practice where the schedule
            served the patient rather than the other way round.
          </p>
        </Container>
      </section>

      <section className="bg-sand py-24 md:py-32">
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

      <section className="bg-ivory py-24 md:py-32">
        <Container wide className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={texture2}
            alt="Daylight falling across a linen curtain in a consultation room"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full border border-line object-cover"
          />
          <div>
            <h2 className="display-md max-w-[16ch]">Membership, not transactions.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Care is billed annually so that a phone call, a second opinion or a quick question
              never carries a price tag that discourages asking.
            </p>
            <div className="mt-10">
              <ActionLink to="/book">Book an appointment</ActionLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
