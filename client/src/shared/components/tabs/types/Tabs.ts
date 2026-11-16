import type { Role } from "@/shared/domain/user/role";
import type { SystemStyleObject } from "@styled-system/types";

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

export type RouteTabProps = {
    tabs: RouteTab[];
    styles: SystemStyleObject;
};

