import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center cursor-pointer whitespace-nowrap rounded text-sm font-semibold transition-[color,box-shadow,background-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/70 focus-visible:ring-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-primary focus-visible:ring-primary/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15",
        ghost: "hover:bg-black/10 dark:hover:bg-white/10",
        outline: "hover:bg-black/10 dark:hover:bg-white/10 border",
        link: "text-primary-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "py-1.5 gap-1.5 px-2.5 has-[>svg]:px-2",
        lg: "px-6 py-2.5 has-[>svg]:px-4 text-lg",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
