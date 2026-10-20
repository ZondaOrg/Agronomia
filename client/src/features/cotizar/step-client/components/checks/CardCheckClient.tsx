import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import type { Client } from "../../types/client";
import { useState } from "react";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import { clientItems } from "./client-data";

export const CardCheckClient = ({ clients }: { clients: Client[] }) => {
    const [detailedValue, setDetailedValue] = useState<string | null>(null);

    const clientOptions: CardCheckOption[] = clients.map((client) => ({
        value: `client-${client.id}`,
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
            value={detailedValue}
            onChange={setDetailedValue}
            variant="CardDetailed"
            emptyMessage="No hay clientes disponibles"
        />
    );
};
