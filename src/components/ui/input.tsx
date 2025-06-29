import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-foreground-muted bg-input shadow-input h-9 w-full min-w-0 rounded px-3 py-1 text-sm outline-0 transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:ring-ring focus-visible:outline-ring focus-visible:ring-2 focus-visible:outline-1",
        "aria-invalid:ring-danger-500/50 aria-invalid:outline-danger-500/50 aria-invalid:outline-1",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
