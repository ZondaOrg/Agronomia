import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import paymentSchema from "./types/payment-schema";
import { paymentInputs } from "./types/Table";
import { createDraftTable } from "@/shared/components/table/draft-table/draftTable";

export const CreatePaymentsTable = createDraftTable<
    Payment,
    typeof paymentSchema
>({
    inputs: paymentInputs,
    schema: paymentSchema,
    nameElements: "formas de pago",
    addLabel: "+ Añadir forma de pago",
});
