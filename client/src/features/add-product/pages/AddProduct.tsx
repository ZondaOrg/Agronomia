import useAddProduct from "../hooks/add-product";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import { productSections } from "../types/multi-form";
import type { AddProductSchema } from "../types/product/schema";
import type { OptionalSchema } from "../types/optional/schema";
import useGetAllTypes from "../hooks/get-all-types";

const AddProduct = () => {
    const { isCancel, notify, action, add, onRefresh, handleCancelNotify } = useAddProduct();
    const { productTypes } = useGetAllTypes();

    const handleSubmit = (data: unknown[]) => {
            const [products, optionals] = data as [
                AddProductSchema,
                OptionalSchema[],
            ];
    
            add(products, optionals);
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
                sections={productSections(productTypes ?? [])}
                submitLabel="Guardar forma de pago"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
}

export default AddProduct;