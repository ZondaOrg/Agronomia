import { EDIT_LEGAL_NAME } from "@/features/edit-client/adapter/api-contract";
import * as z from "zod";

const socialMotiveSchema = z.object({
    [EDIT_LEGAL_NAME.address]: z.string(),
    [EDIT_LEGAL_NAME.locate]: z.string().nonempty({ message: "La localidad es obligatoria" }),
    [EDIT_LEGAL_NAME.province]: z.string().nonempty({ message: "Seleccione una provincia" }),
    [EDIT_LEGAL_NAME.associateName]: z.string().nonempty({ message: "El nombre es obligatorio" }),
    [EDIT_LEGAL_NAME.associateSurname]: z.string().nonempty({ message: "El apellido es obligatorio" }),
    [EDIT_LEGAL_NAME.associatePhone]: z.string({ message: "El teléfono es obligatorio" }),
    [EDIT_LEGAL_NAME.email]: z
        .union([z.email({ message: "El correo no es valido" }), z.literal("")])
        .nullable()
        .optional(),
});

export type SocialMotiveSchema = z.infer<typeof socialMotiveSchema>;

export default socialMotiveSchema;
