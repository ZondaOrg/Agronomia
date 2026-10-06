import {
    body,
    description as descriptionStyle,
    header,
    panel,
    title,
    titleGroup,
} from "./styles";

/** Tamaños disponibles para el título del panel. */
export type TitleSize = "sm" | "md" | "xl";

/** Anchos máximos disponibles para el panel. */
export type PanelMaxWidth = "sm" | "md" | "lg" | "xl" | "full";

/** Alturas máximas disponibles para el contenido del panel. */
export type BodyMaxHeight = "sm" | "md" | "lg" | "xl" | "none";

/** Propiedades del componente {@link SectionPanel}. */
export interface SectionPanelProps {
    /** Texto que se muestra como encabezado del panel. */
    title?: string;
    /** Centra el contenido del panel cuando es `true`. */
    centered?: boolean;
    /** Contenido principal del panel. */
    children: React.ReactNode;
    /** Elementos de acción que se muestran junto al título. */
    actions?: React.ReactNode;
    /** Texto descriptivo que se muestra debajo del título. */
    description?: string;
    /** Tamaño visual del título. */
    titleSize?: TitleSize;
    /** Ancho máximo del panel. */
    maxWidth?: PanelMaxWidth;
    /** Altura máxima del contenido del panel. */
    maxHeight?: BodyMaxHeight;
    /** Contenido que se muestra entre el encabezado y el cuerpo. */
    contentHeader?: React.ReactNode;
}

/**
 * Renderiza un panel reutilizable con encabezado, descripción, filtros y contenido.
 *
 * El panel permite configurar su ancho, la altura máxima de su cuerpo y la
 * alineación del contenido. Los elementos opcionales solo se renderizan cuando
 * reciben un valor.
 */
const SectionPanel = ({
    title: titleText,
    children,
    centered = false,
    actions,
    description,
    titleSize = "md",
    maxWidth = "lg",
    maxHeight = "none",
    contentHeader,
}: SectionPanelProps) => (
    <section className={panel({ maxWidth })}>
        <div className={header}>
            {titleText ? (
                <div className={titleGroup}>
                    <h2 className={title({ size: titleSize })}>{titleText}</h2>
                    {actions}
                </div>
            ) : (
                actions
            )}
            {description && <p className={descriptionStyle}>{description}</p>}
        </div>
        {contentHeader}
        <div className={body({ centered, maxHeight })}>{children}</div>
    </section>
);

export default SectionPanel;
