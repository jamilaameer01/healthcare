import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionButton";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { site } from "@/content/thryve";

const DETAILS = [
  { label: "Address", value: site.address },
  { label: "Phone", value: [site.phone] },
  { label: "Fax", value: [site.fax] },
  { label: "Hours", value: site.hours.map((h) => `${h.day} · ${h.time}`) },
];

const SOCIALS = [
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: site.facebook },
  { label: "TikTok", href: site.tiktok },
];

export function Contact() {
  return (
    <section id="contact" className="bg-ivory py-16 md:py-24">
      <Container wide>
        <p className="label-mono text-clay">Visit</p>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <TextReveal
              className="display-md max-w-[16ch]"
              lines={["On Tamiami Trail,", "in Naples."]}
            />

            <Reveal
              className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2"
              blur={false}
              stagger={0.08}
            >
              {DETAILS.map((d) => (
                <div key={d.label} className="rule-line pt-5">
                  <p className="label-mono text-ink-soft">{d.label}</p>
                  <div className="mt-3 space-y-1 text-base">
                    {d.label === "Phone" ? (
                      <a href={site.phoneHref} className="block transition-colors hover:text-clay">
                        {site.phone}
                      </a>
                    ) : (
                      d.value.map((v) => <p key={v}>{v}</p>)
                    )}
                  </div>
                </div>
              ))}
            </Reveal>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <ActionLink href={site.bookingUrl} external>
                Book an appointment
              </ActionLink>
              <ActionLink
                href={`https://www.google.com/maps/dir/?api=1&destination=${site.mapQuery}`}
                external
                variant="outline"
                withArrow={false}
              >
                Get directions
              </ActionLink>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-soft">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-clay"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-sand p-3">
            <iframe
              title={`Map showing ${site.name} in Naples, Florida`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full rounded-md grayscale-[0.9] contrast-[0.95]"
              src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
            />
            <p className="px-1 pb-1 pt-4 text-xs text-ink-soft">
              {site.addressLine} · Parking on site.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
