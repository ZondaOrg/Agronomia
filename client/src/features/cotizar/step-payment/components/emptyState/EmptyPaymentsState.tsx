import { AddEntityAction } from "@/features/cotizar/components/action/AddEntityAction";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { PaymentIcon } from "@/shared/components/icon/components/icons/PaymentIcon";
import { useAddEntityNavigation } from "@/features/cotizar/hooks/use-direct-to-add-client";
// import { useAppSelector } from "@/core/store/hooks";
// import { selectStepValues } from "@/features/cotizar/store/filterChain/filter-chain.selectors";

interface EmptyPaymentsStateProps {
    stepId: string;
}

export const EmptyPaymentsState = ({ stepId }: EmptyPaymentsStateProps) => {
    // const providerValues = useAppSelector((state) =>
    //     selectStepValues(state, "proveedor"),
    // );
    // const providerId = providerValues?.idProvider;
    const providerId = 1;

    const stepIndex = Number(stepId) - 1;

    const handleAddPayment = useAddEntityNavigation(
        `nueva-forma-pago/${providerId}`,
        stepIndex,
    );

    return (
        <EmptyState
            icon={<PaymentIcon />}
            title="Este proveedor todavía no tiene formas de pago vigentes"
            description="Para cotizar este producto añade al menos una forma de pago, luego volverás a la cotización."
            action={
                <AddEntityAction
                    label="Agregar forma de pago"
                    onClick={handleAddPayment}
                    variant="solid"
                    align="left"
                    disabled={!providerId}
                />
            }
        />
    );
};
