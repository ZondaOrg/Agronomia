import Login from "@/features/login/pages/init/Login";
import type { RouteData } from "../route-data";
import { VISITANT } from "./paths";
import AuthenticatedServerErrorPage from "@/views/serverError/AuthenticatedServerErrorPage";

const VisitantRoutes: RouteData[] = [
    {
        path: VISITANT.LOGIN,
        element: <Login />,
        children: []
    },
    {
        path: VISITANT.SERVER_ERROR,
        element: <AuthenticatedServerErrorPage />,
        handle: { hideBreadcrumb: true },
    }
];

export default VisitantRoutes;
