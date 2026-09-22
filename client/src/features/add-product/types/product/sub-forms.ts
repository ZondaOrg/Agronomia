import { createSubForms } from "@/shared/components/forms/types/factory";
import type { SubFormData } from "@/shared/components/forms/types/sub-form";
import { ADD_PRODUCT } from "../../adapters/request/api-contract";
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options";
import { moneys } from "../../domain/money";
import { iva } from "../../domain/iva";

const productSubForms: SubFormData[] = createSubForms([
    {
        name: "Identificación",
        fields: [
            [
                { motive: "Producto", name: ADD_PRODUCT.name },
                { motive: "Tipo de producto", name: ADD_PRODUCT.type, type: "select", options: ["a"].map(a => { return  { label: a, value: a, id: a}}) },
            ],
            [
                { motive: "Descripción", type: "counter-chars", limit: 500, name: ADD_PRODUCT.description, isRequired: false },
            ]
        ]
    },
    {
        name: "Valores",
        fields: [
            [
                { motive: "Moneda", name: ADD_PRODUCT.money, type: "select", options: createSelectOptions(moneys)},
                { motive: "Precio lista", name: ADD_PRODUCT.listPrice }, 
                { motive: "Iva", name: ADD_PRODUCT.iva, type: "select", options: createSelectOptions(iva) },
            ],
            [
                { motive: "Bonificación", name: ADD_PRODUCT.bonification },
                { motive: "Flete", name: ADD_PRODUCT.freight, isRequired: false }
            ]
        ]
    },
]);

export default productSubForms;