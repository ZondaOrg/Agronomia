import { Step } from "@/shared/components/step/components/step/Step";
import { FormPayment } from "../components/form/FormPayment";
import { PaymentSummaryFields } from "../components/summary/PaymentSummaryFields";
import { useStepPayment } from "../hooks/use-step-payment";
import { preview } from "./styles";

interface StepPaymentProps {
    stepId: string;
}

export const StepPayment = ({ stepId }: StepPaymentProps) => {
    const { summary, payments, loading } = useStepPayment();

    return (
        <Step
            stepId={stepId}
            title="Elegí la forma de pago"
            extraPosition="before"
            form={
                <FormPayment
                    stepId={stepId}
                    items={payments}
                    loading={loading}
                />
            }
            extra={
                <section
                    className={preview}
                    aria-labelledby="step-payment-preview"
                >
                    <PaymentSummaryFields
                        summary={summary}
                        loading={loading}
                    />
                </section>
            }
            actionsPosition="aside"
        />
    );
};
