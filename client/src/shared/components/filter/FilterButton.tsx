import { useState } from "react";
import { FilterIcon } from "@/shared/components/icon/components/icons/FilterIcon";
import { filtrarStyle } from "./styles";

export const FiltrarButton = ({
    onToggle,
}: {
    onToggle?: (isVisible: boolean) => void;
}) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleClick = () => {
        const next = !isFilterVisible;
        setIsFilterVisible(next);
        onToggle?.(next);
    };

    return (
        <button
            className={filtrarStyle}
            onClick={handleClick}
        >
            {isFilterVisible ? "Ocultar filtro" : "Filtrar"}
            <FilterIcon size={14} />
        </button>
    );
};
