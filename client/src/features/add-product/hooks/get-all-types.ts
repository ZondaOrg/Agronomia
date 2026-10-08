import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useEffect } from "react";
import { getAllTypes } from "../services/getAllTypes";
import type { ProductType } from "../domain/product-type";

const useGetAllTypes = () => {
    const {execute, data} = useFetch<ProductType[]>();

    useEffect(() => {
        execute(getAllTypes)();
    }, [execute]);



    return {productTypes: data}
}

export default useGetAllTypes;
