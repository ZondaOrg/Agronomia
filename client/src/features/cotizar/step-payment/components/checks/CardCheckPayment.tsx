import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import type { HydrationInputProps } from "@/shared/components/step/components/form/HydratationForm";
import type { PaymentPreview } from "../../types/step-preview";

const paymentOption = (payment: PaymentPreview): CardCheckOption => {
    const application =
        payment.application === "No Aplica"
            ? ""
            : ` — ${payment.application}: ${payment.percentage}%`;
    const bonus =
        payment.bonusPercentage !== 0
            ? ` — Bonificación: ${payment.bonusPercentage}%`
            : "";

    return {
        value: String(payment.id),
        label: `${payment.description}${application}${bonus}`,
    };
};

export const CardCheckPayment = ({
    items,
    value,
    onChange,
    error,
}: HydrationInputProps<PaymentPreview>) => {
    const selectedValues = value ? value.split(",") : [];

    return (
        <CardCheckInput
            options={items.map(paymentOption)}
            value={selectedValues}
            onChange={(nextValues) => onChange(nextValues.join(","))}
            multiple
            variant="CardDetailed"
            emptyMessage="No hay formas de pago disponibles"
            error={error}
        />
    );
};
