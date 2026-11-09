import { useCallback } from "react";
import { FilterClient } from "../components/filter/FilterClient";
import { FormClient } from "../components/form/FormClient";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import type { Client } from "../types/client";
import { useAutoSelectNewClient } from "../../hooks/use-auto-selected-new-client";
import { AddEntityAction } from "../../components/action/AddEntityAction";
import { useAddEntityNavigation } from "../hooks/use-direct-to-add-client";

const EMPTY_CLIENTS: Client[] = [];

interface StepClientProps {
    stepId: string;
}

export const StepClient = ({ stepId }: StepClientProps) => {
    useAutoSelectNewClient(stepId);

    const { data, loading, getClientsByTypeAndName, refresh } =
        useGetClientsByTypeAndName();

    const handleAddClient = useAddEntityNavigation("nuevo-cliente");

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
            stepId={stepId}
            title="Seleccioná el cliente"
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
            actions={
                <AddEntityAction
                    label="Añadir cliente"
                    hint="Al crear el cliente, volvés a la cotización."
                    onClick={handleAddClient}
                />
            }
        />
    );
};
