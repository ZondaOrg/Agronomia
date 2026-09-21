import z from "zod";
import { ADD_PRODUCT } from "../adapters/request/api-contract";

const productSchema = z.object({
    [ADD_PRODUCT.name]: z.string().nonempty({ message: "El nombre es obligatorio"}),
    [ADD_PRODUCT.listPrice]: z.number({ message: "La lista de precio es obligatorio"}),
    [ADD_PRODUCT.bonification]: z.number({ message: "La bonificación es obligatorio"}),
    [ADD_PRODUCT.type]: z.string().nonempty({ message: "Seleccione una tipo de producto" }),
    [ADD_PRODUCT.money]: z.string().nonempty({ message: "Seleccione una moneda" }),
    [ADD_PRODUCT.iva]: z.string().nonempty({ message: "Seleccione IVA" }),
    [ADD_PRODUCT.freight]: z.number().optional(),
    [ADD_PRODUCT.description]: z.string().optional(),
});


export default productSchema;