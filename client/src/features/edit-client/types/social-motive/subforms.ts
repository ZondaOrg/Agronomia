import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";
import { provinces } from "@/shared/domain/locate/locate";
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options";
import type { SubFormData } from "@/shared/components/forms/types/sub-form";
import { EDIT_LEGAL_NAME } from "@/features/edit-client/adapter/api-contract";
import type { RazonSocial } from "../../domain/razon-social";
import { withInitialValues } from "../../pages/types/generate-initial-values";

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
    client: RazonSocial,
): SubFormData[] {
    return withInitialValues(socialMotiveSubform, {
        razonSocial: client.razonSocial,
        cuit: client.cuit,
        address: client.address ?? "",
        locate: client.location,
        province: client.province,
        [EDIT_LEGAL_NAME.associateName]: client.associatePerson.completeName.name,
        [EDIT_LEGAL_NAME.associateSurname]: client.associatePerson.completeName.surname,
        [EDIT_LEGAL_NAME.associatePhone]: client.associatePerson.phone,
        email: client.email ?? "",
    });
}