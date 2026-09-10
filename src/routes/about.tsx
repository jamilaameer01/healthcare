import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { ActionLink } from "@/components/ui/ActionButton";
/* Not `facility.jpg`: that one already opens the services page. */
import space from "@/assets/space-1.jpg";
import {
  imageAt,
  mission,
  missionClose,
  partners,
  serviceById,
  site,
  team,
} from "@/content/thryve";

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
  component: AboutPage,
});

/*
 * The Direct Primary Care model, in the practice's own terms. These are four
 * parallel commitments rather than a sequence, so they carry no step numbers —
 * the hairline and the heading do the structural work.
 */
const PRINCIPLES = [
  {
    title: "Access, not appointments won",
    copy: "Same-day or next-day appointments, with direct phone, text or email access to your provider.",
  },
  {
    title: "Time that isn't rationed",
    copy: "Extended, unhurried visits — because insurance is not dictating visit length or treatment decisions.",
  },
  {
    title: "Transparent membership",
    copy: "One simple monthly fee: no copays, no surprise bills, and discounted labs and medications.",
  },
  {
    title: "Precision before prescription",
    copy: "Comprehensive lab testing and clinical evaluation identify what your body needs to respond.",
  },
];

const dpc = serviceById("direct-primary-care");

function AboutPage() {
  return (
    <>
      {/*
        Opening: copy and photograph share the row, so the page never opens on
        an empty band the way it did when the heading stood alone here.
      */}
      <section className="bg-ivory pb-14 pt-28 md:pb-20 md:pt-36">
        <Container wide>
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
            <div>
              <SectionLabel>About the practice</SectionLabel>
              <TextReveal
                as="h1"
                immediate
                className="display-lg mt-8 max-w-[16ch]"
                lines={["A practice built", "around you."]}
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">{mission}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external>
                  Book an appointment
                </ActionLink>
                <ActionLink to="/services" variant="outline" withArrow={false}>
                  See our services
                </ActionLink>
              </div>
            </div>

            {/*
              An explicit height at lg, so the photograph finishes on the same
              baseline as the label, heading, paragraph and buttons beside it
              rather than running past them.
            */}
            <ParallaxImage
              src={space}
              alt="The daylit reception area at the practice"
              width={1408}
              height={1008}
              amount={8}
              zoom={1.06}
              priority
              className="aspect-16/10 w-full rounded-lg lg:aspect-auto lg:h-[26rem]"
            />
          </div>
        </Container>
      </section>

      {/* ---------- the commitment, in the practice's own words ---------- */}
      <section className="bg-sand py-16 md:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <TextReveal
              as="h2"
              className="display-md max-w-[20ch]"
              lines={["Care that starts", "with listening."]}
            />
            <div>
              <p className="text-lg leading-relaxed text-ink">{missionClose}</p>
              <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-ink-soft">
                {dpc.description}
              </p>
            </div>
          </div>

          <Reveal
            className="mt-16 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2"
            blur={false}
            stagger={0.1}
          >
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rule-line pt-6">
                <h3 className="text-2xl tracking-[-0.025em]">{p.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">{p.copy}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ---------- the team, with full bios ---------- */}
      <section id="team" className="scroll-mt-28 bg-ivory py-16 md:py-24">
        {/* Held in from the edges, the way each category on the services page
            is — the bios read as a column rather than running the full width. */}
        <Container wide className="lg:px-20 xl:px-28">
          <SectionLabel>The team</SectionLabel>
          <h2 className="display-md mt-8 max-w-[22ch]">The people you actually see.</h2>

          <div className="mt-14 space-y-20 md:mt-16 md:space-y-28">
            {team.map((member) => (
              /*
                The portrait keeps to one side for every member rather than
                alternating, and holds still while the bio beside it scrolls —
                the arrangement the services page uses. Alternating sides meant
                mirroring the grid template on every other row, and the two
                columns never settled at the same height.

                The grid is a plain element and only the bio is wrapped in
                `Reveal`, exactly as the services page keeps `ServiceImages`
                outside it: the reveal animates its children's transforms, and
                a transform on the sticky column would fight its own offset as
                it pins.
              */
              <div
                key={member.name}
                className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[320px_1fr] lg:gap-14"
              >
                <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:sticky lg:top-28 lg:self-start">
                  <div className="media-depth-drift aspect-4/5 w-full overflow-hidden rounded-lg bg-linen">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      loading="lazy"
                      width={1200}
                      height={1500}
                      className="size-full object-cover object-top"
                    />
                  </div>
                </div>

                <Reveal blur={false} stagger={0.08}>
                  <h3 className="display-sm">{member.name}</h3>
                  <p className="mt-2 text-sm text-clay">{member.role}</p>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="max-w-[62ch]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/*
        ---------- certified partners ----------

        Deliberately the quietest block on the page: supporting credentials
        rather than a headline, so it runs at the small type scale with tighter
        padding and smaller cards than the sections above it.
      */}
      <section className="bg-sand py-12 md:py-16">
        <Container wide>
          <div className="mx-auto max-w-xl text-center">
            <SectionLabel className="justify-center">Certified partners</SectionLabel>
            <h2 className="display-sm mt-5">The testing behind every plan.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We treat from data, not guesswork. These are the laboratories and technologies whose
              certification and results our treatment plans are built on.
            </p>
          </div>

          {/*
            One centred row, every mark on the same baseline. The three are a
            wide wordmark, a square seal and a photograph, so the tiles are a
            fixed size and the marks are contained inside a fixed-height band
            within them — that band, not the artwork, is what makes them line
            up with each other. White, because two of the three carry their own
            white ground.
          */}
          <Reveal
            className="mt-10 flex flex-wrap items-stretch justify-center gap-4"
            blur={false}
            stagger={0.1}
          >
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-[168px] flex-col items-center gap-3 rounded-lg border border-line bg-white p-5 transition-colors duration-500 ease-cinematic hover:border-clay/40"
              >
                <span className="flex h-14 w-full items-center justify-center">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="max-h-14 w-auto max-w-full object-contain"
                  />
                </span>
                <span className="text-center text-xs leading-snug text-ink-soft transition-colors duration-500 group-hover:text-ink">
                  {p.name}
                </span>
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      {/*
        ---------- membership, closing on the dark ground ----------

        A closing note rather than a second headline: the narrower image
        column and the small display size keep it from competing with the
        page's opening statement.
      */}
      <section className="dark-section py-12 md:py-16">
        <Container wide>
          <div className="grid items-center gap-8 lg:grid-cols-[0.62fr_1fr] lg:gap-12">
            <img
              src={imageAt(dpc, 3).src}
              alt={imageAt(dpc, 3).alt}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
            <div>
              <TextReveal
                as="h2"
                className="display-sm max-w-[22ch] text-on-dark"
                lines={["Membership, not transactions."]}
              />
              <p className="mt-4 max-w-md text-base leading-relaxed text-on-dark-soft">
                One monthly fee covers unlimited access to your provider, with discounted labs and
                medications and no surprise bills.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external variant="onDark">
                  Book an appointment
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
