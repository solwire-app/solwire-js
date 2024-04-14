import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { Drawer as DrawerPrimitive } from "vaul";
import * as React from "react";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
declare const Drawlog: {
    ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root | typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawlogTrigger: {
    ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawlogPortal: {
    ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawlogOverlay: ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => import("react/jsx-runtime").JSX.Element;
declare const DrawlogContent: React.ForwardRefExoticComponent<((Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    onAnimationEnd?: ((open: boolean) => void) | undefined;
} & React.RefAttributes<HTMLDivElement>, "ref">) & {
    onAnimationEnd?: ((open: boolean) => void) | undefined;
}) & React.RefAttributes<HTMLDivElement>>;
declare const DrawlogHeader: ({ ...props }: React.ComponentProps<typeof DialogHeader>) => import("react/jsx-runtime").JSX.Element;
declare const DrawlogFooter: ({ ...props }: React.ComponentProps<typeof DialogFooter>) => import("react/jsx-runtime").JSX.Element;
declare const DrawlogTitle: ({ ...props }: React.ComponentProps<typeof DialogTitle>) => import("react/jsx-runtime").JSX.Element;
declare const DrawlogDescription: ({ ...props }: React.ComponentProps<typeof DialogDescription>) => import("react/jsx-runtime").JSX.Element;
export { Drawlog, DrawlogContent, DrawlogDescription, DrawlogFooter, DrawlogHeader, DrawlogOverlay, DrawlogPortal, DrawlogTitle, DrawlogTrigger, };
