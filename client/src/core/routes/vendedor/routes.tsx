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
import ProductPanel from "@/views/provider/pages/product/ProductPanel";
import ProductTabs from "@/views/provider/pages/product/ProductTabs";
import ListPrice from "@/features/price-list/pages/PriceList";
import { Products } from "@/views/product/Products";
import { ListTypesProductsPage } from "@/views/product/pages/ListTypesProductsPage";
import { ListProductByTypePage } from "@/views/product/pages/ListProductByTypePage";

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
                    {
                        path: VENDEDOR_ROUTES.PRODUCTS.BASE,
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
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: VENDEDOR_ROUTES.PRODUCTS.ROOT,
                element: <Products />,
                handle: { breadcrumb: "Productos", pageTitle: false },
                children: [
                    {
                        index: true,
                        element: <ListTypesProductsPage />,
                    },
                    {
                        path: VENDEDOR_ROUTES.PRODUCTS.BY_TYPE,
                        element: <ListProductByTypePage />,
                        handle: {
                            breadcrumb: (params) =>
                                params.typeName ?? "Tipo de producto",
                        },
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
