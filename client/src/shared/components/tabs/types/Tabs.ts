import type { Role } from "@/shared/domain/user/role";

export type Tab = {
    page: React.ReactNode;
    allowedRoles?: Role[];
    nameTab: string;
};
