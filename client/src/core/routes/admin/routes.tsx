import type { RouteData } from "@/core/routes/route-data";
import { ADMIN_ROUTES } from "./paths";
import AdminLayout from "../../auth/layout/roles/admin/AdminLayout";
import Configuration from "@/features/add-user/pages/configuration/Configuration";
import ClientPanel from "@/views/client/pages/ClientPanel";
import { ProviderPanel } from "@/views/provider/ProviderPanel";
import { ProvidersList } from "@/views/provider/pages/list/ProviderList";
import AddProvider from "@/features/add-provider/pages/AddProvider";
import { EditProvider } from "@/features/edit-provider/pages/EditProvider";
import { Client } from "@/views/client/Client";
import { EditClient } from "@/features/edit-client/pages/EditClient";
import { Payments } from "@/views/payments/Payments";
import ProductPanel from "@/views/provider/pages/product/ProductPanel";
import { VigentPaymentsPanel } from "@/views/payments/page/panel/VigentPaymentsPanel";
import EditProduct from "@/features/edit-product/pages/EditProduct";
import ProductTabs from "@/views/provider/pages/product/ProductTabs";
import { ListVigentPayments } from "@/features/list-vigent-by-provider/page/ListVigentPayments";
import { VigentPaymentPage } from "@/views/payments/page/vigent-payments/VigentPaymentPage"; // ajustá el path real
import ListPrice from "@/features/price-list/pages/PriceList";
import AddProduct from "@/features/add-product/pages/AddProduct";
import AddClient from "@/features/add-client/pages/AddClient";

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
                        element: <Payments />,
                        handle: {
                            breadcrumb: (params) =>
                                params.providerName ?? "Proveedor",
                        },
                        children: [
                            {
                                element: <VigentPaymentsPanel />,
                                children: [
                                    {
                                        index: true,
                                        element: <ListVigentPayments />,
                                        handle: {
                                            breadcrumb: "Formas de Pago",
                                        },
                                    },
                                    {
                                        path: ADMIN_ROUTES.PAYMENT.UPDATE,
                                        element: <VigentPaymentPage />,
                                        handle: {
                                            breadcrumb: "Formas de Pago",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: ADMIN_ROUTES.PRODUCTS.BASE,
                        element: <ProductPanel />,
                        handle: {
                            breadcrumb: (params) =>
                                params.providerName ?? "Proveedor",
                        },
                        children: [
                            {
                                element: <ProductTabs />,
                                children: [
                                    {
                                        index: true,
                                        element: <ListPrice />,
                                        handle: {
                                            breadcrumb: "Lista de precios",
                                        },
                                    },
                                    {
                                        path: ADMIN_ROUTES.PRODUCTS.ADD,
                                        element: <AddProduct />,
                                        handle: {
                                            breadcrumb: "Lista de precios",
                                        },
                                    },
                                ],
                            },
                            {
                                path: ADMIN_ROUTES.PRODUCTS.EDIT,
                                element: <EditProduct />,
                                handle: { breadcrumb: "Lista de precios" },
                            },
                        ],
                    },
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
