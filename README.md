# Solwire SDK

Solwire React & Vanilla JS SDK to help developers build on the Solwire API!

Published on [GitHub](https://github.com/solwire-app/solwire-js)

The purpose of this is to allow developers to quickly and easily access the Solwire API and develop their own projects with the [Solwire Pay](https://pay.solwire.app) payments solution.

## Directory

- [Before Installation](#before-installation)

- [Getting Started](#getting-started-with-the-solwire-sdk)

- [Render Components](#render-components)

- [Examples](#examples)

## Before Installation

Make sure you are on the latest version of Node.js. If not download the latest version [here]("https://nodejs.org/en/").

In addition to Node JS, make sure to have the latest version of TypeScript installed by running the command:

> ```bash
> npm install typescript --save-dev
> ```

To begin using the Solwire SDK install the required packages:

> ```bash
> npm install @solwire/solwire-js --save-dev
> ```

**NOTE:** The Solwire SDK currently provides hooks and components for development with React. Alternatively, you can retrieve the Solwire Vanilla JS version via the [jsDelivr CDN](https://cdn.jsdelivr.net/gh/solwire-app/solwire-js/dist/vanilla/index.js).

## Getting Started with the Solwire SDK

To simplify things, we are implementing Solwire in a Next 14 project. We also have a handful of example implementations available [here](https://github.com/solwire-app/solwire-js/tree/main/examples). To initialize the Solwire SDK, wrap your layout children in the provided context provider.

```Javascript

"use client"

import { SolwireProvider } from  "@solwire/solwire-js/react";

// Wrapping layout children with `SolwireProvider` context provider

export default function Layout({
children
}: Readonly<{ children: React.ReactNode; }>) {
	return (
		<SolwireProvider>{children}</SolwireProvider>
	);
}

```

## Render Components

### Using PayWithSolwire

Get started with Solwire by using `PayWithSolwire`. Renders a dialog/drawer component, which redirect's customers to [Solwire Pay](https://dash.solwire.app/pay) to finalize their transaction.

```Javascript

"use client"

import { PayWithSolwire } from "@solwire/solwire-js/react";

export function PaymentHandler({
	redirectUri,
	amount,
	address,
	solTag,
	products,
	metadata,
}:  PayWithSolwireProps) {
	return (
		<PayWithSolwire
		 // The redirect URI to which the payer is redirected after successful payment
		 redirectUri={redirectUri}
		 // Amount to pay in SOL. Either total amount or added to total price of products
		 amount={amount}
		 // Address of the payee's Solana wallet
		 address={address}
		 // Unique SolTag on Solwire, comparable to usernames. Alternative to address
		 solTag={solTag}
		 // Optional Arguments
		 // Array of products the payer purchases, rendered on Solwire Pay
		 products={products}
		 // Any Metadata, stored for further purposes
		 metadata={metadata}
		/>
	)
}

```

See [Example](https://github.com/solwire-app/solwire-js/tree/main/examples/next) of this in action!

## Examples

See our examples for the implementation of the Solwire SDK in [Next](https://github.com/solwire-app/solwire-js/tree/main/examples/next) and [Vanilla JS](https://github.com/solwire-app/solwire-js/tree/main/examples/vanilla-js).

## Documentation

If you have more questions about the Solwire SDK or for more information and documentation, please visit https://docs.solwire.app.

## Contributing

If you would like to contribute to the package, please submit a pull request with a detailed explanation of your changes. For bug reports, please open an issue on GitHub.
