import type { PageInfo } from "@/shared/types/table/Table";
import { Pagination } from "../../../pagination/Pagination";
import { pagination, size, paginationButton } from "../style";

interface TableFooterProps {
    page: PageInfo;
    rowsShown: number;
    nameElements: string;
    onPageChange?: (page: number) => void;
}

export const TableFooter = ({
    page,
    rowsShown,
    nameElements,
    onPageChange,
}: TableFooterProps) => {
    if (page.totalElements === 0 && page.totalPages <= 1) {
        return null;
    }

    return (
        <footer className={pagination}>
            <span className={size}>
                Mostrando {rowsShown} de {page.totalElements} {nameElements}
            </span>
            <div className={paginationButton}>
                {onPageChange && page.totalPages > 1 && (
                    <Pagination
                        currentPage={page.page + 1}
                        totalPages={page.totalPages}
                        onPageChange={(nextPage) => onPageChange(nextPage - 1)}
                    />
                )}
            </div>
        </footer>
    );
};

export default TableFooter;
