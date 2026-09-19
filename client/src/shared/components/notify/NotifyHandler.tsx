import type { Notify } from "./types/notify";
import { SuccessModal } from "../modal/variants/success/ModalCreateClient";
import ErrorToast from "../toast/error/ErrorToast";
import SuccessToast from "../toast/success/SuccessToast";
import { ConfirmModal } from "../modal/variants/commit/ConfirmModalProps";
import type React from "react";
import Button from "../button/Button";
import { token } from "@styled-system/tokens";
import { css } from "@styled-system/css";
import type { ModalAction } from "@/shared/types/modal/modal-action";
import { useNavigate } from "react-router";

interface NotifyHandlerProps {
    notify: Notify
    children: React.ReactNode
    action?: ModalAction
    onClose: () => void
    refreshNotify: () => void
}

const backButtonContainer = css({
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "24px",
});

function NotifyHandler ({notify, action, children, onClose, refreshNotify}: NotifyHandlerProps) {
    const navigate = useNavigate();

    const backToPrev = () => {
        navigate(-1);
    };

    return (
        <>
            <div className={backButtonContainer}>
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={backToPrev}
                >
                    ← Regresar
                </Button>
            </div>
            {children}
            <ConfirmModal
                isOpen={action === "advertence"}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToPrev}
                onCancel={refreshNotify}
            />

            {notify.modal && <SuccessModal
                isOpen={action === "success"}
                onClose={backToPrev}
                title={notify.modal.title}
                message={notify.modal.message}
            />}
            {action === "error" && notify.toast && <ErrorToast message={notify.toast.message} onClose={onClose} />}
            {action === "success" && notify.toast && <SuccessToast message={notify.toast.message} title={notify.toast.title} onClose={onClose} />}
        </>
    )
}

export default NotifyHandler;