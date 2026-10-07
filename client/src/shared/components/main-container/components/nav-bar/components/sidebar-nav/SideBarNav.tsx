import type { linkNavbar } from "@/core/auth/layout/components/protected-routes/link";
import { NavItemsContainer } from "../nav-items-container/NavItemsContainer"
import { drawer, drawerAvatar, drawerContent, mobileOnly, overlay } from "./styles";

interface SideBarNavProps {
    links: linkNavbar[];
    avatar: React.ReactNode;
    isActive: (name: string) => boolean;
    onActive: (name: string) => void;
    clearLink: () => void;
    refreshMenu: () => void;
}

const SideBarNav = ({ links, avatar, isActive, onActive, clearLink, refreshMenu }: SideBarNavProps) => {
    return (
        <div className={mobileOnly}>
            <button
                type="button"
                className={overlay}
                aria-label="Cerrar menú de navegación"
                onClick={refreshMenu}
            />
            <aside
                id="mobile-navigation"
                className={drawer}
                aria-label="Menú de navegación"
            >
                <div className={drawerContent}>
                    <NavItemsContainer
                        is="drawer"
                        links={links} 
                        isActive={isActive} 
                        onActive={onActive} 
                        clearActiveLink={clearLink}
                    />
                    <div
                        className={drawerAvatar}
                        onClick={clearLink}
                    >
                        {avatar}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default SideBarNav;