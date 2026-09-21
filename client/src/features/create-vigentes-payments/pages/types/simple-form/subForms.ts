import { createSubForms } from "@/shared/components/forms/types/factory";
import { ADD_VIGENT_PAYMENTS } from "../../../adapter/api-contract";

export const vigentSubForms = createSubForms([
    {
        name: "Datos del listado",
        fields: [
            [
                {
                    motive: "Nombre del listado",
                    name: ADD_VIGENT_PAYMENTS.nameList,
                },
            ],
        ],
    },
]);
