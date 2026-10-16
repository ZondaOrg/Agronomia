import { useState } from "react";
import {
    CardCheckInput,
    type CardCheckOption,
} from "@/shared/components/card-check-input";
import { IconList } from "@/shared/components/icon/components/iconList/IconList";
import FilterChain from "@/shared/components/filter/chain/FilterChain";
import type { Client } from "@/features/get-clients/domain/client";
import { clientItems } from "../components/types/client-data";

const clients: Client[] = [
    {
        id: 1,
        razonSocial: "Estancia Cerro Alto S.R.L.",
        cuit: "30-71538249-7",
        name: "Martín",
        surname: "González",
        associatePhone: "+54 2317 45-6780",
        email: "admin@estanciacerroalto.com.ar",
        type: "RAZON_SOCIAL",
        ubication: {
            address: "Ruta Nacional 3, km 2.580",
            location: "Río Gallegos",
            province: "Santa Cruz",
        },
    },
    {
        id: 2,
        cuit: "27-33456789-4",
        name: "Camila",
        surname: "Fernández",
        phone: "+54 9 11 4567-8901",
        email: "camila@example.com",
        type: "NATURAL_PERSON",
        ubication: {
            address: "Av. Corrientes 1234",
            location: "Buenos Aires",
            province: "Buenos Aires",
        },
    },
];

export const CotizarPanel = () => {
    const [simpleValue, setSimpleValue] = useState<string | null>(null);
    const [detailedValue, setDetailedValue] = useState<string | null>(null);
    const [articleValue, setArticleValue] = useState<string | null>(null);
    const [multipleSimpleValues, setMultipleSimpleValues] = useState<string[]>(
        [],
    );
    const [multipleArticleValues, setMultipleArticleValues] = useState<
        string[]
    >([]);

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

    const articleOptions: CardCheckOption[] = [
        {
            value: "article-1",
            label: "DOL 360: ",
            description: "30% sobre 30 días",
            content: <strong>Recargo: 12%</strong>,
        },
        {
            value: "article-2",
            label: "DOL 180: ",
            description: "15% sobre 15 días",
            content: <strong>Recargo: 8%</strong>,
        },
    ];

    return (
        <div>
            <FilterChain
                stepId="step-1"
                filters={[
                    {
                        id: "provincia",
                        label: "Provincia",
                        required: true,
                        variant: "select",
                        options: [
                            { value: "BA", label: "Buenos Aires" },
                            { value: "CABA", label: "CABA" },
                        ],
                    },
                    {
                        id: "ciudad",
                        label: "Ciudad",
                        required: true,
                        variant: "text",
                    },
                ]}
            />

            <CardCheckInput
                options={[
                    { value: "option-1", label: "Opción simple 1" },
                    { value: "option-2", label: "Opción simple 2" },
                ]}
                value={simpleValue}
                onChange={setSimpleValue}
                variant="CardSimple"
                emptyMessage="No hay opciones simples"
            />

            <CardCheckInput
                options={clientOptions}
                value={detailedValue}
                onChange={setDetailedValue}
                variant="CardDetailed"
                emptyMessage="No hay clientes disponibles"
            />

            <CardCheckInput
                options={articleOptions}
                value={articleValue}
                onChange={setArticleValue}
                variant="CardArticleDetailed"
                emptyMessage="No hay artículos disponibles"
            />

            <CardCheckInput
                options={[
                    { value: "multiple-option-1", label: "Opción múltiple 1" },
                    { value: "multiple-option-2", label: "Opción múltiple 2" },
                ]}
                multiple
                value={multipleSimpleValues}
                onChange={setMultipleSimpleValues}
                variant="CardSimple"
                emptyMessage="No hay opciones simples"
            />

            <CardCheckInput
                options={articleOptions}
                multiple
                value={multipleArticleValues}
                onChange={setMultipleArticleValues}
                variant="CardArticleDetailed"
                emptyMessage="No hay artículos disponibles"
            />
        </div>
    );
};
