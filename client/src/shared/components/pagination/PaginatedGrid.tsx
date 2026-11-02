import Spinner from "@/shared/components/spinner/Spinner";
import type { Page } from "@/shared/types/page/Page";
import type { ReactNode } from "react";
import { Pagination } from "./components/Pagination";
import { ScrollToTopButton } from "./components/button/ScrollToTopButton";

interface PaginatedGridProps<T> {
    data: Page<T> | null | undefined;
    loading: boolean;
    currentPage: number;
    onPageChange: (page: number) => void;
    renderCard: (item: T, index: number) => ReactNode;
    emptyState: ReactNode;
    containerClassName?: string;
    gridClassName?: string;
}

export const PaginatedGrid = <T,>({
    data,
    loading,
    currentPage,
    onPageChange,
    renderCard,
    emptyState,
    containerClassName,
    gridClassName,
}: PaginatedGridProps<T>) => {
    return (
        <div className={containerClassName}>
            {loading && <Spinner />}

            {data && data.content.length > 0 && (
                <div className={gridClassName}>
                    {data.content.map((item, index) => renderCard(item, index))}
                </div>
            )}

            {data && data.content.length === 0 && !loading && emptyState}

            {data && data.totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={onPageChange}
                />
            )}

            <ScrollToTopButton />
        </div>
    );
};
