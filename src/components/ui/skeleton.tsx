import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded bg-neutral-200 dark:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
