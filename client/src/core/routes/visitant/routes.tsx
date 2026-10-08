import Login from "@/features/login/pages/init/Login";
import type { RouteData } from "../route-data";
import { VISITANT } from "./paths";

const VisitantRoutes: RouteData[] = [
    {
        path: VISITANT.LOGIN,
        element: <Login />,
        children: []
    }
];

export default VisitantRoutes;