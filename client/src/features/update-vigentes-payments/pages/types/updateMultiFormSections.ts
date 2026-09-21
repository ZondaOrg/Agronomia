import * as z from "zod";
import type {
    Payment,
    VigentesPayment,
} from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import {
    composeSection,
    tableSection,
} from "@/shared/components/forms/multi-form/types/Factory";
import { paymentsSubForms } from "./subForms";
import paymentsSchema from "./vigent-schema";
import paymentSchema from "@/features/update-payments/pages/types/payment-schema";
import { paymentInputs } from "@/features/update-payments/pages/types/Table";
import type { Table } from "@/shared/types/table/Table";

export const updatePaymentListSchema = z.array(paymentSchema);

export const getUpdateVigentPaymentSections = (
    currentData: VigentesPayment,
    currentPayments: Table<Payment>,
    onPageChange?: (page: number) => void,
) => [
    composeSection({
        title: "Datos del listado",
        subtitle: "Modificá la referencia de vigencia actual.",
        subForms: paymentsSubForms,
        schema: paymentsSchema,
        initialValues: { nameList: currentData.nameList },
    }),
    tableSection<Payment, typeof paymentSchema>({
        title: "Formas de pago actuales",
        subtitle:
            "Agregá nuevas formas de pago o eliminá las existentes. Las persistidas no pueden editarse.",
        inputs: paymentInputs,
        schema: paymentSchema,
        nameElements: "formas de pago",
        addLabel: "+ Añadir forma de pago",
        initialValues: currentPayments,
        onPageChange: onPageChange,
    }),
];
