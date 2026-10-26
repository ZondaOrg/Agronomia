import { cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/button/Button"; // Ajustá si la ruta de tu Button es otra

const addClientRecipe = cva({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "2",
    },
});

const addClientHintRecipe = cva({
    base: {
        fontSize: "xs",
        color: token("colors.primaryColor"),
        textAlign: "right",
    },
});

export interface AddClientActionProps {
    onClick: () => void;
    hint?: string;
    label?: string;
    disabled?: boolean;
}

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
