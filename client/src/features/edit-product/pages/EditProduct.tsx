import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import useEdit from "../hooks/use-edit";
import useGetById from "../hooks/use-get-by-id";
import { productForm } from "../types/multiform";
import type { EditProductSchema } from "../types/product/schema";
import type { OptionalSchema } from "../types/optionals/schema";
import useOptionalPage from "../hooks/use-optional-pages";

export const EditProduct = () => {
    const { notify, action, isCancel, edit, onRefresh, handleCancelNotify } = useEdit();
    const { product } = useGetById();
    const { onChangeOptionalPage, optionals } = useOptionalPage();

    const handleSubmit = (
        formData: unknown[],
        deletedIdsBySection?: (number[] | undefined)[],
    ) => {
        const [fieldsData, optionalsToAdd] = formData as [
            EditProductSchema,
            OptionalSchema[],
        ];

        const deleteProducts = deletedIdsBySection?.[1] ?? [];

        edit(fieldsData, optionalsToAdd, deleteProducts);
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
            {product && <MultiForm
                sections={productForm(product, onChangeOptionalPage, optionals)}
                submitLabel="Guardar cambios"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />}
        </NotifyHandler>
    );
};

export default EditProduct;