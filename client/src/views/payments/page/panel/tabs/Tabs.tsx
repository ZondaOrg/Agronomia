import type { RouteTab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";

export const tabs: RouteTab[] = [
    { nameTab: "Ver", to: ".", end: true },
    { nameTab: "Actualizar", to: "actualizar", allowedRoles: [ROLE.OWNER] },
];
