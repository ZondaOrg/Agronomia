import type { RouteTab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";
import { PAYMENT } from "@/core/routes/urls/payments";

export const tabs: RouteTab[] = [
    { nameTab: "Ver", to: ".", end: true },
    {
        nameTab: "Actualizar",
        to: PAYMENT.UPDATE,
        allowedRoles: [ROLE.OWNER],
    },
];
