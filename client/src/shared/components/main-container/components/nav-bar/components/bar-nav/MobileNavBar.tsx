import type { linkNavbar } from "@/core/auth/layout/components/protected-routes/link";
import { navBar, wrapLogo } from "./styles";
import { NavItemsContainer } from "../nav-items-container/NavItemsContainer";
import NavButton from "../nav-button/NavButton";

interface MobileNavBarProps {
    avatar: React.ReactNode;
    brand: React.ReactNode;
    links: linkNavbar[];
    isMenuOpen: boolean;
    isActive: (name: string) => boolean;
    onActive: (name: string) => void;
    handleOpen: () => void;
    clearLink: () => void;
}

const BarNav = ({ avatar, brand, links, isActive, onActive, isMenuOpen, handleOpen, clearLink }: MobileNavBarProps) => {
    return (
        <nav className={navBar} aria-label="Navegación principal">
            <div className={wrapLogo}>{brand}</div>
            <NavItemsContainer 
                is="bar"
                avatar={avatar} 
                links={links} 
                isActive={isActive} 
                onActive={onActive} 
                clearActiveLink={clearLink} 
            />
            <NavButton isMenuOpen={isMenuOpen} handleOpen={handleOpen}>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d={
                            isMenuOpen
                                ? "M6 6l12 12M18 6L6 18"
                                : "M4 7h16M4 12h16M4 17h16"
                        }
                    />
                </svg>
            </NavButton>
        </nav>
    )
}

export default BarNav;