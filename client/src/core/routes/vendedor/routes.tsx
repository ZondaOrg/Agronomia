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
import { PaymentsPanel } from "@/views/payments/page/panel/PaymentsPanel";

export const VendedorRoutes: RouteData[] = [
    {
        path: `${VENDEDOR_ROUTES.BASE}`,
        element: <VendedorLayout />,
        handle: { breadcrumb: "Inicio" },
        children: [
            {
                path: `${VENDEDOR_ROUTES.PROVEEDORES}`,
                element: <ProviderPanel />,
                handle: { breadcrumb: "Proveedores" },
                children: [
                    {
                        index: true,
                        element: <ProvidersList />,
                    },
                    {
                        path: VENDEDOR_ROUTES.PAYMENT_PANEL,
                        element: <Outlet />,
                        handle: {
                            breadcrumb: (params) =>
                                params.providerName ?? "Proveedor",
                        },
                        children: [
                            {
                                index: true,
                                element: <PaymentsPanel />,
                                handle: { breadcrumb: "Formas de Pago" },
                            },
                        ],
                    },
                ],
            },
            {
                path: `${VENDEDOR_ROUTES.CLIENTES}`,
                element: <Client />,
                handle: { breadcrumb: "Clientes" },
                children: [
                    {
                        index: true,
                        element: <ClientPanel />,
                    },
                    {
                        path: `nuevo-cliente`,
                        element: <AddClient />,
                        handle: { breadcrumb: "Nuevo Cliente" },
                    },
                    {
                        path: VENDEDOR_ROUTES.EDIT_CLIENT,
                        element: <EditClient />,
                        handle: { breadcrumb: "Editar Cliente" },
                    },
                ],
            },
        ],
    },
];
