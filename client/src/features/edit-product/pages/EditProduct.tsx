import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import type { Product } from "../domain/product";
import useEdit from "../hooks/use-edit";
import useGetById from "../hooks/use-get-by-id";
import { productForm } from "../types/multiform";

export const EditProduct = () => {
    const {notify, action, isCancel, edit, onRefresh, handleCancelNotify } = useEdit();
    const  { product } = useGetById();

    const handleSubmit = (
        formData: unknown[],
        deletedIdsBySection?: (number[] | undefined)[],
    ) => {
        const [fieldsData, newProducts] = formData as [
            { nameList: string },
            Product,
        ];

        const deleteProducts = deletedIdsBySection?.[1] ?? [];

        edit(newProducts, deleteProducts);
    };


    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={false}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <MultiForm
                sections={productForm(product!)}
                submitLabel="Guardar cambios"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};

export default EditProduct;