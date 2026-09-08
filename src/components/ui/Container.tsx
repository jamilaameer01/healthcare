import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        wide ? "max-w-[1600px]" : "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
