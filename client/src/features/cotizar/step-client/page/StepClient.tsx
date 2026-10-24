import { useCallback } from "react";
import { FilterClient } from "../components/filter/FilterClient";
import { FormClient } from "../components/form/FormClient";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import type { Client } from "../types/client";
import { AddClientAction } from "../components/actions/AddClient";

const EMPTY_CLIENTS: Client[] = [];

interface StepClientProps {
    stepId: string;
}

export const StepClient = ({ stepId }: StepClientProps) => {
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

    // TODO: navegar al alta de cliente guardando la cotización en curso.
    const handleAddClient = useCallback(() => {}, []);

    return (
        <Step
            stepId={stepId}
            filter={<FilterClient stepId={stepId} />}
            form={
                <FormClient
                    stepId={stepId}
                    items={data ?? EMPTY_CLIENTS}
                    loading={loading}
                />
            }
            service={searchClients}
            onClear={refresh}
            actionsPosition="aside"
            actions={<AddClientAction onClick={handleAddClient} />}
        />
    );
};
