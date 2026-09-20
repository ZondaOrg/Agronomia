import { createSubForms } from "@/shared/components/forms/types/factory";
import type { SubFormData } from "@/shared/components/forms/types/sub-form";
import { ADD_PAYMENTS } from "../../adapter/api-contract";
import type { VigentesPayment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { withInitialValues } from "./generate-initial-values";

export const paymentsSubForms = createSubForms([
    {
        name: "Datos del listado",
        fields: [
            [{ motive: "Nombre del listado", name: ADD_PAYMENTS.nameList }],
        ],
    },
    {
        name: "Formas de pago",
        fields: [],
    },
]);

export function generatePaymentsSubForms(
    vigentes: VigentesPayment,
): SubFormData[] {
    return withInitialValues(paymentsSubForms, {
        nameList: vigentes.nameList,
    });
}
