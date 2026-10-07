import type { linkNavbar } from "@/core/auth/layout/components/protected-routes/link";
import { Link } from "react-router"
import { drawerList, item, navBarList, selectedItem } from "./styles";

interface NavItemsContainerProps {
    is: 'drawer' | 'bar';
    links: linkNavbar[];
    avatar?: React.ReactNode;
    isActive: (name: string) => boolean;
    onActive: (name: string) => void;
    clearActiveLink: () => void;
}

export const NavItemsContainer = ({ is, links, avatar, isActive, onActive, clearActiveLink }: NavItemsContainerProps) => {
    return (
        <ul className={is === 'drawer' ? drawerList : navBarList}>
            {links.map((link) => (
                <li key={link.name}>
                    <Link
                        to={link.path}
                        className={
                            isActive(link.name) ? selectedItem : item
                        }
                        onClick={() => onActive(link.name)}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
                {avatar && (
                    <li onClick={clearActiveLink}>
                        {avatar}
                    </li>
                )}
        </ul>
    )
}