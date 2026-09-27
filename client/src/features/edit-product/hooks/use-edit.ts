import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { EditProduct } from "../domain/edit-product";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import { useParams } from "react-router";
import type { HttpError } from "@/core/server/errors/http-error";
import type { EditProductSchema } from "../types/product/schema";
import type { OptionalSchema } from "../types/optionals/schema";
import { editProduct } from "../services/edit-product";

const useEdit = () => {
    const { execute, refresh } = useFetch<EditProduct>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } = useNotify();
    const { idProduct } = useParams();

    async function edit(productData: EditProductSchema, optionals: OptionalSchema[], idToDelete: number[]) {
        handleNotify(
            productData, 
            {
                title: "Producto editado",
                message: (product: EditProduct) => `Se edito el producto ${product.name}`
            },
            {
                title: "Error Producto",
                message: (error: HttpError) => error.getMessage
            },
            execute(() => editProduct(productData, optionals, idToDelete, idProduct!))
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return { isCancel, notify, action, edit, onRefresh, handleCancelNotify };

} 

export default useEdit;