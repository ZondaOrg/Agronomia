import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { css } from "@styled-system/css";
import Modal from "./Modal";
import { ConfirmModal } from "./variants/commit/ConfirmModalProps";
import ButtonsContainer from "../forms/components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../forms/simple-form/types/button/credentials-button";
import ValidationForm, {
    type ValidationFormHandleProps,
} from "../forms/validation-form/ValidationForm";
import type { InferData, Schema } from "../forms/validation-form/shema";
import type { SubFormData } from "../forms/types/sub-form";

const content = css({
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    width: "100%",
});

const title = css({
    margin: 0,
    color: "#27272A",
    fontSize: "lg",
    fontWeight: "semibold",
    textAlign: "center",
});

interface ModalFormProps<T extends Schema> {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (data: InferData<T>) => void;
    subForms: SubFormData[];
    schema: T;
    buttonData: ButtonData;
    title?: ReactNode;
    loading?: boolean;
    error?: string;
}

function ModalForm<T extends Schema>({
    isOpen,
    onCancel,
    onSubmit,
    subForms,
    schema,
    buttonData,
    title: modalTitle,
    loading = false,
    error,
}: ModalFormProps<T>) {
    const form = useRef<ValidationFormHandleProps>(null);
    const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
        useState(false);

    const handleCancel = (isDirty: boolean) => {
        if (isDirty) {
            setIsCancelConfirmationOpen(true);
            return;
        }

        onCancel();
    };

    const confirmCancel = () => {
        setIsCancelConfirmationOpen(false);
        onCancel();
    };
    const requestCancel = () => form.current?.confirmCancel();

    return (
        <Modal
            isOpen={isOpen}
            onClose={requestCancel}
            loading={loading}
            compact
        >
            <div className={content}>
                {modalTitle && <h2 className={title}>{modalTitle}</h2>}
                <ValidationForm
                    ref={form}
                    subForms={subForms}
                    schema={schema}
                    onSubmit={onSubmit}
                    onCancel={handleCancel}
                />
                <ButtonsContainer
                    buttonData={buttonData}
                    cancelOption={{ onSubmit: requestCancel }}
                />
                {error && <p role="alert">{error}</p>}
            </div>
            <ConfirmModal
                isOpen={isCancelConfirmationOpen}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={confirmCancel}
                onCancel={() => setIsCancelConfirmationOpen(false)}
            />
        </Modal>
    );
}

export default ModalForm;
