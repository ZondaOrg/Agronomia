import { getPageNumbers } from "./getPageNumbers";
import { styles } from "./styles";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const { nav, navButton, pageButton, activePageButton, ellipsis } = styles();

    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <nav className={nav}>
            <button
                type="button"
                className={navButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹ Anterior
            </button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${index}`}
                        className={ellipsis}
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        className={
                            page === currentPage ? activePageButton : pageButton
                        }
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                type="button"
                className={navButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente ›
            </button>
        </nav>
    );
};
