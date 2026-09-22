import z from "zod";
import { OPTIONAL } from "../../adapters/request/api-contract";

const optionalSchema = z.object({
    [OPTIONAL.name]: z.string().nonempty({ message: "El nombre del opcional es obligatorio"}),
    [OPTIONAL.price]: z.string().nonempty( {message: "El precio es obligatorio"} )
});

export type OptionalSchema = z.infer<typeof optionalSchema>;

export default optionalSchema;
