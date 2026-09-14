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

export const AdminRoutes: RouteData[] = [
    {
        path: `${ADMIN_ROUTES.BASE}`,
        element: <AdminLayout />,
        handle: { breadcrumb: "Inicio" },
        children: [
            {
                path: `${ADMIN_ROUTES.CONFIGURATION}`,
                element: <Configuration />,
                handle: { breadcrumb: "Configuración" },
            },
            {
                path: `${ADMIN_ROUTES.PROVEEDORES}`,
                element: <ProviderPanel />,
                handle: { breadcrumb: "Proveedores" },
                children: [
                    {
                        index: true,
                        element: <ProvidersList />,
                    },
                    {
                        path: `${ADMIN_ROUTES.ADD_PROVIDER}`,
                        element: <AddProvider />,
                        handle: { breadcrumb: "Nuevo Proveedor" },
                    },
                    {
                        path: ADMIN_ROUTES.EDIT_PROVIDER,
                        element: <EditProvider />,
                        handle: { breadcrumb: "Editar Proveedor" },
                    },
                    {
                        path: ADMIN_ROUTES.PAYMENT_PANEL,
                        element: <PaymentsPanel />,
                        handle: { breadcrumb: "Formas de Pago" },
                    },
                ],
            },
            {
                path: `${ADMIN_ROUTES.CLIENTES}`,
                element: <Client />,
                handle: { breadcrumb: "Clientes" },
                children: [
                    {
                        index: true,
                        element: <ClientPanel />,
                    },
                    {
                        path: `${ADMIN_ROUTES.ADD_CLIENT}`,
                        element: <AddClient />,
                        handle: { breadcrumb: "Nuevo Cliente" },
                    },
                    {
                        path: ADMIN_ROUTES.EDIT_CLIENT,
                        element: <EditClient />,
                        handle: { breadcrumb: "Editar Cliente" },
                    },
                ],
            },
        ],
    },
];
