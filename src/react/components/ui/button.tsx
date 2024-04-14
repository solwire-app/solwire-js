import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "sw-inline-flex sw-items-center sw-justify-center sw-whitespace-nowrap sw-rounded-md sw-text-sm sw-font-medium box-border border-0 border-solid sw-transition-colors focus-visible:sw-outline-none focus-visible:sw-ring-1 focus-visible:sw-ring-ring disabled:sw-pointer-events-none disabled:sw-opacity-50",
  {
    variants: {
      variant: {
        default:
          "sw-bg-primary sw-text-primary-foreground sw-shadow hover:sw-bg-primary/90",
        destructive:
          "sw-bg-destructive sw-text-destructive-foreground sw-shadow-sm hover:sw-bg-destructive/90",
        outline:
          "sw-border sw-border-input sw-bg-background sw-shadow-sm hover:sw-bg-accent hover:sw-text-accent-foreground",
        secondary:
          "sw-bg-secondary sw-text-secondary-foreground sw-shadow-sm hover:sw-bg-secondary/80",
        ghost: "hover:sw-bg-accent hover:sw-text-accent-foreground",
        link: "sw-text-primary sw-underline-offset-4 hover:sw-underline",
      },
      size: {
        default: "sw-h-9 sw-px-4 sw-py-2",
        sm: "sw-h-8 sw-rounded-md sw-px-3 sw-text-xs",
        lg: "sw-h-10 sw-rounded-md sw-px-8",
        icon: "sw-h-9 sw-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
