// StepClient.tsx
import { useCallback } from "react";
import { CardCheckClient } from "../components/checks/CardCheckClient";
import { FilterClient } from "../components/filter/FilterClient";
import { StepIndex } from "@/shared/components/step/components/index/StepIndex";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import { Container } from "../../components/Container";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";

const STEPS = ["Cliente", "Producto", "Formas de pago"];
const STEP_ID = "1";

export const StepClient = () => {
    const {
        data: clients = [],
        loading,
        getClientsByTypeAndName,
    } = useGetClientsByTypeAndName();

    const searchClients = useCallback(
        ({ tipoCliente, datosClients }: FilterValues) =>
            getClientsByTypeAndName({
                type: tipoCliente as ClientTypes,
                name: datosClients,
            }),
        [getClientsByTypeAndName],
    );

    return (
        <>
            <StepIndex
                steps={STEPS}
                currentStep={0}
                onStepClick={() => {}}
            />
            <Step
                stepId={STEP_ID}
                Container={Container}
                filter={<FilterClient />}
                service={searchClients}
            >
                {loading ? (
                    <p>Cargando clientes...</p>
                ) : (
                    <CardCheckClient clients={clients} />
                )}
            </Step>
        </>
    );
};
