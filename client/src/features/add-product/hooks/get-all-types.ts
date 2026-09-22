import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useEffect } from "react";
import type { ProductType } from "../domain/product-type";
import { getAllTypes } from "../services/getAllTypes";

const useGetAllTypes = () => {
    const {execute, data} = useFetch<ProductType[]>();

    useEffect(() => {
        execute(getAllTypes);
    }, []);

    return {data}
}

export default useGetAllTypes;