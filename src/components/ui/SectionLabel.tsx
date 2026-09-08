import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("label-mono flex items-center gap-3 opacity-70", className)}>
      {index ? <span className="tabular-nums">{index}</span> : null}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}
