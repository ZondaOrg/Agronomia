import type { linkNavbar } from "../../components/protected-routes/link";
import { FACTURACION_ROUTES } from "@/core/routes/facturacion/paths";

export const links: linkNavbar[] = [
    { name: "Inicio", path: FACTURACION_ROUTES.BASE },
    { name: "Proveedores", path: FACTURACION_ROUTES.PROVEEDORES },
    { name: "Clientes", path: FACTURACION_ROUTES.CLIENTES },
    { name: "Ventas", path: FACTURACION_ROUTES.VENTAS },
];
