import type { InputRow } from "@/shared/types/input/input";

const loginInputs: InputRow[] = [
    [
        {
            type: "text",
            name: "email",
            title: "Email",
            placeholder: "Ingrese su correo",
            id: 0,
        },
    ],
    [
        {
            type: "password",
            name: "password",
            title: "Contraseña",
            placeholder: "Ingrese su contraseña",
            id: 1,
        },
    ],
];

export default loginInputs;
