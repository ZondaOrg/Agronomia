import type { Tab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";
import { UpdateVigentPayment } from "../../update/UpdateVigentPayment";

export const tabs: Tab[] = [
    {
        page: <h1>Ver Pagos</h1>,
        nameTab: "Ver",
    },
    {
        page: <UpdateVigentPayment />,
        allowedRoles: [ROLE.OWNER],
        nameTab: "Actualizar",
    },
];
