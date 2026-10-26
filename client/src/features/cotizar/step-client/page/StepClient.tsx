import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { FilterClient } from "../components/filter/FilterClient";
import { FormClient } from "../components/form/FormClient";
import { useGetClientsByTypeAndName } from "../hooks/use-get-clients-by-name-and-type";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import { AddClientAction } from "../components/actions/AddClient";
import type { Client } from "../types/client";
import { useAutoSelectNewClient } from "../../hooks/use-auto-selected-new-client";

const EMPTY_CLIENTS: Client[] = [];

interface StepClientProps {
    stepId: string;
}

export const StepClient = ({ stepId }: StepClientProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    useAutoSelectNewClient(stepId);

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
    const handleAddClient = useCallback(() => {
        navigate("nuevo-cliente", {
            state: { returnTo: location.pathname },
        });
    }, [navigate, location.pathname]);

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
