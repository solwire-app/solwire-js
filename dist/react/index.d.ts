import React from 'react';
import { z } from 'zod';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface BaseProps {
    redirectUri: string;
    amount?: number;
    address?: string;
    solTag?: string;
    products?: Product[];
    metadata?: Metadata;
}
declare const product: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    price?: number | undefined;
}, {
    name: string;
    id?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    price?: number | undefined;
}>;
type Product = z.infer<typeof product>;
type Metadata = Record<string, any>;

interface SolwireProviderProps {
    children: React.ReactNode;
}
declare function SolwireProvider({ children }: SolwireProviderProps): react_jsx_runtime.JSX.Element;

type solwireHookProps = BaseProps;
declare function useSolwire(props: solwireHookProps): {
    addresses: {
        validate: (address: string) => boolean;
    };
    links: {
        payment: {
            generate: () => string;
            open: (link: string) => void;
        };
    };
    products: {
        validate: (products: Product[]) => boolean;
    };
};

type PayWithSolwireProps = BaseProps;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, PayWithSolwireProps {
}
declare const PayWithSolwire: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { type ButtonProps, PayWithSolwire, type PayWithSolwireProps, SolwireProvider, useSolwire };
