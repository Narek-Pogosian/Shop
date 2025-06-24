import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-foreground-muted bg-input field-sizing-content min-h-16 w-full rounded px-3 py-2 text-base outline-0 transition-[color,box-shadow] md:text-sm",
        "disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:ring-ring focus-visible:ring-2",
        "aria-invalid:ring-destructive/70 aria-invalid:outline-destructive/40 aria-invalid:outline-1",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
