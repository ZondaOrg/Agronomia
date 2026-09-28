import * as z from "zod";
import { ADD_PROVIDER } from "../../adapter/api-contract";

const providerSchema = z
    .object({
        [ADD_PROVIDER.legalName]: z
            .string()
            .nonempty({ message: "La razón social es obligatoria" }),
        [ADD_PROVIDER.cuit]: z
            .string()
            .nonempty({ message: "El CUIT/CUIL es obligatorio" })
            .length(13, { message: "El CUIT/CUIL debe tener 11 números" }),
        [ADD_PROVIDER.tradeName]: z
            .string()
            .nonempty({ message: "El nombre comercial es obligatorio" }),
        [ADD_PROVIDER.phoneNumber]: z
            .string()
            .nonempty({ message: "El teléfono de fábrica es obligatorio" }),
        [ADD_PROVIDER.travelerName]: z.string().optional(),
        [ADD_PROVIDER.travelerPhoneNumber]: z.string().optional(),
    })
    .refine(
        (data) => {
            const hasName = !!data.travelerName?.trim();
            const hasPhone = !!data.travelerPhoneNumber?.trim();

            if (!hasName && !hasPhone) return true;
            return hasName && hasPhone;
        },
        {
            message:
                "Si completa un dato del viajante, debe completar también el otro.",
            path: [ADD_PROVIDER.travelerPhoneNumber],
        },
    );

export type ProviderSchema = typeof providerSchema;

export default providerSchema;
