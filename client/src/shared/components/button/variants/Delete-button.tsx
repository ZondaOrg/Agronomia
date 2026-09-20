import { css } from "@styled-system/css";
import { IconText } from "../../icon/components/iconText/IconText";
import { TrashIcon } from "../../icon/components/icons/Trash";

const deleteButton = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    border: "none",
    background: "transparent",
    fontSize: "xs",
    cursor: "pointer",

    _disabled: {
        cursor: "not-allowed",
        opacity: 0.5,
    },
});

export const DeleteButton = ({
    onClick,
    disabled = false,
}: {
    onClick: () => void;
    disabled?: boolean;
}) => {
    const color = disabled ? "#A1A1AA" : "#E11D48";

    return (
        <button
            className={deleteButton}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            <IconText
                icon={TrashIcon}
                value="Eliminar"
                textColor={color}
                iconColor={color}
            />
        </button>
    );
};
