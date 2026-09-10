import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ActionLink } from "@/components/ui/ActionButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/content/thryve";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Thryve Wellness" },
      {
        name: "description",
        content:
          "Call, message or visit Thryve Wellness at 2950 Tamiami Trail North, Naples, Florida — hours, directions and appointment requests.",
      },
      { property: "og:title", content: "Contact — Thryve Wellness" },
      {
        property: "og:description",
        content:
          "Reach Thryve Wellness in Naples, Florida: phone, hours, directions and appointment requests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "mt-2 w-full border-b border-line bg-transparent pb-3 text-base outline-none transition-colors focus:border-accent";

const directions = `https://www.google.com/maps/dir/?api=1&destination=${site.mapQuery}`;

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/*
        Opening: the heading shares its row with the details that people
        actually arrive on this page looking for, so nothing sits empty.
      */}
      <section className="bg-ivory pb-12 pt-28 md:pb-16 md:pt-36">
        <Container wide>
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <TextReveal
                as="h1"
                immediate
                className="display-lg mt-8 max-w-[14ch]"
                lines={["Come and see", "us in Naples."]}
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Book instantly through our scheduler, send us a message below, or simply call — the
                phone is answered at the practice, not by a call centre.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ActionLink href={site.bookingUrl} external>
                  Book online now
                </ActionLink>
                <ActionLink href={site.phoneHref} variant="outline" withArrow={false}>
                  {site.phone}
                </ActionLink>
              </div>
            </div>

            <Reveal className="grid gap-x-10 gap-y-7 sm:grid-cols-2" blur={false} stagger={0.08}>
              <div className="rule-line pt-5">
                <p className="label-mono text-ink-soft">Address</p>
                <div className="mt-3 space-y-1 text-base">
                  {site.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="rule-line pt-5">
                <p className="label-mono text-ink-soft">Hours</p>
                <div className="mt-3 space-y-1 text-base">
                  {site.hours.map((h) => (
                    <p key={h.day}>
                      {h.day}
                      <span className="text-ink-soft"> {h.time}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="rule-line pt-5">
                <p className="label-mono text-ink-soft">Phone</p>
                <div className="mt-3 space-y-1 text-base">
                  <a href={site.phoneHref} className="block transition-colors hover:text-clay">
                    {site.phone}
                  </a>
                  <p className="text-ink-soft">Fax {site.fax}</p>
                </div>
              </div>

              <div className="rule-line pt-5">
                <p className="label-mono text-ink-soft">Follow</p>
                <SocialLinks
                  className="mt-1 -ml-3"
                  linkClassName="text-ink-soft hover:bg-ink/5 hover:text-clay"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- general enquiry ---------- */}
      <section className="bg-sand py-16 md:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <div>
              <h2 className="display-md max-w-[16ch]">Send us a message.</h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
                Ask us anything about our services or membership and we will reply by email. To book
                a time, use the scheduler — it confirms instantly. For anything urgent, call{" "}
                <a href={site.phoneHref} className="text-ink underline decoration-clay/40">
                  {site.phone}
                </a>{" "}
                — please do not use this form for medical emergencies.
              </p>
            </div>

            {sent ? (
              <div className="rule-line pt-8" role="status">
                <h3 className="text-2xl tracking-[-0.025em]">Message sent.</h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
                  Thank you — we will reply by email. To book an appointment straight away, use the
                  online scheduler.
                </p>
                <div className="mt-8">
                  <ActionLink href={site.bookingUrl} external>
                    Book online now
                  </ActionLink>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="label-mono text-ink-soft">
                    Full name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={field} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="label-mono text-ink-soft">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="label-mono text-ink-soft">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} required className={field} />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-clay px-7 text-[0.9375rem] font-medium text-on-dark transition-colors duration-500 ease-cinematic hover:bg-ink"
                  >
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- the map, as a full-width band ---------- */}
      <section className="bg-ivory py-16 md:py-24">
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <SectionLabel>Finding us</SectionLabel>
              <h2 className="display-md mt-8 max-w-[18ch]">On Tamiami Trail, with parking.</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-soft">
              {site.addressLine}. We are in Suite 5, Unit 31, with parking on site directly outside
              the entrance.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-line bg-sand p-3">
            <iframe
              title={`Map showing ${site.name} in Naples, Florida`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full rounded-md grayscale-[0.9] contrast-[0.95] sm:h-[400px] lg:h-[460px]"
              src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
            />
          </div>

          <div className="mt-8">
            <ActionLink href={directions} external variant="outline" withArrow={false}>
              Get directions
            </ActionLink>
          </div>
        </Container>
      </section>

      {/* ---------- closing call to action ---------- */}
      <section className="dark-section py-16 md:py-24">
        <Container wide>
          <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
            <TextReveal
              className="display-md max-w-[18ch] text-on-dark"
              lines={["Ready when", "you are."]}
            />
            <div>
              <p className="max-w-md text-base leading-relaxed text-on-dark-soft">
                New patients are welcome. Book through the scheduler for the fastest confirmation,
                or call the practice during opening hours.
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
