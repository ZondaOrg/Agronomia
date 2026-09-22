import z from "zod";
import { ADD_PRODUCT } from "../../adapters/request/api-contract";
import { moneyKeys } from "../../domain/money";
import { ivaKeys } from "../../domain/iva";

const productSchema = z.object({
    [ADD_PRODUCT.name]: z.string().nonempty({ message: "El nombre es obligatorio"}),
    [ADD_PRODUCT.listPrice]: z.string().nonempty({ message: "La lista de precio es obligatorio"}),
    [ADD_PRODUCT.bonification]: z.string().nonempty({ message: "La bonificación es obligatorio"}),
    [ADD_PRODUCT.type]: z.string().nonempty({ message: "Seleccione una tipo de producto" }),
    [ADD_PRODUCT.money]: z.enum(moneyKeys, {error: "Seleccione una moneda"}),
    [ADD_PRODUCT.iva]: z.enum(ivaKeys, {error: "Seleccione el IVA"}),
    [ADD_PRODUCT.freight]: z.string().optional(),
    [ADD_PRODUCT.description]: z.string().optional(),
});


export type AddProductSchema = z.infer<typeof productSchema>;

export default productSchema;