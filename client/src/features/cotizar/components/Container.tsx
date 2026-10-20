import { container } from "./styles";

/** Propiedades del componente {@link Container}. */
export interface ContainerProps {
    /** Contenido que se muestra dentro de la tarjeta. */
    children: React.ReactNode;
}

/**
 * Renderiza la tarjeta blanca que envuelve el contenido del formulario.
 */
export const Container = ({ children }: ContainerProps) => {
    return <section className={container}>{children}</section>;
};
