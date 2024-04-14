import React from "react";

import type { BaseProps, Product } from "../types";
import Solwire from "../vanilla";
import { SolwireContext } from "./context-provider";

type solwireHookProps = BaseProps;

export function useSolwire(props: solwireHookProps) {
  const context = React.useContext(SolwireContext);
  if (context === undefined) {
    throw new Error("useSolwire must be used within SolwireProvider.");
  }

  const solwire = new Solwire(props);

  return {
    addresses: {
      validate: (address: string) => solwire.validateAddress(address),
    },
    links: {
      payment: {
        generate: () => solwire.generatePaymentLink(),
        open: (link: string) => solwire.openPaymentLink(link),
      },
    },
    products: {
      validate: (products: Product[]) => solwire.validateProducts(products),
    },
  };
}
