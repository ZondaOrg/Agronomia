import { createSubForms } from "@/shared/components/forms/types/factory";
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options";
import { moneys } from "../../../../shared/domain/money/money";
import { ivaPorcents } from "@/shared/domain/iva/iva";
import { EDIT_PRODUCT } from "../../adapters/api-contract";
import type { Product } from "../../domain/product";
import type { SubFormData } from "@/shared/components/forms/types/sub-form";
import { withInitialValues } from "@/shared/components/forms/types/sub-form-with-values";

const productSubForms = createSubForms([
    {
        name: "Identificación",
        fields: [
            [
                { motive: "Producto", name: "name", disable: true },
                { motive: "Tipo de producto", name: "type", disable: true },
            ],
            [
                { motive: "Descripción", type: "counter-chars", limit: 500, name: EDIT_PRODUCT.description, isRequired: false },
            ]
        ]
    },
    {
        name: "Valores",
        fields: [
            [
                { motive: "Moneda", name: EDIT_PRODUCT.money, type: "select", options: createSelectOptions(moneys)},
                { motive: "Precio lista", type: "number", name: EDIT_PRODUCT.listPrice }, 
                { motive: "IVA", name: EDIT_PRODUCT.iva, type: "select", options: createSelectOptions(ivaPorcents) },
            ],
            [
                { motive: "Bonificación", type: "number", name: EDIT_PRODUCT.bonification },
                { motive: "Flete", type: "number", name: EDIT_PRODUCT.freight, isRequired: false }
            ]
        ]
    },
]);

export function generateProductSubForms(
    product: Product,
): SubFormData[] {
    return withInitialValues(productSubForms, {
        name: product.name,
        type: product.type,
        listPrice: product.listPrice,
        bonification: product.bonification,
        money: product.money,
        freight: product.freight,
        iva: product.iva,
        description: product.description ?? "",
        updateAt: product.updateAt,
    });
}


export default productSubForms;