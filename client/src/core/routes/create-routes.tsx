import { createBrowserRouter, Outlet, type RouteObject } from "react-router";
import { AdminRoutes } from "./admin/routes";
import { FacturacionRoutes } from "./facturacion/routes";
import { VendedorRoutes } from "./vendedor/routes";
import VisitantRoutes from "./visitant/routes";
import AuthProvider from "../auth/context/auth.provider";

/*
    El AuthProvider se monta como layout raíz para que quede dentro del
    router y pueda usar useNavigate.
*/
export const routes = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        ),
        children: [
            ...VisitantRoutes,
            ...AdminRoutes,
            ...FacturacionRoutes,
            ...VendedorRoutes,
        ],
    },
] as RouteObject[]);
