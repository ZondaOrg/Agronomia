export const getPageNumbers = (
    currentPage: number,
    totalPages: number,
): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
        const isEdge = i === 1 || i === totalPages;
        const isNearCurrent =
            i >= currentPage - delta && i <= currentPage + delta;

        if (isEdge || isNearCurrent) {
            const lastPage = pages[pages.length - 1];

            if (typeof lastPage === "number" && i - lastPage === 2) {
                pages.push(lastPage + 1);
            }

            pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...");
        }
    }

    return pages;
};
