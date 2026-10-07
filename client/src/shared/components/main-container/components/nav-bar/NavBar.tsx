import { useState } from "react";
import useSelect from "@/shared/hooks/use-selected-active";
import type { linkNavbar } from "../../../../../core/auth/layout/components/protected-routes/link";
import BarNav from "./components/bar-nav/MobileNavBar";
import SideBarNav from "./components/sidebar-nav/SideBarNav";

const NavBar = ({
    avatar,
    brand,
    links,
}: {
    avatar: React.ReactNode;
    brand: React.ReactNode;
    links: linkNavbar[];
}) => {
    const { isActive, onActive } = useSelect();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const selectLink = (name: linkNavbar["name"]) => {
        onActive(name);
        setIsMenuOpen(false);
    };

    const clearActiveLink = () => {
        onActive("");
    };

    return (
        <>
            <BarNav
                avatar={avatar}
                brand={brand}
                links={links}
                isMenuOpen={isMenuOpen}
                isActive={isActive}
                onActive={onActive}
                handleOpen={() => setIsMenuOpen((open) => !open)}
                clearLink={clearActiveLink}
            />
            {isMenuOpen && <SideBarNav 
                avatar={avatar} 
                links={links} 
                isActive={isActive} 
                onActive={selectLink} 
                clearLink={clearActiveLink} 
                refreshMenu={() => setIsMenuOpen(false)} />}
        </>
    );
};

export default NavBar;
