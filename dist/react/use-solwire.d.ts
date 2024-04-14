import type { BaseProps } from "../vanilla";
type solwireHookProps = BaseProps;
export declare function useSolwire(props: solwireHookProps): {
    addresses: {
        validate: (address: string) => boolean;
    };
    links: {
        payment: {
            generate: () => void;
        };
    };
};
export {};
