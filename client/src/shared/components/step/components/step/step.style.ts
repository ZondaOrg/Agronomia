import { cva, type RecipeVariantProps } from "@styled-system/css";

/**
 * Recipe del bloque de acciones del {@link Step}.
 *
 * Variantes:
 * - `align`: alineación horizontal de los botones dentro del bloque.
 * - `gap`: separación entre botones.
 * - `position`: margen según dónde se renderiza el bloque, para separarlo
 *   del contenido vecino. En `aside` no hay margen, porque la separación
 *   la da el `gap` de {@link asideRowRecipe}.
 */
export const actionsRecipe = cva({
    base: {
        display: "flex",
        alignItems: "center",
    },
    variants: {
        align: {
            left: { justifyContent: "flex-start" },
            center: { justifyContent: "center" },
            right: { justifyContent: "flex-end" },
            between: { justifyContent: "space-between" },
        },
        gap: {
            sm: { gap: "2" },
            md: { gap: "3" },
            lg: { gap: "4" },
        },
        position: {
            top: { width: "100%", marginBottom: "4" },
            aside: {},
            between: { width: "100%", marginY: "4" },
            bottom: { width: "100%", marginTop: "6" },
        },
    },
    defaultVariants: {
        align: "right",
        gap: "md",
        position: "bottom",
    },
});

/**
 * Fila que contiene el filtro y el bloque de acciones cuando
 * `actionsPosition` es `"aside"`.
 *
 * El filtro ocupa el espacio restante y las acciones se alinean arriba
 * a la derecha, con ancho según su contenido.
 */
export const asideRowRecipe = cva({
    base: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "6",
        width: "100%",
        "& > :first-child": {
            flex: "1",
            minWidth: "0",
        },
        "& > :last-child": {
            flexShrink: "0",
        },
    },
});

import { css } from "@styled-system/css";

export const title = css({
    fontSize: "lg",
    fontWeight: "semibold",
    color: "#18181B",
});

/** Variantes aceptadas por {@link actionsRecipe}. */
export type ActionsVariants = NonNullable<
    RecipeVariantProps<typeof actionsRecipe>
>;
