import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { Container } from "./Container";
import { ActionLink } from "./ActionButton";
import { cn } from "@/lib/utils";
import { site } from "@/content/thryve";
import logo from "@/assets/logo.png";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el || !open || prefersReducedMotion()) return;
    const items = el.querySelectorAll("[data-menu-item]");
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.06 },
      );
    }, el);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-cinematic",
        scrolled && !open ? "border-b border-line bg-ivory" : "border-b border-transparent",
      )}
    >
      <Container
        wide
        className={cn(
          "flex items-center justify-between transition-[height] duration-500 ease-cinematic",
          scrolled ? "h-20" : "h-28 md:h-32",
        )}
      >
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          {/* Logo only — the alt text carries the brand name for assistive tech. */}
          <img
            src={logo}
            alt={site.name}
            width={512}
            height={512}
            className={cn(
              "w-auto transition-[height] duration-500 ease-cinematic",
              scrolled ? "h-16" : "h-24 md:h-28",
            )}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) =>
            l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ActionLink
            href={site.bookingUrl}
            external
            className="hidden h-11 min-h-11 md:inline-flex"
            withArrow={false}
          >
            Book now
          </ActionLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-current transition-transform duration-500",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-current transition-transform duration-500",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div ref={menuRef} className="fixed inset-0 top-0 z-40 bg-ivory pt-32 lg:hidden">
          <Container className="flex h-full flex-col justify-between pb-12">
            <nav aria-label="Mobile" className="flex flex-col">
              {LINKS.map((l) => (
                <div key={l.label} data-menu-item className="rule-line">
                  {l.to ? (
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="font-display block py-5 text-[clamp(1.9rem,8vw,2.75rem)] font-medium tracking-[-0.04em]"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display block py-5 text-[clamp(1.9rem,8vw,2.75rem)] font-medium tracking-[-0.04em]"
                    >
                      {l.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
            <div data-menu-item className="space-y-4">
              <ActionLink
                href={site.bookingUrl}
                external
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book an appointment
              </ActionLink>
              <a href={site.phoneHref} className="block text-sm text-ink-soft">
                {site.phone}
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
