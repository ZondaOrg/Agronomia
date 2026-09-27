import type { Optional } from "../../../domain/optional";

export type OptionalRequest = 
    Omit<Optional, "id" | "price"> & 
    { price: number }