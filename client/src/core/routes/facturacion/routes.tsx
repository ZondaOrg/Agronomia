import type { RouteData } from "@/core/routes/route-data";
import { FACTURACION_ROUTES } from "./paths";
import FacturacionLayout from "../../auth/layout/roles/facturacion/FacturacionLayout";
import NotFoundPage from "@/views/notFound/NotFoundPage";

export const FacturacionRoutes: RouteData[] = [
    {
        path: `${FACTURACION_ROUTES.BASE}`,
        element: <FacturacionLayout />,
        handle: { breadcrumb: "Inicio" },
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
                handle: { hideBreadcrumb: true },
            },
        ],
    },
];
