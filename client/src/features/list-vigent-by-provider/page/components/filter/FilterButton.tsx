import { filtrarStyle } from "./styles";

export const FiltrarButton = ({ onClick }: { onClick?: () => void }) => (
    <button
        className={filtrarStyle}
        onClick={onClick}
    >
        Filtrar
        {/* <Filter size={14} /> */}
    </button>
);
