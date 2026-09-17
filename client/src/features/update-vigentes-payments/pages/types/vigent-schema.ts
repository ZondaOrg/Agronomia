import * as z from "zod";
import { ADD_PAYMENTS } from "../../adapter/api-contract";

const paymentsSchema = z.object({
    [ADD_PAYMENTS.nameList]: z
        .string()
        .nonempty({ message: "Indica un nombre para identificar el listado" }),
});

export type PaymentsSchema = typeof paymentsSchema;

export default paymentsSchema;
