import { createSubForms } from "@/shared/components/forms/types/factory";
import { formatCuit } from "@/shared/domain/cuit-cuil/format";

export const providerSubForms = createSubForms([
    {
        name: "Datos",
        fields: [
            [
                { motive: "Razón social", type: "text" },
                { motive: "CUIT/CUIL", type: "dynamic", format: formatCuit },
            ],
            [
                { motive: "Nombre comercial", type: "text" },
            ],
        ]
    },
    {
        name: "Contacto",
        fields: [
            [
                { motive: "Teléfono fábrica", type: "text"  },
            ],
            [
                { motive: "Nombre viajante", type: "text", isRequired: false },
                { motive: "Teléfono viajante", type: "text", isRequired: false }
            ],
        ]
    }
]);

console.log(providerSubForms)

/*export const providerSubForms: SubFormData[] = [
    {
        title: "Datos",
        inputs: [
            [
                {
                    type: "text",
                    name: "legalName",
                    title: "Razón social",
                    placeholder: "Ingrese la razón social",
                    id: 0,
                    required: true,
                },
                {
                    type: "dynamic",
                    name: "cuit",
                    title: "CUIT/CUIL",
                    placeholder: "Ingrese el CUIT/CUIL",
                    format: formatCuit,
                    id: 1,
                    required: true,
                },
            ],
            [
                {
                    type: "text",
                    name: "tradeName",
                    title: "Nombre comercial",
                    placeholder: "Ingrese el nombre comercial",
                    id: 2,
                    required: true,
                },
            ],
        ],
        id: 0,
    },
    {
        title: "Contacto",
        inputs: [
            [
                {
                    type: "text",
                    name: "phoneNumber",
                    title: "Teléfono fábrica",
                    placeholder: "Ingrese el teléfono",
                    id: 3,
                    required: true,
                },
            ],
            [
                {
                    type: "text",
                    name: "travelerName",
                    title: "Nombre viajante",
                    placeholder: "Ingrese el nombre del viajante",
                    id: 4,
                },
                {
                    type: "text",
                    name: "travelerPhoneNumber",
                    title: "Teléfono viajante",
                    placeholder: "Ingrese el teléfono del viajante",
                    id: 5,
                },
            ],
        ],
        id: 1,
    },
];*/
