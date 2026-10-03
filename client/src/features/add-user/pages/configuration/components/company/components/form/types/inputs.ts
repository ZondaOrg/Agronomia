import type { InputRow } from "@/shared/types/input/input";

const createUserInputs: InputRow[] = [
    [
        {
            type: "text",
            name: "name",
            title: "Nombre",
            placeholder: "",
            id: 0,
        },
    ],
    [
        {
            type: "text",
            name: "legalName",
            title: "Razon social",
            placeholder: "",
            id: 1,
        },
        {
            type: "text",
            name: "cuit",
            title: "CUIT",
            placeholder: "Ingrese CUIT",
            id: 2,
        },
    ],
    [
        {
            type: "file",
            name: "logo",
            title: "Logo",
            placeholder: "",
            id: 3,
        },
    ],
];

export default createUserInputs;
