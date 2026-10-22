import { FilterClient } from "../components/filter/FilterClient";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import { useCallback } from "react";
import { CardCheckClient } from "../components/checks/CardCheckClient";

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
        <Step
            stepId={STEP_ID}
            filter={<FilterClient title="Selecciona el cliente" />}
            service={searchClients}
            form={{
                items: clients,
                loading,
                Input: CardCheckClient,
                loadingMessage: "Cargando clientes...",
            }}
        />
    );
};
