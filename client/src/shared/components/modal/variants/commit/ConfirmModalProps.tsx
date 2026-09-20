import Button from "@/shared/components/button/Button";
import Modal from "@/shared/components/modal/Modal";
import { token } from "@styled-system/tokens";
import {
    confirmActions,
    confirmContent,
    confirmMessage,
    confirmTitle,
} from "./style";

type ConfirmModalProps = {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    danger?: boolean;
};

export const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    danger = false,
}: ConfirmModalProps) => {
    return (
        <Modal
            isOpen={Boolean(isOpen)}
            onClose={onCancel}
            compact
        >
            <div className={confirmContent}>
                <h2 className={confirmTitle}>{title}</h2>
                <p className={confirmMessage}>{message}</p>
                <div className={confirmActions}>
                    <Button
                        color="white"
                        hoverColor={token("colors.primaryColorHover") + "20"}
                        borderColor={token("colors.primaryColor")}
                        textColor={token("colors.primaryColor")}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        color={
                            danger
                                ? token("colors.danger")
                                : token("colors.primaryColor")
                        }
                        hoverColor={
                            danger
                                ? token("colors.danger")
                                : token("colors.primaryColorHover")
                        }
                        textColor="white"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
