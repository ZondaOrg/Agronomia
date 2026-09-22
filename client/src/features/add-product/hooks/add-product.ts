import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { AddedProduct } from "../domain/product";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { HttpError } from "@/core/server/errors/http-error";
import addProduct from "../services/add";
import { useParams } from "react-router";
import type { AddProductSchema } from "../types/product/schema";
import type { OptionalSchema } from "../types/optional/schema";

const useAddProduct = () => {
    const { execute, refresh } = useFetch<AddedProduct>();
    const { idProvider } = useParams();

    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } = useNotify()

    async function add(productData: AddProductSchema, optionals: OptionalSchema[]) {
        handleNotify(
            productData, 
            {
                title: "Producto agregado",
                message: (product: AddedProduct) => `Se registro el producto ${product.name}`
            },
            {
                title: "Producto Cliente",
                message: (error: HttpError) => error.getMessage
            },
            execute(() => addProduct(productData, optionals, idProvider!))
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { isCancel, notify, action, add, onRefresh, handleCancelNotify };
}

export default useAddProduct;