import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { site } from "@/content/thryve";
import logo from "@/assets/logo.png";

const SOCIALS = [
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: site.facebook },
  { label: "TikTok", href: site.tiktok },
];

export function Footer() {
  return (
    <footer className="dark-section border-t border-line-dark py-14">
      <Container wide>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr] md:gap-12">
          <div>
            {/* The full lockup reads properly at this size, on the dark ground. */}
            <img
              src={logo}
              alt={site.name}
              width={512}
              height={512}
              loading="lazy"
              className="h-24 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-on-dark-soft">{site.tagline}</p>
            <p className="mt-5 text-sm text-on-dark-soft">{site.address.join(", ")}</p>
          </div>

          <div className="text-sm text-on-dark-soft">
            <p className="label-mono text-clay-soft">Contact</p>
            <a href={site.phoneHref} className="mt-4 block hover:text-on-dark">
              {site.phone}
            </a>
            <p className="mt-1">Fax {site.fax}</p>
            <p className="mt-4">
              {site.hours[0]?.day} · {site.hours[0]?.time}
            </p>
          </div>

          <nav aria-label="Footer" className="text-sm text-on-dark-soft">
            <p className="label-mono text-clay-soft">Explore</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/services" className="hover:text-on-dark">
                Medical services
              </Link>
              <a href="/#tools" className="hover:text-on-dark">
                Membership
              </a>
              <a href="/#team" className="hover:text-on-dark">
                About the practice
              </a>
              <a href="/#contact" className="hover:text-on-dark">
                Visit us
              </a>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-on-dark"
              >
                Book an appointment
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-on-dark-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-on-dark"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
