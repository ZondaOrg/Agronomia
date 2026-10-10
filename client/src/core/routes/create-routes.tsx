import { createBrowserRouter, type RouteObject } from "react-router";
import { AdminRoutes } from "./admin/routes";
import { FacturacionRoutes } from "./facturacion/routes";
import { VendedorRoutes } from "./vendedor/routes";
import VisitantRoutes from "./visitant/routes";

export const routes = createBrowserRouter([
    ...VisitantRoutes,
    ...AdminRoutes,
    ...FacturacionRoutes,
    ...VendedorRoutes,
] as RouteObject[]);
