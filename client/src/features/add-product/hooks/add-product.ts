import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { AddedProduct } from "../domain/product";
import add from "../services/add";

const useAddProduct = () => {
    const { data, error, execute, refresh } = useFetch<AddedProduct>();

    return { data, error, add: execute(add), refresh }
}

export default useAddProduct;