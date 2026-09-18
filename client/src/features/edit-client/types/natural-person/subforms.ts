import { ADD_NATURAL_CLIENT } from "@/features/add-client/adapter/api-contract"
import { createSubForms } from "@/shared/components/forms/types/factory"
import type { SubFormData } from "@/shared/components/forms/types/sub-form"
import { formatCuit } from "@/shared/domain/cuit-cuil/format"
import { provinces } from "@/shared/domain/locate/locate"
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options"
import { withInitialValues } from "../../pages/types/generate-initial-values"
import { EDIT_NATURAL_PERSON } from "@/features/edit-client/adapter/api-contract"
import type { NaturalPerson } from "../../domain/natural-person"

const naturalPersonsubForms = createSubForms([
    {
        name: "Datos del cliente",
        fields: [
            [
                { motive: "Nombre", name: "name", disable: true, },
                { motive: "Apellido", name: "surname", disable: true,}
            ],
            [
                { motive: "CUIT/CUIL", name: ADD_NATURAL_CLIENT.cuit, type: "dynamic", format: formatCuit, disable: true, },
                { motive: "Télefono", name: ADD_NATURAL_CLIENT.phone }
            ],
            [
                { motive: "Email", name: EDIT_NATURAL_PERSON.email, type: "email" },
                { motive: "Dirección", name: EDIT_NATURAL_PERSON.address }
            ],
            [
                { motive: "Localidad", name: EDIT_NATURAL_PERSON.locate },
                { motive: "Provincia", name: EDIT_NATURAL_PERSON.province, type: "select", options: createSelectOptions(provinces) }
            ]
        ]
    }
])

export function generateNaturalPersonSubForms(
    client: NaturalPerson,
): SubFormData[] {
    return withInitialValues(naturalPersonsubForms, {
        name: client.completeName.name,
        surname: client.completeName.surname,
        cuit: client.cuit,
        phone: client.phone,
        email: client.email ?? "",
        address: client.address ?? "",
        locate: client.location,
        province: client.province,
    });
}
