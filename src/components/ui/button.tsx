import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-semibold transition-[color, box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-btn-primary",
        brand:
          "bg-brand-500 hover:bg-brand-600 text-brand-foreground shadow-btn-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        danger:
          "bg-danger-500 hover:bg-danger-600 text-danger-foreground shadow-btn-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-danger-500",
        secondary:
          "bg-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background hover:bg-secondary-hover shadow-btn-secondary",
        ghost: "hover:bg-accent",
        link: "hover:underline",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "py-1.5 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "py-2.5 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  children,
  disabled,
  loading,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
