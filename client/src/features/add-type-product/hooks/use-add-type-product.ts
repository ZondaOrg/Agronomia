import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { ProductType } from "@/features/list-types-products/types/ProductType";
import addTypeProduct from "../services/add-type-product.service";

export const useAddTypeProduct = () => {
    const { error, isLoading, execute, refresh } = useFetch<ProductType>();

    return {
        error,
        loading: isLoading,
        addTypeProduct: execute(addTypeProduct),
        refresh,
    };
};
