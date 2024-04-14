import type { BaseProps, Metadata, Product } from "./types";
type SolwireConfig = BaseProps & {
    redirectUri?: string;
};
export default class Solwire {
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
export {};
