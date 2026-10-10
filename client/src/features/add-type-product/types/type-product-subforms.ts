import { createSubForms } from "@/shared/components/forms/types/factory";
import { ADD_TYPE_PRODUCT } from "../adapter/api-contract";

export const typeProductSubForms = createSubForms([
    {
        fields: [
            [
                {
                    motive: "Nombre",
                    name: ADD_TYPE_PRODUCT.nameType,
                    placeholder: "Ej.: Tractores, Sembradoras, Palas",
                },
            ],
        ],
    },
]);
