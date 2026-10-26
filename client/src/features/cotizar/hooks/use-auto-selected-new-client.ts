import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { guardarValores } from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import { setFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.slice";
import { selectFormValores } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import type { Client } from "../step-client/types/client";

export const useAutoSelectNewClient = (stepId: string = "1") => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const valores = useAppSelector((s) => selectFormValores(s, stepId));

    // Ref para bloquear el bucle infinito
    const procesado = useRef(false);

    useEffect(() => {
        const state = location.state as { newClient?: Client } | null;

        // Si hay cliente nuevo y TODAVÍA NO lo procesamos
        if (state?.newClient && !procesado.current) {
            procesado.current = true; // Bloqueamos futuras ejecuciones instantáneamente

            const client = state.newClient;
            const clientName =
                client.type === "RAZON_SOCIAL"
                    ? client.razonSocial
                    : `${client.name} ${client.surname}`;

            // 1. Rellenamos los filtros
            dispatch(
                setFilterValue({
                    stepId,
                    filterId: "tipoCliente",
                    value: client.type,
                }),
            );
            dispatch(
                setFilterValue({
                    stepId,
                    filterId: "datosClients",
                    value: clientName,
                }),
            );

            // 2. Tildamos el cliente
            dispatch(
                guardarValores({
                    stepId,
                    valores: {
                        ...valores,
                        cliente: String(client.id),
                    },
                }),
            );

            // 3. Limpiamos la ruta
            const newState = { ...location.state };
            delete (newState as any).newClient;
            delete (newState as any).returnTo;

            navigate(location.pathname, { replace: true, state: newState });
        }
    }, [
        location.state,
        location.pathname,
        navigate,
        dispatch,
        stepId,
        valores,
    ]);
};
