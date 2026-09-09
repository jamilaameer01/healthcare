import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ActionLink } from "@/components/ui/ActionButton";
import { services, site } from "@/content/thryve";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an appointment — Thryve Wellness" },
      {
        name: "description",
        content:
          "Request an appointment at Thryve Wellness in Naples, Florida, or book instantly through our online scheduler.",
      },
      { property: "og:title", content: "Book an appointment — Thryve Wellness" },
      {
        property: "og:description",
        content: "Request an appointment at Thryve Wellness in Naples, Florida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const AREAS = services.map((s) => s.title);

const field =
  "mt-2 w-full border-b border-line bg-transparent pb-3 text-base outline-none transition-colors focus:border-accent";

function BookPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-ivory pb-28 pt-40 md:pt-52">
      <Container wide className="grid gap-16 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <SectionLabel>Appointments</SectionLabel>
          <h1 className="display-md mt-8 max-w-[14ch]">Request a time that suits you.</h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
            Book instantly through our online scheduler, or send a request below and we will be in
            touch. For anything urgent, call{" "}
            <a href={site.phoneHref} className="text-ink underline decoration-clay/40">
              {site.phone}
            </a>
            .
          </p>

          <div className="mt-9">
            <ActionLink href={site.bookingUrl} external>
              Book online now
            </ActionLink>
          </div>

          <dl className="mt-12 space-y-5 text-sm">
            <div className="rule-line pt-5">
              <dt className="label-mono text-ink-soft">Address</dt>
              <dd className="mt-2">{site.addressLine}</dd>
            </div>
            <div className="rule-line pt-5">
              <dt className="label-mono text-ink-soft">Hours</dt>
              <dd className="mt-2">
                {site.hours.map((h) => (
                  <p key={h.day}>
                    {h.day} · {h.time}
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {sent ? (
          <div className="rule-line pt-8" role="status">
            <h2 className="text-2xl tracking-[-0.025em]">Request received.</h2>
            <p className="mt-4 max-w-sm text-base text-ink-soft">
              Thank you — we will be in touch to confirm a time. You can also book instantly through
              our online scheduler.
            </p>
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
            <div className="sm:col-span-1">
              <label htmlFor="phone" className="label-mono text-ink-soft">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="area" className="label-mono text-ink-soft">
                Care area
              </label>
              <select id="area" name="area" className={field} defaultValue={AREAS[0]}>
                {AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="label-mono text-ink-soft">
                Anything we should know
              </label>
              <textarea id="notes" name="notes" rows={4} className={field} />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-full bg-navy px-7 text-sm font-medium text-on-dark transition-colors hover:bg-ink"
              >
                Send request
              </button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
