import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { paymentsSubForms } from "./simple-form/subForms";
import paymentsSchema from "./simple-form/vigent-schema";
import paymentSchema from "./table-form/payment-schema";
import {
    composeSection,
    tableSection,
} from "@/shared/components/forms/multi-form/types/Factory";
import { paymentInputs } from "./table-form/Table";

export const vigentPaymentSections = [
    composeSection({
        title: "Datos del listado",
        subtitle:
            "Usá una referencia que reconozcas después. Este listado de formas de pago rige desde que lo cargás hasta que cargues uno nuevo.",
        subForms: paymentsSubForms,
        schema: paymentsSchema,
    }),
    tableSection<Payment, typeof paymentSchema>({
        title: "Formas de pago",
        subtitle:
            "Incluí lo que corresponda: cuotas, descuento, banco o condición. Ej: 30 días, 3 cuotas sin interés o Transferencia, banco de convenio.",
        inputs: paymentInputs,
        schema: paymentSchema,
        nameElements: "formas de pago",
        addLabel: "+ Añadir forma de pago",
    }),
];
