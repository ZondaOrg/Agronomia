import { useCallback } from "react";
import ModalForm from "@/shared/components/modal/ModalForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import type { InferData } from "@/shared/components/forms/validation-form/shema";
import { useAddTypeProduct } from "../hooks/use-add-type-product";
import { typeProductSchema } from "../types/type-product-schema";
import { typeProductSubForms } from "../types/type-product-subforms";

interface CreateTypeProductProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export const CreateTypeProduct = ({
    isOpen,
    onClose,
    onCreated,
}: CreateTypeProductProps) => {
    const {
        addTypeProduct,
        action,
        isCancel,
        loading,
        notify,
        onRefresh,
        handleCancelNotify,
    } = useAddTypeProduct();

    const handleSubmit = useCallback(
        async (data: InferData<typeof typeProductSchema>) => {
            await addTypeProduct(data);
            onCreated?.();
        },
        [addTypeProduct, onCreated],
    );

    const handleNotificationClose = () => {
        if (action === "success") {
            onClose();
        }
        onRefresh();
    };

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={false}
            refresh={handleNotificationClose}
            onCancel={handleCancelNotify}
            onSuccess={handleNotificationClose}
        >
            <ModalForm
                isOpen={isOpen}
                onCancel={onClose}
                onSubmit={handleSubmit}
                subForms={typeProductSubForms}
                schema={typeProductSchema}
                buttonData={{ text: "Añadir tipo" }}
                title="Añadir tipo de producto"
                loading={loading}
            />
        </NotifyHandler>
    );
};
