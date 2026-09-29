import { ADMIN_ROUTES } from "@/core/routes/admin/paths";
import { RouteTabs } from "@/shared/components/tabs/routeTabs/RouteTabs";
import type { RouteTab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";

const tabs: RouteTab[] = [
    {
        nameTab: "Todos los productos",
        to: ".",
        end: true,
    },
    {
        nameTab: "Añadir Productos",
        to: ADMIN_ROUTES.PRODUCTS.ADD,
        allowedRoles: [ROLE.OWNER],
    },
];

const ProductTabs = () => <RouteTabs tabs={tabs} />;

export default ProductTabs;
