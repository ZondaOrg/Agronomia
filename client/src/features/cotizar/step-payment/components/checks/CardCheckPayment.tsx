import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import type { HydrationInputProps } from "@/shared/components/step/components/form/HydratationForm";
import type { PaymentPreview } from "../../types/step-preview";
import { css } from "@styled-system/css";

import { EmptyPaymentsState } from "../emptyState/EmptyPaymentsState";

const adjustmentStyles = {
    Recargo: css({ color: "red.600", fontWeight: "semibold" }),
    Descuento: css({ color: "green.600", fontWeight: "semibold" }),
};

const bonusStyle = css({ color: "blue.600", fontWeight: "semibold" });

const adjustmentStyle = (application: string) => {
    if (application === "Recargo" || application === "Descuento") {
        return adjustmentStyles[application];
    }

    return undefined;
};

const paymentOption = (payment: PaymentPreview): CardCheckOption => {
    return {
        value: String(payment.id),
        label: (
            <>
                {payment.description}
                {payment.application !== "No Aplica" && (
                    <>
                        {" — "}
                        <strong
                            className={adjustmentStyle(payment.application)}
                        >
                            {payment.application}: {payment.percentage}%
                        </strong>
                    </>
                )}
                {Number(payment.bonusPercentage) !== 0 && (
                    <>
                        {" — "}
                        <strong className={bonusStyle}>
                            Bonificación: {payment.bonusPercentage}%
                        </strong>
                    </>
                )}
            </>
        ),
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
            error={error}
            emptyState={<EmptyPaymentsState />}
        />
    );
};
