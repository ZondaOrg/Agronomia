import type { Product } from "./product";

export type EditProduct = Pick<Product, "id" | "name">