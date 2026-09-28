import { ADD_NATURAL_CLIENT } from "@/features/add-client/adapter/api-contract"
import { createSubForms } from "@/shared/components/forms/types/factory"
import { formatCuit } from "@/shared/domain/cuit-cuil/format"
import { provinces } from "@/shared/domain/locate/locate"
import { createSelectOptions } from "@/shared/types/input/input-data/create-select-options"

export const naturalPersonsubForms = createSubForms([
    {
        name: "Datos del cliente",
        fields: [
            [
                { motive: "Nombre", name: ADD_NATURAL_CLIENT.name },
                { motive: "Apellido", name: ADD_NATURAL_CLIENT.surname}
            ],
            [
                { motive: "CUIT/CUIL", name: ADD_NATURAL_CLIENT.cuit, type: "dynamic", format: formatCuit },
                { motive: "Télefono", name: ADD_NATURAL_CLIENT.phone }
            ],
            [
                { motive: "Email", name: ADD_NATURAL_CLIENT.email, type: "email" },
                { motive: "Dirección", name: ADD_NATURAL_CLIENT.address }
            ],
            [
                { motive: "Localidad", name: ADD_NATURAL_CLIENT.location },
                { motive: "Provincia", name: ADD_NATURAL_CLIENT.province, type: "select", options: createSelectOptions(provinces) }
            ]
        ]
    }
])
