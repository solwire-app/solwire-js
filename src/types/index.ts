import { z } from "zod";

interface BaseProps {
  redirectUri: string;
  amount?: number;
  address?: string;
  solTag?: string;
  products?: Product[];
  metadata?: Metadata;
}

const product = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().default(0).optional(),
});

const products = z.array(product);

type Product = z.infer<typeof product>;

type Metadata = Record<string, any>;

export { product, products };
export type { BaseProps, Product, Metadata };
