import type { Branch } from "@/features/add-user/types/Branch";
import type { InputRow } from "@/shared/types/input/input";
import { ROLE } from "@/shared/domain/user/role";

const createUserInputs = (branches: Branch[]): InputRow[] => [
    [
        { type: "text", name: "name", title: "Nombre", placeholder: "", id: 0 },
        {
            type: "text",
            name: "surname",
            title: "Apellido",
            placeholder: "",
            id: 1,
        },
    ],
    [
        {
            type: "select",
            name: "rol",
            title: "Rol",
            placeholder: "Selecciona rol",
            id: 2,
            options: [
                { id: 1, value: ROLE.BILLING, label: "Facturación" },
                { id: 2, value: ROLE.SELLER, label: "Vendedor" },
                { id: 3, value: ROLE.ADMIN, label: "Administrador" },
            ],
        },
    ],
    [
        {
            type: "select",
            name: "branch",
            title: "Sucursales",
            placeholder: "Selecciona la sucursal",
            id: 3,
            options: branches.map((b) => ({
                id: b.id,
                value: String(b.id),
                label: b.city + " - " + b.street,
            })),
        },
    ],
    [
        {
            type: "email",
            name: "email",
            title: "Correo",
            placeholder: "",
            id: 4,
        },
    ],
];

export default createUserInputs;
