import z from "zod";
import { ADD_PRODUCT } from "../../adapters/request/api-contract";
import { moneyKeys } from "../../../../shared/domain/money/money";
import { ivaKeys } from "@/shared/domain/iva/iva";
import positiveFieldNumber from "@/shared/types/field-validation/positive-field-number";

const productSchema = z.object({
    [ADD_PRODUCT.name]: z
        .string()
        .nonempty({ message: "El nombre es obligatorio"}),
    [ADD_PRODUCT.listPrice]: positiveFieldNumber("El precio de lista"),
    [ADD_PRODUCT.bonification]: z.string().nonempty({ message: "La bonificación es obligatorio"}),
    [ADD_PRODUCT.type]: z.string().nonempty({ message: "Seleccione una tipo de producto" }),
    [ADD_PRODUCT.money]: z.enum(moneyKeys, {error: "Seleccione una moneda"}),
    [ADD_PRODUCT.iva]: z.enum(ivaKeys, {error: "Seleccione el IVA"}),
    [ADD_PRODUCT.freight]: z.coerce
        .number()
        .nonnegative({ message: "El valor del flete debe ser un número positivo" })
        .optional(),
    [ADD_PRODUCT.description]: z
        .string()
        .refine(
            (value: string) => value.length <= 500,
            { message: "Se superaron los 500 caracteres, reduzca la cantidad de caracteres"}
        )
        .optional()
});


export type AddProductSchema = z.infer<typeof productSchema>;

export default productSchema;