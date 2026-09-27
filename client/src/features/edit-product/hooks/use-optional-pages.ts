import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import { useParams } from "react-router";
import { getPageOffOptionals } from "../services/get-page-off-optionals";

const useOptionalPage = () => {
    const { idProduct } = useParams();
    const { fetchPage, data } = usePaginatedFetch(getPageOffOptionals);

    function onChangeOptionalPage(newPage: number) {
        fetchPage(newPage, 4, idProduct!);
    }

    return { onChangeOptionalPage, optionals: data }
}

export default useOptionalPage;