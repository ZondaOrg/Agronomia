import z from "zod";
import { moneyKeys } from "../../../../shared/domain/money/money";
import { ivaKeys } from "@/shared/domain/iva/iva";
import { EDIT_PRODUCT } from "../../adapters/api-contract";

const productSchema = z.object({
    [EDIT_PRODUCT.listPrice]: z.string().nonempty({ message: "La lista de precio es obligatorio"}),
    [EDIT_PRODUCT.bonification]: z.string().nonempty({ message: "La bonificación es obligatorio"}),
    [EDIT_PRODUCT.money]: z.enum(moneyKeys, {error: "Seleccione una moneda"}),
    [EDIT_PRODUCT.iva]: z.enum(ivaKeys, {error: "Seleccione el IVA"}),
    [EDIT_PRODUCT.freight]: 
        z.coerce
            .number()
            .nonnegative({ message: "El valor del flete debe ser un número positivo" })
            .optional(),
     [EDIT_PRODUCT.description]: 
        z
            .string()
            .refine(
                (value: string) => value.length <= 500,
                { message: "Se superaron los 500 caracteres, reduzca la cantidad de caracteres"}
            )
            .optional()
});


export type EditProductSchema = z.infer<typeof productSchema>;

export default productSchema;