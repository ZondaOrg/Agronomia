import z from "zod";
import { ADD_TYPE_PRODUCT } from "../adapter/api-contract";

export const typeProductSchema = z.object({
    [ADD_TYPE_PRODUCT.nameType]: z
        .string()
        .trim()
        .min(1, { message: "El nombre es obligatorio" }),
});
