import { Link, useMatches, type Params } from "react-router";
import {
    breadcrumbList,
    breadcrumbItem,
    breadcrumbLink,
    separator,
} from "./styles";

interface Match {
    pathname: string;
    params: Params<string>;
    handle?: {
        breadcrumb?: string | ((params: Params<string>) => string);
    };
}

const Breadcrumb = () => {
    const matches = useMatches() as Match[];

    const crumbs = matches
        .map((match) => {
            const breadcrumb = match.handle?.breadcrumb;

            return {
                pathname: match.pathname,
                label:
                    typeof breadcrumb === "function"
                        ? breadcrumb(match.params)
                        : breadcrumb,
            };
        })
        .filter((crumb) => crumb.label);

    return (
        <nav className={breadcrumbList}>
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                    <span
                        key={crumb.pathname}
                        className={breadcrumbItem}
                    >
                        {isLast ? (
                            <span>{crumb.label}</span>
                        ) : (
                            <>
                                <Link
                                    to={crumb.pathname}
                                    className={breadcrumbLink}
                                >
                                    {crumb.label}
                                </Link>
                                <span className={separator}> {">"}</span>
                            </>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
