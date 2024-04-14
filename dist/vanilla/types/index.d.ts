import { z } from "zod";
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
declare const products: z.ZodArray<z.ZodObject<{
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
}>, "many">;
type Product = z.infer<typeof product>;
type Metadata = Record<string, any>;
export { product, products };
export type { BaseProps, Product, Metadata };
