import { Container } from "@/features/cotizar/components/Container";
import { StepClient } from "@/features/cotizar/step-client/page/StepClient";
import { StepPayment } from "@/features/cotizar/step-payment/pages/StepPayment";
import { StepPreview } from "@/features/cotizar/step-preview/pages/StepPreview";
import { StepProduct } from "@/features/cotizar/step-product/StepProduct";
import { StepManager } from "@/shared/components/step/StepManager";

export const CotizarPanel = () => {
    return (
        <StepManager
            indexes={["Cliente", "Producto", "Formas de pago"]}
            stepIds={["1", "2", "3", "4"]}
            steps={[StepClient, StepProduct, StepPayment, StepPreview]}
            Container={Container}
            title="Nueva cotización"
        />
    );
};
