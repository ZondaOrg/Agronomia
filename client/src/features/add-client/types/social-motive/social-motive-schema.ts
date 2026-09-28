import { ADD_LEGAL_NAME } from "@/features/add-client/adapter/api-contract";
import * as z from "zod";

const socialMotiveSchema = z.object({
    [ADD_LEGAL_NAME.razonSocial]: z
        .string()
        .nonempty({ message: "La razón social es obligatoria" }),
    [ADD_LEGAL_NAME.cuit]: z
        .string()
        .nonempty({ message: "El CUIT/CUIL es obligatorio" })
        .length(13, { message: "El CUIT/CUIL debe tener 11 números" }),
    [ADD_LEGAL_NAME.address]: z.string(),
    [ADD_LEGAL_NAME.location]: z.string().nonempty({ message: "La localidad es obligatoria" }),
    [ADD_LEGAL_NAME.province]: z.string().nonempty({ message: "Seleccione una provincia" }),
    [ADD_LEGAL_NAME.associateName]: z.string().nonempty({ message: "El nombre es obligatorio" }),
    [ADD_LEGAL_NAME.associateSurname]: z.string().nonempty({ message: "El apellido es obligatorio" }),
    [ADD_LEGAL_NAME.associatePhone]: z.string({ message: "El teléfono es obligatorio" }),
    [ADD_LEGAL_NAME.email]: z
        .union([z.email({ message: "El correo no es valido" }), z.literal("")])
        .nullable()
        .optional(),
});

export type SocialMotiveSchema = z.infer<typeof socialMotiveSchema>;

export default socialMotiveSchema;
