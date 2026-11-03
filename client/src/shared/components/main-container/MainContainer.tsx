import type { User } from "@/shared/domain/user/user";
import { Outlet, useMatches } from "react-router";
import type { linkNavbar } from "../../../core/auth/layout/components/protected-routes/link";
import { authLayout, bodyWrapper, h1 } from "./styles";
import Brand from "../brand/Brand";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import NavBar from "./components/nav-bar/NavBar";
import { usePageTitle } from "@/shared/hooks/use-page-title";
import UserDetails from "./components/nav-bar/components/user-details/UserDetails";
import type { ReactNode } from "react";

type RouteMatch = {
    handle?: {
        hideBreadcrumb?: boolean;
    };
};

interface MainContainerProps {
    links: linkNavbar[];
    avatarTo: string;
    user: User;
    children?: ReactNode;
}

const MainContainer = ({ links, user, avatarTo, children }: MainContainerProps) => {
    const title = usePageTitle();
    const matches = useMatches() as RouteMatch[];
    const hideBreadcrumb = matches.some(
        (match) => match.handle?.hideBreadcrumb === true,
    );

    return (
        <main className={authLayout}>
            <NavBar
                brand={<Brand companyLogo={user.companyLogo} />}
                avatar={
                    <UserDetails
                        user={user}
                        to={avatarTo}
                    />
                }
                links={links}
            />
            <div className={bodyWrapper}>
                {!hideBreadcrumb && <Breadcrumb />}
                {!hideBreadcrumb && title && <h1 className={h1}>{title}</h1>}
                <div>{children ?? <Outlet />}</div>
            </div>
        </main>
    );
};

export default MainContainer;
