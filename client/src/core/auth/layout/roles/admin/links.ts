import { ADMIN_ROUTES } from "../../../../routes/admin/paths";
import type { linkNavbar } from "../../components/protected-routes/link";

export const links: linkNavbar[] = [
    { name: "Inicio", path: ADMIN_ROUTES.BASE },
    { name: "Proveedores", path: ADMIN_ROUTES.PROVIDERS.BASE},
    { name: "Clientes", path: ADMIN_ROUTES.CLIENTS.BASE },
    { name: "Productos", path: ADMIN_ROUTES.PRODUCTS.BASE },
    { name: "Ventas", path: ADMIN_ROUTES.SALE.BASE },
];
