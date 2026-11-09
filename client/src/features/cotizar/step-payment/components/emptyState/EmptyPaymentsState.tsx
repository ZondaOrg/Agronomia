import { AddEntityAction } from "@/features/cotizar/components/action/AddEntityAction";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { PaymentIcon } from "@/shared/components/icon/components/icons/PaymentIcon";

export const EmptyPaymentsState = () => {
    return (
        <EmptyState
            icon={<PaymentIcon />}
            title="Este proveedor todavía no tiene formas de pago vigentes"
            description="Para cotizar este producto añade al menos una forma de pago, luego volverás a la cotización."
            action={
                <AddEntityAction
                    label="Agregar forma de pago"
                    onClick={() => {
                        // Lógica para agregar una forma de pago
                    }}
                    variant="solid"
                    align="left"
                />
            }
        />
    );
};
