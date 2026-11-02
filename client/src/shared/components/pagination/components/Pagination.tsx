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
    const { nav, navButton, pageButton, ellipsis } = styles();

    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);

    const handlePageClick = (page: number | string) => {
        if (typeof page !== "number") return;

        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <nav className={nav}>
            <button
                type="button"
                className={navButton}
                onClick={() => handlePageClick(currentPage - 1)}
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
                        className={pageButton}
                        data-active={page === currentPage}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                type="button"
                className={navButton}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente ›
            </button>
        </nav>
    );
};
