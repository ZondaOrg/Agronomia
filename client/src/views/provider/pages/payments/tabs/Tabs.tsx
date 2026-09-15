import { UpdatePayments } from "@/features/update-payments/pages/UpdatePayments";
import type { Tab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";

export const tabs: Tab[] = [
    {
        page: <h1>Ver Pagos</h1>,
        nameTab: "Ver",
    },
    {
        page: <UpdatePayments />,
        allowedRoles: [ROLE.OWNER],
        nameTab: "Actualizar",
    },
];
