import type { User } from "@/shared/domain/user/user";
import { Outlet } from "react-router";
import type { linkNavbar } from "../../../core/auth/layout/components/protected-routes/link";
import { authLayout, bodyWrapper, h1 } from "./styles";
import Brand from "../brand/Brand";
import Avatar from "../avatar/Avatar";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import NavBar from "./components/nav-bar/NavBar";
import { usePageTitle } from "@/shared/hooks/use-page-title";

interface MainContainerProps {
    links: linkNavbar[];
    avatarTo: string;
    user: User;
}

const MainContainer = ({ links, user, avatarTo }: MainContainerProps) => {
    const title = usePageTitle();

    return (
        <main className={authLayout}>
            <NavBar
                brand={<Brand companyLogo={user.companyLogo} />}
                avatar={
                    <Avatar
                        avatar={user}
                        to={avatarTo}
                    />
                }
                links={links}
            />
            <div className={bodyWrapper}>
                <Breadcrumb />
                <h1 className={h1}>{title}</h1>
                <div>
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default MainContainer;
