import type { RouteData } from "@/core/routes/route-data";
import { ADMIN_ROUTES } from "./paths";
import AdminLayout from "../../auth/layout/roles/admin/AdminLayout";
import Configuration from "@/features/add-user/pages/configuration/Configuration";
import ClientPanel from "@/views/client/pages/ClientPanel";
import AddClient from "@/features/add-client/pages/AddClient";
import { ProviderPanel } from "@/views/provider/ProviderPanel";
import { ProvidersList } from "@/views/provider/pages/list/ProviderList";
import AddProvider from "@/features/add-provider/pages/AddProvider";
import { EditProvider } from "@/features/edit-provider/pages/EditProvider";
import { Client } from "@/views/client/Client";
import { EditClient } from "@/features/edit-client/pages/EditClient";
import { PaymentsPanel } from "@/views/provider/pages/payments/PaymentsPanel";
import { Outlet } from "react-router";
import AddProduct from "@/features/add-product/pages/AddProduct";

export const AdminRoutes: RouteData[] = [
    {
        path: `${ADMIN_ROUTES.BASE}`,
        element: <AdminLayout />,
        handle: { breadcrumb: "Inicio" },
        children: [
            {
                path: `${ADMIN_ROUTES.CONFIGURATION.BASE}`,
                element: <Configuration />,
                handle: { breadcrumb: "Configuración" },
            },
            {
                path: `${ADMIN_ROUTES.PROVIDERS.BASE}`,
                element: <ProviderPanel />,
                handle: { breadcrumb: "Proveedores" },
                children: [
                    {
                        index: true,
                        element: <ProvidersList />,
                    },
                    {
                        path: `${ADMIN_ROUTES.PROVIDERS.ADD}`,
                        element: <AddProvider />,
                        handle: { breadcrumb: "Nuevo Proveedor" },
                    },
                    {
                        path: ADMIN_ROUTES.PROVIDERS.EDIT,
                        element: <EditProvider />,
                        handle: { breadcrumb: "Editar Proveedor" },
                    },
                    {
                        path: ADMIN_ROUTES.PAYMENT.PANEL,
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
                    {
                        path: ADMIN_ROUTES.PRODUCTS.BASE,
                        element: <Outlet />,
                        handle: {
                            breadcrumb: (params) =>
                                params.providerName ?? "Proveedor",
                        },
                        children: [
                            {
                                index: true,
                                element: <AddProduct />,
                                handle: { breadcrumb: "Lista de precios" },
                            },
                        ],
                    }
                ],
            },
            {
                path: `${ADMIN_ROUTES.CLIENTS.BASE}`,
                element: <Client />,
                handle: { breadcrumb: "Clientes" },
                children: [
                    {
                        index: true,
                        element: <ClientPanel />,
                    },
                    {
                        path: `${ADMIN_ROUTES.CLIENTS.ADD}`,
                        element: <AddClient />,
                        handle: { breadcrumb: "Nuevo Cliente" },
                    },
                    {
                        path: ADMIN_ROUTES.CLIENTS.EDIT,
                        element: <EditClient />,
                        handle: { breadcrumb: "Editar Cliente" },
                    },
                ],
            },
        ],
    },
];
