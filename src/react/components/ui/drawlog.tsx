import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { Drawer as DrawerPrimitive } from "vaul";
import * as React from "react";

import { useWindowSize } from "../../lib/hooks/use-window-size";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const Drawlog = ({
  ...props
}: React.ComponentProps<
  typeof DialogPrimitive.Root | typeof DrawerPrimitive.Root
>) => {
  const { isMobile } = useWindowSize();

  return <div>{isMobile ? <Drawer {...props} /> : <Dialog {...props} />}</div>;
};
Drawlog.displayName = "Drawlog";

const DrawlogTrigger = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
  const { isMobile } = useWindowSize();

  return isMobile ? <DrawerTrigger {...props} /> : <DialogTrigger {...props} />;
};
DrawlogTrigger.displayName = "DrawlogTrigger";

const DrawlogPortal = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? <DrawerPortal {...props} /> : <DialogPortal {...props} />}
    </div>
  );
};
DrawlogPortal.displayName = "DrawlogPortal";

const DrawlogOverlay = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? <DrawerOverlay {...props} /> : <DialogOverlay {...props} />}
    </div>
  );
};

const DrawlogContent = React.forwardRef<
  React.ElementRef<
    typeof DrawerPrimitive.Content | typeof DialogPrimitive.Content
  >,
  React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Content | typeof DialogPrimitive.Content
  > & { onAnimationEnd?: (open: boolean) => void }
>(({ children, ...props }, ref) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? (
        <DrawerContent ref={ref} {...props} className="sw-max-h-[90%]">
          <div className="sw-overflow-y-auto sw-px-6 sw-pb-6 sw-text-left [&::-webkit-scrollbar]:[width:0px]">
            {children}
          </div>
        </DrawerContent>
      ) : (
        <DialogContent ref={ref} {...props}>
          {children}
        </DialogContent>
      )}
    </div>
  );
});
DrawlogContent.displayName = "DrawlogContent";

// Repeat the same pattern for other components...

const DrawlogHeader = ({
  ...props
}: React.ComponentProps<typeof DialogHeader>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? <DrawerHeader {...props} /> : <DialogHeader {...props} />}
    </div>
  );
};

const DrawlogFooter = ({
  ...props
}: React.ComponentProps<typeof DialogFooter>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? (
        <DrawerFooter {...props} className="sw-p-0" />
      ) : (
        <DialogFooter {...props} />
      )}
    </div>
  );
};

const DrawlogTitle = ({
  ...props
}: React.ComponentProps<typeof DialogTitle>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? <DrawerTitle {...props} /> : <DialogTitle {...props} />}
    </div>
  );
};

const DrawlogDescription = ({
  ...props
}: React.ComponentProps<typeof DialogDescription>) => {
  const { isMobile } = useWindowSize();

  return (
    <div>
      {isMobile ? (
        <DrawerDescription {...props} />
      ) : (
        <DialogDescription {...props} />
      )}
    </div>
  );
};

export {
  Drawlog,
  DrawlogContent,
  DrawlogDescription,
  DrawlogFooter,
  DrawlogHeader,
  DrawlogOverlay,
  DrawlogPortal,
  DrawlogTitle,
  DrawlogTrigger,
};
