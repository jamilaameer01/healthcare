import { Link } from "@tanstack/react-router";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="dark-section border-t border-line-dark py-14">
      <Container wide className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-clay" />
            <span className="text-[15px] font-medium tracking-[-0.02em]">Meridian Health</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-on-dark-soft">
            A private clinic built around continuity of care.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-on-dark-soft"
        >
          <a href="/#services" className="hover:text-on-dark">
            Services
          </a>
          <a href="/#specialists" className="hover:text-on-dark">
            Specialists
          </a>
          <Link to="/approach" className="hover:text-on-dark">
            Our approach
          </Link>
          <a href="/#contact" className="hover:text-on-dark">
            Contact
          </a>
          <Link to="/book" className="hover:text-on-dark">
            Book
          </Link>
        </nav>
        <p className="text-xs text-on-dark-soft">© {new Date().getFullYear()} Meridian Health</p>
      </Container>
    </footer>
  );
}
