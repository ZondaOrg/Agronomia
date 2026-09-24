import type { ReactNode } from "react";
import { filterPanelStyle } from "./styles";

export const FilterPanel = ({
    isVisible,
    children,
}: {
    isVisible: boolean;
    children: ReactNode;
}) => {
    if (!isVisible) return null;

    return <div className={filterPanelStyle}>{children}</div>;
};
