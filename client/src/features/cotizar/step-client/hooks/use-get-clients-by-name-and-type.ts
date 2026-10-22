import type { Client } from "../types/client";

export const useGetClientsByNameAndType = () => {
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
    return { clients };
};
