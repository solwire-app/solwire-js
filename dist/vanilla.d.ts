export interface BaseProps {
    redirectUri: string;
    amount?: number;
    address?: string;
    solTag?: string;
    products?: Product[];
    metadata?: Metadata;
}
interface Product {
    id: string;
    name: string;
    description?: string;
    image: string;
}
type Metadata = Record<string, any>;
type SolwireConfig = BaseProps & {
    redirectUri?: string;
};
export declare class Solwire {
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
    setAmount(amount: number): void;
    render(querySelector: string): void;
    generatePaymentLink(): void;
    validateAddress(address: string): boolean;
    private validateAmount;
}
export {};
