import { ADD_VIGENT_PAYMENTS } from "@/features/update-vigentes-payments/adapter/api-contract";
import * as z from "zod";

const vigentSchema = z.object({
    [ADD_VIGENT_PAYMENTS.nameList]: z
        .string()
        .nonempty({ message: "Indica un nombre para identificar el listado" }),
});

export type PaymentsSchema = typeof vigentSchema;

export default vigentSchema;
