import * as z from "zod";
import { ADD_VIGENT_PAYMENTS } from "../../../adapter/api-contract";

const vigentSchema = z.object({
    [ADD_VIGENT_PAYMENTS.nameList]: z
        .string()
        .nonempty({ message: "Indica un nombre para identificar el listado" }),
});

export type PaymentsSchema = typeof vigentSchema;

export default vigentSchema;
