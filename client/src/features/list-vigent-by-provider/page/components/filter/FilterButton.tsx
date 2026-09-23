import { css } from "@styled-system/css";

const filtrarStyle = css({
    display: "flex",
    alignItems: "center",
    gap: "1",
    fontSize: "sm",
    color: "blue.600",
    fontWeight: "medium",
    cursor: "pointer",
    _hover: { textDecoration: "underline" },
});

export const FiltrarButton = ({ onClick }: { onClick?: () => void }) => (
    <button
        className={filtrarStyle}
        onClick={onClick}
    >
        Filtrar
        {/* <Filter size={14} /> */}
    </button>
);
