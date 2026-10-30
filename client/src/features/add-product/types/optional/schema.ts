import z from "zod";
import { OPTIONAL } from "../../adapters/request/api-contract";
import positiveFieldNumber from "@/shared/types/field-validation/positive-field-number";

const optionalSchema = z.object({
    [OPTIONAL.name]: z.string().nonempty({ message: "El nombre del opcional es obligatorio"}),
    [OPTIONAL.price]: positiveFieldNumber("El precio del opcional"),
});

export type OptionalSchema = z.infer<typeof optionalSchema>;

export default optionalSchema;
