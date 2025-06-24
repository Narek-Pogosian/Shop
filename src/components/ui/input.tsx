import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-foreground-muted selection:bg-primary selection:text-primary-foreground bg-input flex h-9 w-full min-w-0 rounded px-3 py-1 text-base outline-0 transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none md:text-sm",
        "disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:ring-ring focus-visible:ring-2",
        "aria-invalid:ring-destructive/70 aria-invalid:outline-destructive/40 aria-invalid:outline-1",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
