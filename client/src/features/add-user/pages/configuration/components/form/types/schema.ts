import z from "zod";
import { ROLE } from "@/shared/domain/user/role";

const roles = [ROLE.BILLING, ROLE.SELLER, ROLE.ADMIN] as const;

const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    surname: z.string().min(1, "El apellido es requerido"),
    email: z
        .email("El correo electrónico no es válido")
        .min(1, "El correo es requerido"),
    rol: z.enum(roles, { message: "Selecciona un rol válido" }),
    branch: z.string().min(1, "Selecciona una sucursal"),
});

export default schema;
