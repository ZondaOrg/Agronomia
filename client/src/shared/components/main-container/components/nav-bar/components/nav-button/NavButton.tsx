import { styles } from "./styles";


interface NavButtonProps {
    isMenuOpen: boolean;
    handleOpen: () => void;
    children: React.ReactNode;
}

const NavButton = ({ isMenuOpen, children, handleOpen }: NavButtonProps) => {
    return (
        <button
                type="button"
                className={styles}
                aria-label={
                    isMenuOpen
                        ? "Cerrar menú de navegación"
                        : "Abrir menú de navegación"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                onClick={handleOpen}
            >
                {children}
        </button>
    )
}

export default NavButton;