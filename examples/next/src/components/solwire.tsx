"use client";

import { PayWithSolwire, PayWithSolwireProps } from "@solwire/solwire-js/react";

export function Solwire({
  redirectUri,
  amount,
  address,
  solTag,
  products,
  metadata,
}: PayWithSolwireProps) {
  const PRODUCTS = [
    {
      id: "1",
      name: "Dog Wif Hat",
      image: "https://dogwifcoin.org/wp-content/uploads/2023/11/wif_hat.jpg",
      description: "WIF isn't literally just a dog with a hat.",
      price: 0.1,
    },
  ];

  return (
    <PayWithSolwire
      redirectUri="http://example.com/success"
      solTag="raccoon"
      products={PRODUCTS}
    />
  );
}
