import type React from "react";
import type { Params } from "react-router";

type Handle = {
    breadcrumb?: string | ((params: Params<string>) => string);
};

type IndexRouteData = {
    index: true;
    element: React.JSX.Element;
    handle?: Handle;
};

type NonIndexRouteData = {
    index?: false;
    path?: string;
    element: React.JSX.Element;
    children?: RouteData[];
    handle?: Handle;
};

export type RouteData = IndexRouteData | NonIndexRouteData;
