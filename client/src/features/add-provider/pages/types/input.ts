import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";

export const providerSubForms = createSubForms([
    {
        name: "Datos",
        fields: [
            [
                { motive: "Razón social", name: "legalName" },
                { motive: "CUIT/CUIL", type: "dynamic", format: formatCuit, name: "cuit" },
            ],
            [
                { motive: "Nombre comercial", name: "tradeName" },
            ],
        ]
    },
    {
        name: "Contacto",
        fields: [
            [
                { motive: "Teléfono fábrica", name: "phoneNumber" },
            ],
            [
                { motive: "Nombre viajante", isRequired: false, name: "travelerName" },
                { motive: "Teléfono viajante", isRequired: false, name: "travelerPhoneNumber" }
            ],
        ]
    }
]);

console.log(providerSubForms)