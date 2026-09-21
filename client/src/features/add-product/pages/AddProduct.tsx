import useAddProduct from "../hooks/add-product";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import productSubForms from "../types/sub-forms";
import productSchema from "../types/schema";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

const AddProduct = () => {
    const { isCancel, notify, action, add, onRefresh, handleCancelNotify } = useAddProduct();

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={false}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <ComposeForm
                subForms={productSubForms}
                schema={productSchema}
                buttonData={{ text: "Agregar producto" }}
                onSubmit={add}
                size="lg"
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
}

export default AddProduct;