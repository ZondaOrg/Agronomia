import { useMatches } from "react-router";

interface Match {
    pathname: string;
    handle?: { breadcrumb?: string; pageTitle?: string | false };
}

export const usePageTitle = () => {
    const matches = useMatches() as Match[];
    const crumbs = matches.filter((match) => match.handle?.breadcrumb);
    const lastCrumb = crumbs[crumbs.length - 1];

    if (lastCrumb?.handle?.pageTitle === false) return "";

    return (
        lastCrumb?.handle?.pageTitle ??
        lastCrumb?.handle?.breadcrumb ??
        ""
    );
};
