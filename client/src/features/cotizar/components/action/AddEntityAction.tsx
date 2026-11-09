import { cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/button/Button";

const addEntityRecipe = cva({
    base: {
        display: "flex",
        flexDirection: "column",
        gap: "2",
    },
    variants: {
        align: {
            left: { alignItems: "flex-start", textAlign: "left" },
            right: { alignItems: "flex-end", textAlign: "right" },
            center: { alignItems: "center", textAlign: "center" },
        },
    },
    defaultVariants: {
        align: "right",
    },
});

const addEntityHintRecipe = cva({
    base: {
        fontSize: "xs",
        color: token("colors.primaryColor"),
    },
});

export interface AddEntityActionProps {
    onClick: () => void;
    label: string;
    hint?: string;
    disabled?: boolean;
    align?: "left" | "right" | "center";
    variant?: "outline" | "solid";
}

export const AddEntityAction = ({
    onClick,
    label,
    hint,
    disabled = false,
    align = "right",
    variant = "outline",
}: AddEntityActionProps) => {
    const isSolid = variant === "solid";

    return (
        <div className={addEntityRecipe({ align })}>
            {hint && <span className={addEntityHintRecipe()}>{hint}</span>}
            <Button
                type="button"
                color={isSolid ? token("colors.primaryColor") : "#FFFFFF"}
                hoverColor={
                    isSolid ? token("colors.primaryColorHover") : "#EEF4FF"
                }
                borderColor={token("colors.primaryColor")}
                textColor={isSolid ? "#FFFFFF" : token("colors.primaryColor")}
                textHoverColor={
                    isSolid ? "#FFFFFF" : token("colors.primaryColor")
                }
                onClick={onClick}
                disabled={disabled}
            >
                + {label}
            </Button>
        </div>
    );
};
