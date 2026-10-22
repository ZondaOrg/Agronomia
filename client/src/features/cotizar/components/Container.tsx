import { container, title as titleStyle } from "./styles";

/** Propiedades del componente {@link Container}. */
export interface ContainerProps {
    /** El título que se muestra en la tarjeta. */
    title?: string;
    /** Contenido que se muestra dentro de la tarjeta. */
    children: React.ReactNode;
}

/**
 * Renderiza la tarjeta blanca que envuelve el contenido del formulario.
 */
export const Container = ({ title, children }: ContainerProps) => {
    return (
        <section className={container}>
            <h1 className={titleStyle}>{title}</h1>
            {children}
        </section>
    );
};
