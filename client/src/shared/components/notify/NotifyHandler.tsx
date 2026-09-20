import { SuccessModal } from "../modal/variants/success/ModalCreateClient";
import ErrorToast from "../toast/error/ErrorToast";
import SuccessToast from "../toast/success/SuccessToast";
import { ConfirmModal } from "../modal/variants/commit/ConfirmModalProps";
import type React from "react";
import { useNavigate } from "react-router";
import type { NotifyMessage } from "./types/notify-message";
import type { NotifyAction } from "@/shared/hooks/use-notify/modal-action";
import BackButton from "./components/back-button/BackButton";

interface NotifyHandlerProps {
    notify: NotifyMessage
    action?: NotifyAction
    isCancel: boolean
    children: React.ReactNode
    onCancel: (isData: boolean) => void
    refresh: () => void
}

function NotifyHandler({notify, action, isCancel, children, onCancel, refresh}: NotifyHandlerProps) {
    const navigate = useNavigate();

    const backToPrev = () => {
        navigate(-1);
    };

    return (
        <>
            <BackButton isCancel={isCancel} onCancel={onCancel} />
            {children}
            {isCancel && <ConfirmModal
                isOpen={action === "advertence"}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToPrev}
                onCancel={refresh}
            />}

            {notify && notify.modal && <SuccessModal
                isOpen={action === "success"}
                onClose={backToPrev}
                title={notify.modal.title}
                message={notify.modal.message}
            />}
            {action === "error" && notify.toast && <ErrorToast message={notify.toast.message} onClose={refresh} />}
            {action === "success" && notify.toast && <SuccessToast message={notify.toast.message} title={notify.toast.title} onClose={refresh} />}
        </>
    )
}

export default NotifyHandler;