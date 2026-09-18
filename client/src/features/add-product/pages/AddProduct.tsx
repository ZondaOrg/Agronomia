import useIsModal from "@/shared/hooks/use-is-modal";
import useAddProduct from "../hooks/add-product";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { ConfirmModal } from "@/shared/components/modal/variants/ConfirmModalProps";
import { ModalCreateClient } from "@/features/add-client/components/modal-create-client/ModalCreateClient";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import SuccessToast from "@/shared/components/toast/success/SuccessToast";
import type { AddProductRequest } from "../adapters/request/add-product";
import productSubForms from "../types/sub-forms";
import productSchema from "../types/schema";

const AddProduct = () => {
    const { add, refresh, data, error } = useAddProduct();
    const { isOpen, onOpenIs, backToPrev, refresh: r } = useIsModal();

    const handleProduct = async (data: AddProductRequest) => {
        const product = await add(data);
        if (product) onOpenIs(!!product, "confirm");
    };

    return (
        <>
            <ComposeForm
                subForms={productSubForms}
                schema={productSchema}
                buttonData={{ text: "Agregar producto" }}
                onSubmit={handleProduct}
                onCancel={(isData) => onOpenIs(isData, "advertence")}
            />
            <ConfirmModal
                isOpen={isOpen("advertence")}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToPrev}
                onCancel={r}
            />

            <ModalCreateClient
                isOpen={isOpen("confirm")}
                onClose={backToPrev}
                title="Producto agregado"
                message="El producto ha sido agregado correctamente."
            />
            {error && (
                <ErrorToast
                    message={error.message}
                    onClose={refresh}
                />
            )}
            {data && (
                <SuccessToast
                    message={`Se ha creado el product ${data.name}`}
                    title="Producto creado"
                    onClose={refresh}
                />
            )}
        </>
    );
}

export default AddProduct;