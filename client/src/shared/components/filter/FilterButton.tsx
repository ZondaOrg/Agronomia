import { FilterIcon } from "@/shared/components/icon/components/icons/FilterIcon";
import { filtrarStyle } from "./styles";

export const FiltrerButton = ({
    isActive,
    onToggle,
}: {
    isActive: boolean;
    onToggle: () => void;
}) => (
    <button
        className={filtrarStyle}
        onClick={onToggle}
    >
        {isActive ? "Ocultar filtro" : "Filtrar"}
        <FilterIcon size={14} />
    </button>
);
