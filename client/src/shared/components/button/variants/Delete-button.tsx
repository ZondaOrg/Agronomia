import { css } from "@styled-system/css";
import { TrashIcon } from "../../icon/components/icons/trash";
import { IconText } from "../../icon/components/iconText/IconText";

const deleteButton = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    border: "none",
    background: "transparent",
    color: "#E11D48",
    fontSize: "xs",
    cursor: "pointer",
});

export const DeleteButton = ({
    onClick,
    disabled = false,
}: {
    onClick: () => void;
    disabled?: boolean;
}) => {
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
            />
        </button>
    );
};
