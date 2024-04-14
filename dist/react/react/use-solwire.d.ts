import type { BaseProps, Product } from "../types";
type solwireHookProps = BaseProps;
export declare function useSolwire(props: solwireHookProps): {
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
export {};
