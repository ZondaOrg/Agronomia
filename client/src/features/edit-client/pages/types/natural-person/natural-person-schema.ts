import { EDIT_NATURAL_PERSON } from "@/features/edit-client/adapter/api-contract";
import * as z from "zod";

const naturalPersonSchema = z.object({
    [EDIT_NATURAL_PERSON.email]: z
        .union([z.email({ message: "El correo no es valido" }), z.literal("")])
        .nullable()
        .optional(),
    [EDIT_NATURAL_PERSON.address]: z.string(),
    [EDIT_NATURAL_PERSON.locate]: z.string().nonempty({ message: "Seleccione una localidad" }),
    [EDIT_NATURAL_PERSON.province]: z.string().nonempty({ message: "Seleccione una provincia" }),
});

export type NaturalPersonSchema = z.infer<typeof naturalPersonSchema>;

export default naturalPersonSchema;
