import type { Tab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";
import { VigentPaymentPage } from "../../vigent-payments/VigentPaymentPage";

export const tabs: Tab[] = [
    {
        page: <h1>Ver Pagos</h1>,
        nameTab: "Ver",
    },
    {
        page: <VigentPaymentPage />,
        allowedRoles: [ROLE.OWNER],
        nameTab: "Actualizar",
    },
];
