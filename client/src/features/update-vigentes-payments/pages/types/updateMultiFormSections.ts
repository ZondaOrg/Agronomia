import * as z from "zod";
import type {
    Payment,
    VigentesPayment,
} from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import {
    composeSection,
    tableSection,
} from "@/shared/components/forms/multi-form/types/Factory";

import type { Table } from "@/shared/types/table/Table";
import paymentSchema from "./table-form/payment-schema";
import { vigentSubForms } from "./simple-form/subForms";
import vigentSchema from "./simple-form/vigent-schema";
import { paymentInputs } from "./table-form/Table";

export const updatePaymentListSchema = z.array(paymentSchema);

export const getUpdateVigentPaymentSections = (
    currentData: VigentesPayment,
    currentPayments: Table<Payment>,
    onPageChange?: (page: number) => void,
) => [
    composeSection({
        title: "Datos del listado",
        subtitle: "Usá una referencia que reconozcas después. Este listado de formas de pago rige desde que lo cargás hasta que cargues uno nuevo.",
        subForms: vigentSubForms,
        schema: vigentSchema,
        initialValues: { nameList: currentData.nameList },
    }),
    tableSection<Payment, typeof paymentSchema>({
        title: "Formas de pago actuales",
        subtitle:
            "Incluí lo que corresponda: cuotas, descuento, banco o condición. Ej: 30 días, 3 cuotas sin interés o Transferencia, banco de convenio.",
        inputs: paymentInputs,
        schema: paymentSchema,
        nameElements: "formas de pago",
        addLabel: "+ Añadir forma de pago",
        initialValues: currentPayments,
        onPageChange: onPageChange,
    }),
];
