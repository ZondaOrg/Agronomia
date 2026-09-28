import type { RouteData } from "@/core/routes/route-data";
import { VENDEDOR_ROUTES } from "./paths";
import VendedorLayout from "@/core/auth/layout/roles/vendedor/VendedorLayout";
import { ProviderPanel } from "@/views/provider/ProviderPanel";
import { ProvidersList } from "@/views/provider/pages/list/ProviderList";
import { Client } from "@/views/client/Client";
import ClientPanel from "@/views/client/pages/ClientPanel";
import AddClient from "@/features/add-client/pages/AddClient";
import { EditClient } from "@/features/edit-client/pages/EditClient";
import { Outlet } from "react-router";
import { VigentPaymentsPanel } from "@/views/payments/page/panel/VigentPaymentsPanel";

export const VendedorRoutes: RouteData[] = [
    {
        path: `${VENDEDOR_ROUTES.BASE}`,
        element: <VendedorLayout />,
        handle: { breadcrumb: "Inicio" },
        children: [
            {
                path: `${VENDEDOR_ROUTES.PROVIDERS.BASE}`,
                element: <ProviderPanel />,
                handle: { breadcrumb: "Proveedores" },
                children: [
                    {
                        index: true,
                        element: <ProvidersList />,
                    },
                    {
                        path: VENDEDOR_ROUTES.PAYMENT.PANEL,
                        element: <Outlet />,
                        handle: {
                            breadcrumb: (params) =>
                                params.providerName ?? "Proveedor",
                        },
                        children: [
                            {
                                index: true,
                                element: <VigentPaymentsPanel />,
                                handle: { breadcrumb: "Formas de Pago" },
                            },
                        ],
                    },
                ],
            },
            {
                path: `${VENDEDOR_ROUTES.CLIENT.BASE}`,
                element: <Client />,
                handle: { breadcrumb: "Clientes" },
                children: [
                    {
                        index: true,
                        element: <ClientPanel />,
                    },
                    {
                        path: `${VENDEDOR_ROUTES.CLIENT.ADD}`,
                        element: <AddClient />,
                        handle: { breadcrumb: "Nuevo Cliente" },
                    },
                    {
                        path: VENDEDOR_ROUTES.CLIENT.EDIT,
                        element: <EditClient />,
                        handle: { breadcrumb: "Editar Cliente" },
                    },
                ],
            },
        ],
    },
];
