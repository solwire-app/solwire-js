import { z } from 'zod';

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

type SolwireConfig = BaseProps & {
    redirectUri?: string;
};
declare class Solwire {
    redirectUri: string;
    address?: string;
    amount?: number;
    solTag?: string;
    products?: Product[];
    metadata?: Metadata;
    SOL_MIN_AMOUNT: number;
    CONTRACT_ADDRESS: string;
    constructor(config: SolwireConfig);
    private init;
    setAddress(address: string): void;
    setSolTag(solTag: string): void;
    setAmount(amount: number): void;
    setProducts(products: Product[]): void;
    setMetadata(metadata: Metadata): void;
    render(querySelector: string): void;
    generatePaymentLink(): string;
    openPaymentLink(link: string): void;
    validateAddress(address: string): boolean;
    private validateSolTag;
    private validateAmount;
    validateProducts(products: Product[]): boolean;
}

export { Solwire as default };
