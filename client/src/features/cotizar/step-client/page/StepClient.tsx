import { FilterClient } from "../components/filter/FilterClient";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import { useCallback } from "react";
import { CardCheckClient } from "../components/checks/CardCheckClient";
import type { Client } from "../types/client";

const STEP_ID = "1";
const EMPTY_CLIENTS: Client[] = [];

export const StepClient = () => {
    const { data, loading, getClientsByTypeAndName, refresh } =
        useGetClientsByTypeAndName();

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
            onClear={refresh}
            form={{
                items: data ?? EMPTY_CLIENTS,
                loading,
                Input: CardCheckClient,
                loadingMessage: "Cargando clientes...",
            }}
        />
    );
};
