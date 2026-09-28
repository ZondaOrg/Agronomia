import type { Iva } from "@/shared/domain/iva/iva";
import type { Product } from "../../domain/product";

export type ProductResponse = Omit<Product, "iva"> & {iva: Iva}