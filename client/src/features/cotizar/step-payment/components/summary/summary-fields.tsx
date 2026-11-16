import type { PaymentSummary } from "../../domain/payment-summary";
import { OptionalsList } from "./OptionalsList";
import type { SummaryField } from "./types";

const EMPTY = "—";
const LOADING = "Cargando...";

export const buildSummaryFields = (
    {
        providerName,
        productName,
        includesFreight,
        optionals,
        total,
        currency,
    }: PaymentSummary,
    loading: boolean,
): SummaryField[] => [
    {
        label: "Nombre proveedor",
        value: loading ? LOADING : (providerName ?? EMPTY),
    },
    {
        label: "Nombre producto",
        value: loading ? LOADING : (productName ?? EMPTY),
    },
    {
        label: "¿Incluye flete?",
        value: includesFreight ? "Sí" : "No",
    },
    {
        label: "Opcionales",
        value: <OptionalsList optionals={optionals} />,
    },
    {
        label: "Monto total",
        value:
            total !== undefined
                ? `$${total.toLocaleString("es-AR")} ${currency ?? ""}`.trim()
                : EMPTY,
    },
];
