import { z } from "zod";
import { products as productsSchema, product, type Product } from "@/types";

function validateSolwireSolTag(solTag: string) {
  return /^(\$?[a-zA-Z0-9]{3,30})$/.test(solTag);
}

function validateSolwireProducts(products: Product[]) {
  try {
    productsSchema.parse(products);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { validateSolwireSolTag, validateSolwireProducts };
