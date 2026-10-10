import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { ProductType } from "@/features/list-types-products/types/ProductType";
import addTypeProduct from "../services/add-type-product.service";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";
import type { TypeProductRequest } from "../adapter/TypeProductRequest";

export const useAddTypeProduct = () => {
    const { isLoading, execute, refresh } = useFetch<ProductType>();
    const {
        action,
        notify,
        isCancel,
        handleNotify,
        handleCancelNotify,
        init,
    } = useNotify();

    const addTypeProductRequest = async (data: TypeProductRequest) => {
        await handleNotify(
            data,
            {
                title: "Tipo de producto agregado",
                message: (productType: ProductType) =>
                    `Se registró el tipo de producto ${productType.name}`,
            },
            {
                title: "Error Tipo de producto",
                message: (error: HttpError) => error.getMessage,
            },
            execute(addTypeProduct),
        );
    };

    const onRefresh = () => {
        refresh();
        init();
    };

    return {
        loading: isLoading,
        addTypeProduct: addTypeProductRequest,
        notify,
        action,
        isCancel,
        onRefresh,
        handleCancelNotify,
    };
};
