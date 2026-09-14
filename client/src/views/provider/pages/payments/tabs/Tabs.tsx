import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import type { Tab } from "@/shared/components/tabs/types/Tabs";

export const tabs: Tab[] = [
    {
        page: <h1>Ver Pagos</h1>,
        nameTab: "Ver",
    },
    {
        page: <UpdatePayments />,
        nameTab: "Actualizar",
    },
];
