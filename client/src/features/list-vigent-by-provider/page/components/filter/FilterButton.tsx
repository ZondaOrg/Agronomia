import { FilterIcon } from "@/shared/components/icon/components/icons/FilterIcon";
import { filtrarStyle } from "./styles";

export const FiltrarButton = ({ onClick }: { onClick?: () => void }) => (
    <button
        className={filtrarStyle}
        onClick={onClick}
    >
        Filtrar
        <FilterIcon size={14} />
    </button>
);
