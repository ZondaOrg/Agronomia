import { ADD_NATURAL_CLIENT } from "@/features/add-client/adapter/api-contract";
import * as z from "zod";

const naturalPersonSchema = z.object({
    [ADD_NATURAL_CLIENT.cuit]: z
        .string()
        .nonempty({ message: "El CUIT/CUIL es obligatorio" })
        .length(13, { message: "El CUIT/CUIL debe tener 11 números" }),
    [ADD_NATURAL_CLIENT.name]: z.string().nonempty({ message: "El nombre es obligatorio" }),
    [ADD_NATURAL_CLIENT.surname]: z.string().nonempty({ message: "El apellido es obligatorio" }),
    [ADD_NATURAL_CLIENT.phone]: z.string({ message: "El teléfono es obligatorio" }),
    [ADD_NATURAL_CLIENT.email]: z
        .union([z.email({ message: "El correo no es valido" }), z.literal("")])
        .nullable()
        .optional(),
    [ADD_NATURAL_CLIENT.address]: z.string(),
    [ADD_NATURAL_CLIENT.location]: z.string().nonempty({ message: "Seleccione una localidad" }),
    [ADD_NATURAL_CLIENT.province]: z.string().nonempty({ message: "Seleccione una provincia" }),
});

export type NaturalPersonSchema = z.infer<typeof naturalPersonSchema>;

export default naturalPersonSchema;
