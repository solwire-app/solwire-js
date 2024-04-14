import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/utils/cn";
import { buttonVariants } from "./button";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "sw-fixed sw-inset-0 sw-z-50 sw-bg-black/80 sw- data-[state=open]:sw-animate-in data-[state=closed]:sw-animate-out data-[state=closed]:sw-fade-out-0 data-[state=open]:sw-fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "sw-fixed sw-h-fit sw-mx-auto sw-inset-0 sw-z-50 sw-flex sw-items-center sw-justify-center sw-rounded-md md:sw-mt-48",
        className
      )}
      {...props}
    >
      <div className="sw-w-full sw-max-w-lg sw-mx-auto sw-border sw-border-border sw-bg-background sw-p-6 sw-shadow-lg sw-duration-200 sw-rounded-lg data-[state=open]:sw-animate-in data-[state=closed]:sw-animate-out data-[state=closed]:sw-fade-out-0 data-[state=open]:sw-fade-in-0 data-[state=closed]:sw-zoom-out-95 data-[state=open]:sw-zoom-in-95 data-[state=closed]:sw-slide-out-to-left-1/2 data-[state=closed]:sw-slide-out-to-top-[48%] data-[state=open]:sw-slide-in-from-left-1/2 data-[state=open]:sw-slide-in-from-top-[48%]">
        {children}
        <DialogPrimitive.Close className="sw-absolute sw-right-4 box-border border-0 border-solid sw-top-4 sw-rounded-sm sw-opacity-70 sw-ring-offset-background sw-transition-opacity hover:sw-opacity-100 focus:sw-outline-none focus:sw-ring-2 focus:sw-ring-ring focus:sw-ring-offset-2 disabled:sw-pointer-events-none data-[state=open]:sw-bg-accent data-[state=open]:sw-text-muted-foreground">
          <Cross2Icon className="sw-h-4 sw-w-4" />
          <span className="sw-sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sw-flex sw-flex-col sw-space-y-1.5 sw-text-center sm:sw-text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  hideClose?: boolean;
}

const DialogFooter = ({
  className,
  children,
  hideClose,
  ...props
}: DialogFooterProps) => (
  <div
    className={cn(
      "sw-flex sw-flex-col-reverse sw-gap-2 sm:sw-flex-row sm:sw-justify-end",
      className
    )}
    {...props}
  >
    {!hideClose && (
      <DialogPrimitive.Close
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-8 gap-1"
        )}
      >
        Cancel
      </DialogPrimitive.Close>
    )}
    {children}
  </div>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "sw-text-lg sw-font-semibold sw-leading-none sw-tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("sw-text-sm sw-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
