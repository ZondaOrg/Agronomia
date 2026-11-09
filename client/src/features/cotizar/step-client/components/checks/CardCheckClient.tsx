import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import type { Client } from "../../types/client";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import { clientItems } from "./client-data";
import type { HydrationInputProps } from "@/shared/components/step/components/form/HydratationForm";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { SearchIcon } from "@/shared/components/icon/components/icons/Search";
import { AddEntityAction } from "@/features/cotizar/components/action/AddEntityAction";
import { useAddEntityNavigation } from "../../hooks/use-direct-to-add-client";

export const CardCheckClient = ({
    items,
    value,
    onChange,
    error,
}: HydrationInputProps<Client>) => {
    const handleAddClient = useAddEntityNavigation("nuevo-cliente");

    const clientOptions: CardCheckOption[] = items.map((client) => ({
        value: `${client.id}`,
        label:
            client.type === "RAZON_SOCIAL"
                ? client.razonSocial
                : `${client.name} ${client.surname}`,
        description: `CUIT/CUIL ${client.cuit}`,
        content: (
            <IconList
                items={clientItems(client)}
                title=""
            />
        ),
    }));

    return (
        <CardCheckInput
            options={clientOptions}
            value={value}
            onChange={onChange}
            variant="CardDetailed"
            emptyState={
                <EmptyState
                    icon={<SearchIcon />}
                    title="No hay formas de pago disponibles"
                    description="Para cotizar al cliente, primero añadí un cliente. Luego volverás a la cotización."
                    action={
                        <AddEntityAction
                            label="Añadir cliente"
                            onClick={handleAddClient}
                            variant="solid"
                            align="left"
                        />
                    }
                />
            }
            error={error}
        />
    );
};
