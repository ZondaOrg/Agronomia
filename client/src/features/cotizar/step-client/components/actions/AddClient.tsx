import { cva } from "@styled-system/css";

/**
 * Estilos del contenedor de {@link AddClientAction}.
 *
 * Apila el texto de ayuda sobre el botón y los alinea a la derecha,
 * para que queden pegados al borde del bloque `aside` del `Step`.
 */
const addClientRecipe = cva({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "2",
    },
});

/**
 * Estilos del texto de ayuda que aclara qué pasa al crear el cliente.
 */
const addClientHintRecipe = cva({
    base: {
        fontSize: "xs",
        color: token("colors.primaryColor"),
        textAlign: "right",
    },
});

/** Propiedades del componente `AddClientAction`. */
export interface AddClientActionProps {
    /** Se ejecuta al presionar "Añadir cliente". */
    onClick: () => void;

    /**
     * Texto de ayuda que se muestra sobre el botón.
     * @default "Al crear el cliente, volvés a la cotización."
     */
    hint?: string;

    /**
     * Texto del botón.
     * @default "Añadir cliente"
     */
    label?: string;

    /**
     * Deshabilita el botón.
     * @default false
     */
    disabled?: boolean;
}

import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";

/**
 * Acción para crear un cliente nuevo.
 *
 * Muestra un texto de ayuda que aclara que, al terminar el alta, se vuelve
 * a la cotización, y debajo el botón "Añadir cliente". Pensada para usarse
 * como `actions` del `Step` con `actionsPosition="aside"`.
 *
 * @example
 * <AddClientAction onClick={handleAddClient} />
 */
export const AddClientAction = ({
    onClick,
    hint = "Al crear el cliente, volvés a la cotización.",
    label = "Añadir cliente",
    disabled = false,
}: AddClientActionProps) => (
    <div className={addClientRecipe()}>
        <span className={addClientHintRecipe()}>{hint}</span>
        <Button
            type="button"
            color="#FFFFFF"
            hoverColor="#EEF4FF"
            borderColor={token("colors.primaryColor")}
            textColor={token("colors.primaryColor")}
            textHoverColor={token("colors.primaryColor")}
            onClick={onClick}
            disabled={disabled}
        >
            + {label}
        </Button>
    </div>
);
