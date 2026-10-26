import type { FilterFieldConfig } from "@/shared/components/filter/chain/types/filter-chain";

export const clientFilters: FilterFieldConfig[] = [
    {
        id: "tipoCliente",
        label: "Tipo de Cliente",
        required: true,
        variant: "select",
        options: [
            { value: "NATURAL_PERSON", label: "Persona Natural" },
            { value: "RAZON_SOCIAL", label: "Razón Social" },
        ],
    },
    {
        id: "datosClients",
        label: "Datos del Cliente",
        required: true,
        variant: "text",
    },
];
