import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import type { Client } from "../../types/client";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import { clientItems } from "./client-data";
import type { HydrationInputProps } from "@/shared/components/step/components/form/HydratationForm";

export const CardCheckClient = ({
    items,
    value,
    onChange,
    error,
}: HydrationInputProps<Client>) => {
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
            emptyMessage="No hay clientes disponibles"
            error={error}
        />
    );
};
