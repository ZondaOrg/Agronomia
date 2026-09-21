import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { AddedProduct } from "../domain/product";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { AddProductRequest } from "../adapters/request/add-product";
import type { HttpError } from "@/core/server/errors/http-error";
import addProduct from "../services/add";

const useAddProduct = () => {
    const { execute, refresh } = useFetch<AddedProduct>();

    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } = useNotify()

    async function add(productData: AddProductRequest) {
        handleNotify(
            productData, 
            {
                title: "Cliente agregado",
                message: (product: AddedProduct) => `Se registro el producto ${product.name}`
            },
            {
                title: "Error Cliente",
                message: (error: HttpError) => error.getMessage
            },
            execute(addProduct)
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { isCancel, notify, action, add, onRefresh, handleCancelNotify };
}

export default useAddProduct;