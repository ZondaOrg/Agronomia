import { VENDEDOR_ROUTES } from "@/core/routes/vendedor/paths";
import type { linkNavbar } from "../../components/protected-routes/link";

export const links: linkNavbar[] = [
    { name: "Inicio", path: VENDEDOR_ROUTES.BASE },
    { name: "Proveedores", path: VENDEDOR_ROUTES.PROVIDERS.BASE },
    { name: "Clientes", path: VENDEDOR_ROUTES.CLIENT.BASE },
    { name: "Productos", path: VENDEDOR_ROUTES.PRODUCTS.BASE },
    { name: "Ventas", path: VENDEDOR_ROUTES.SALES.BASE },
];
