import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Product } from "../domain/product";
import { useEffect } from "react";
import { useParams } from "react-router";
import getProduct from "../services/get-product";

const useGetById = () => {
    const { data, execute } = useFetch<Product>();
    const { idProduct } = useParams();

    useEffect(() => {
        execute(getProduct)(idProduct!);
    }, []);

    return { product: data }
}

export default useGetById;