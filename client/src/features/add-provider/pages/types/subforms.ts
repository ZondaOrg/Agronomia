import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";
import { ADD_PROVIDER } from "../../adapter/api-contract";

export const providerSubForms = createSubForms([
    {
        name: "Datos",
        fields: [
            [
                { motive: "Razón social", name: ADD_PROVIDER.legalName },
                { motive: "CUIT/CUIL", type: "dynamic", format: formatCuit, name: ADD_PROVIDER.cuit },
            ],
            [
                { motive: "Nombre comercial", name: ADD_PROVIDER.tradeName },
            ],
        ]
    },
    {
        name: "Contacto",
        fields: [
            [
                { motive: "Teléfono de fábrica", name: ADD_PROVIDER.phoneNumber },
            ],
            [
                { motive: "Nombre del viajante", isRequired: false, name: ADD_PROVIDER.travelerName },
                { motive: "Teléfono del viajante", isRequired: false, name: ADD_PROVIDER.travelerPhoneNumber }
            ],
        ]
    }
]);