import type { Role } from "@/shared/domain/user/role";

export type Tab = {
    page: React.ReactNode;
    allowedRoles?: Role[];
    nameTab: string;
};

export type RouteTab = {
    nameTab: string;
    to: string;
    end?: boolean;
    allowedRoles?: Role[];
};
