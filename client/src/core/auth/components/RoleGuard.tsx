import type { ReactNode } from "react";
import { useHasRole } from "../hooks/use-has-role";
import type { Role } from "@/shared/domain/user/role";

interface RoleGuardProps {
    allowedRoles: Role[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RoleGuard = ({
    allowedRoles,
    children,
    fallback = null,
}: RoleGuardProps) => {
    const hasRole = useHasRole(allowedRoles);

    return hasRole ? <>{children}</> : <>{fallback}</>;
};
