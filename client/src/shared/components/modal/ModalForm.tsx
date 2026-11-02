import type { ReactNode } from "react";
import { css } from "@styled-system/css";
import Modal from "./Modal";
import ButtonsContainer from "../forms/components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../forms/simple-form/types/button/credentials-button";
import ValidationForm from "../forms/validation-form/ValidationForm";
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
    onDirty: () => void;
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
    onDirty,
    onSubmit,
    subForms,
    schema,
    buttonData,
    title: modalTitle,
    loading = false,
    error,
}: ModalFormProps<T>) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            loading={loading}
            compact
        >
            <div className={content}>
                {modalTitle && <h2 className={title}>{modalTitle}</h2>}
                <ValidationForm
                    onDirty={onDirty}
                    subForms={subForms}
                    schema={schema}
                    onSubmit={onSubmit}
                />
                <ButtonsContainer
                    buttonData={buttonData}
                    cancelOption={{ onSubmit: onCancel }}
                />
                {error && <p role="alert">{error}</p>}
            </div>
        </Modal>
    );
}

export default ModalForm;
