import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useEffect } from "react";
import { getAllTypes } from "../services/getAllTypes";

const useGetAllTypes = () => {
    const {execute, data} = useFetch<string[]>();

    useEffect(() => {
        execute(getAllTypes)();
    }, []);



    return {productTypes: data}
}

export default useGetAllTypes;