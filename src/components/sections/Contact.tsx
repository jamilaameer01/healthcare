import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionButton";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

const DETAILS = [
  { label: "Address", value: ["Meridian Health", "18 Larkspur Row", "London EC2A 4BX"] },
  { label: "Phone", value: ["+44 20 7946 0182"] },
  { label: "Email", value: ["care@meridianhealth.example"] },
  {
    label: "Opening hours",
    value: ["Mon–Fri · 08:00–19:00", "Saturday · 09:00–14:00", "Sunday · Closed"],
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-ivory py-24 md:py-36">
      <Container wide>
        <p className="label-mono text-clay">Visit</p>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <TextReveal
              className="display-md max-w-[16ch]"
              lines={["A short walk", "from Old Street."]}
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
                    {d.value.map((v) => (
                      <p key={v}>{v}</p>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            <div className="mt-12">
              <ActionLink to="/book">Book an appointment</ActionLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-sand p-3">
            <iframe
              title="Map showing the clinic location in London"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full rounded-md grayscale-[0.9] contrast-[0.95]"
              src="https://www.google.com/maps?q=Old+Street,+London&output=embed"
            />
            <p className="px-1 pb-1 pt-4 text-xs text-ink-soft">
              Nearest station: Old Street · Step-free access on Larkspur Row.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
