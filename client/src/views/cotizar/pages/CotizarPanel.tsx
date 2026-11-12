import { Container } from "@/features/cotizar/components/Container";
import { StepClient } from "@/features/cotizar/step-client/StepClient";
import { StepPayment } from "@/features/cotizar/step-payment/pages/StepPayment";
import { StepPreview } from "@/features/cotizar/step-preview/pages/StepPreview";
import { StepProduct } from "@/features/cotizar/step-product/StepProduct";
import {
    StepManager,
    type StepDefinition,
} from "@/shared/components/step/StepManager";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import type { NotifyMessage } from "@/shared/components/notify/types/notify-message";
import { useCotizador } from "../hooks/useCotizador";

const STEPS: StepDefinition[] = [
    { label: "Cliente", component: StepClient },
    { label: "Producto", component: StepProduct },
    { label: "Formas de pago", component: StepPayment },
    { component: StepPreview },
];

const EMPTY_NOTIFY = {} as NotifyMessage;

export const CotizarPanel = () => {
    const {
        currentStep,
        handleStepClick,
        handleNext,
        nextDisabled,
        handleCancel,
        isCancel,
        setIsCancel,
        action,
        closeNotify,
        advertenceData,
    } = useCotizador(STEPS.length);

    return (
        <NotifyHandler
            notify={EMPTY_NOTIFY}
            action={action}
            isCancel={isCancel}
            isBack={false}
            onCancel={() => setIsCancel(true)}
            refresh={closeNotify}
            advertenceData={advertenceData}
        >
            <StepManager
                steps={STEPS}
                Container={Container}
                title="Nueva cotización"
                currentStep={currentStep}
                onStepChange={handleStepClick}
                onNext={handleNext}
                nextDisabled={nextDisabled}
                onCancel={handleCancel}
            />
        </NotifyHandler>
    );
};
