import { ADMIN_ROUTES } from "./admin/paths";
import { FACTURACION_ROUTES } from "./facturacion/paths";
import { VENDEDOR_ROUTES } from "./vendedor/paths";
import { ROLE } from "@/shared/domain/user/role";

export const ROLE_HOME_ROUTES: Record<string, string> = {
    [ROLE.OWNER]: ADMIN_ROUTES.BASE,
    [ROLE.BILLING]: FACTURACION_ROUTES.BASE,
    [ROLE.SELLER]: VENDEDOR_ROUTES.BASE,
};

export const DEFAULT_HOME_ROUTE = "/unauthorized";
