import { ADMIN_ROUTES } from "@/core/routes/admin/paths";
import { RouteTabs } from "@/shared/components/tabs/routeTabs/RouteTabs";
import type { RouteTab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";
import { css } from "@styled-system/css";

const tabPanel = css.raw({
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: 4 
});

const tabs: RouteTab[] = [
    {
        nameTab: "Lista de precios",
        to: ".",
        end: true,
    },
    {
        nameTab: "Añadir producto",
        to: ADMIN_ROUTES.PRICE_LIST.ADD,
        allowedRoles: [ROLE.OWNER],
    },
];

const ProductTabs = () => <RouteTabs tabs={tabs} styles={tabPanel} />;

export default ProductTabs;
