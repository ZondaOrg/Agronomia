import Spinner from "@/shared/components/spinner/Spinner";
import { useGetClients } from "./hooks/use-get-clients";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useSearchParams } from "react-router";
import { styles } from "./style";
import { useEffect, useState } from "react";
import CardContainer from "./components/card-container/CardContainer";

export const ClientsGrid = () => {
    const { data, loading, getClients } = useGetClients();
    const { container, spinnerWrapper } = styles();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const [page, setPage] = useState(0);
    const [prevSearch, setPrevSearch] = useState(search);

    if (search !== prevSearch) {
        setPrevSearch(search);
        setPage(0);
    }

    useEffect(() => {
        getClients(page, search);
    }, [getClients, page, search]);

    return (
        <div className={container}>
            {loading && (
                <div className={spinnerWrapper}>
                    <Spinner />
                </div>
            )}

            {data && <CardContainer page={data} search={search} />}

            {data && data.totalPages > 1 && (
                <Pagination
                    currentPage={page + 1}
                    totalPages={data.totalPages}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                />
            )}
        </div>
    );
};

export default ClientsGrid;
