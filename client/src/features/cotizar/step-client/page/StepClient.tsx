import { CardCheckClient } from "../components/checks/CardCheckClient";
import { useGetClientsByNameAndType } from "../hooks/use-get-clients-by-name-and-type";
import { FilterClient } from "../components/filter/FilterClient";
import { StepIndex } from "@/shared/components/step/components/index/StepIndex";

const STEPS = ["Cliente", "Producto", "Formas de pago"];

export const StepClient = () => {
    const { clients } = useGetClientsByNameAndType();

    return (
        <>
            <StepIndex
                steps={STEPS}
                currentStep={0}
                onStepClick={() => {}}
            />
            <FilterClient />
            <CardCheckClient clients={clients} />
        </>
    );
};
