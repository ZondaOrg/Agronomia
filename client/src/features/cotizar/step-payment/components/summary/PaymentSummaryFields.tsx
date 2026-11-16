import DataField from "@/shared/components/dataField/DataField";
import type { PaymentSummary } from "../../domain/payment-summary";
import { previewFields } from "./styles";
import { buildSummaryFields } from "./summary-fields";

interface PaymentSummaryFieldsProps {
    summary: PaymentSummary;
    loading: boolean;
}

export const PaymentSummaryFields = ({
    summary,
    loading,
}: PaymentSummaryFieldsProps) => {
    const fields = buildSummaryFields(summary, loading);

    return (
        <dl className={previewFields}>
            {fields.map((field) => (
                <DataField key={field.label} {...field} />
            ))}
        </dl>
    );
};
