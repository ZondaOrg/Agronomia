import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";
import { provinces } from "@/shared/domain/locate/locate";
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options";
import { withInitialValues } from "../generate-initial-values";
import type { SubFormData } from "@/shared/components/forms/types/sub-form";
import type { ClientToEdit } from "@/features/edit-client/types/Client";
import { EDIT_LEGAL_NAME } from "@/features/edit-client/adapter/api-contract";

const socialMotiveSubform = createSubForms([
    {
        name: "Datos cliente",
        fields: [
            [
                { motive: "Nombre/Razon Social", name: "razonSocial", disable: true },
                { motive: "CUIT/CUIL", name: "cuit", type: "dynamic", format: formatCuit, disable: true}
            ],
            [
                { motive: "Dirección", name: EDIT_LEGAL_NAME.address, isRequired: false },
            ],
            [
                { motive: "Localidad", name: EDIT_LEGAL_NAME.locate },
                { motive: "Provincia", name: EDIT_LEGAL_NAME.province, type: "select", options: createSelectOptions(provinces)
                }
            ]
        ]
    }, 
    {
        name:  "Razón Social",
        fields: [
            [
                { motive: "Nombre", name: EDIT_LEGAL_NAME.associateName },
                { motive: "Apellido", name: EDIT_LEGAL_NAME.associateSurname }
            ],
            [
                { motive: "Télefono", name: EDIT_LEGAL_NAME.associatePhone },
                { motive: "Email", name: EDIT_LEGAL_NAME.email, type: "email", isRequired: false}
            ]
        ]
    }
]);

export function generateSocialMotiveSubForms(
    client: ClientToEdit,
): SubFormData[] {
    return withInitialValues(socialMotiveSubform, {
        razonSocial: client.razonSocial,
        cuit: client.cuit,
        address: client.address ?? "",
        locate: client.location,
        province: client.province,
        name: client.name,
        surname: client.surname,
        phone: client.phone,
        email: client.email ?? "",
    });
}