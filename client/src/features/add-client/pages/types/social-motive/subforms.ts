import { ADD_LEGAL_NAME } from "@/features/add-client/adapter/api-contract";
import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";
import { provinces } from "@/shared/domain/locate/locate";

export const socialMotiveSubform = createSubForms([
    {
        name: "Datos cliente",
        fields: [
            [
                { motive: "Nombre/Razon Social", name: ADD_LEGAL_NAME.razonSocial },
                { motive: "CUIT/CUIL", name: ADD_LEGAL_NAME.cuit, type: "dynamic", format: formatCuit}
            ],
            [
                { motive: "Dirección", name: ADD_LEGAL_NAME.address, isRequired: false },
            ],
            [
                { motive: "Localidad", name: ADD_LEGAL_NAME.location },
                { motive: "Provincia", name: ADD_LEGAL_NAME.province, type: "select", options: provinces.map(province => {
                        return {
                            value: province,
                            label: province,
                            id: province
                        }
                    })
                }
            ]
        ]
    }, 
    {
        name:  "Razón Social",
        fields: [
            [
                { motive: "Nombre", name: ADD_LEGAL_NAME.associateName },
                { motive: "Apellido", name: ADD_LEGAL_NAME.associateSurname }
            ],
            [
                { motive: "Télefono", name: ADD_LEGAL_NAME.associatePhone },
                { motive: "Email", name: ADD_LEGAL_NAME.email, type: "email", isRequired: false}
            ]
        ]
    }
]);