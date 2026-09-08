import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "onDark" | "onDarkOutline";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-medium transition-[background-color,color,border-color,transform,opacity] duration-500 ease-cinematic will-change-transform";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-on-dark hover:bg-clay",
  outline: "border border-ink/20 text-ink hover:border-ink/60",
  ghost: "px-0 text-ink hover:text-clay",
  onDark: "bg-on-dark text-ink hover:bg-clay-soft",
  onDarkOutline: "border border-white/25 text-on-dark hover:border-on-dark",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn(
        "size-4 transition-transform duration-500 ease-cinematic group-hover:translate-x-1",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ActionLink({
  to,
  href,
  children,
  variant = "solid",
  className,
  withArrow = true,
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href ?? "#"} className={classes} onClick={onClick}>
      {content}
    </a>
  );
}
