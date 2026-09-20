import { SuccessModal } from "../modal/variants/success/ModalCreateClient";
import ErrorToast from "../toast/error/ErrorToast";
import SuccessToast from "../toast/success/SuccessToast";
import { ConfirmModal } from "../modal/variants/commit/ConfirmModalProps";
import type React from "react";
import Button from "../button/Button";
import { token } from "@styled-system/tokens";
import { css } from "@styled-system/css";
import { useNavigate } from "react-router";
import type { NotifyMessage } from "./types/notify-message";
import type { ModalAction } from "@/shared/types/modal/modal-action";

interface NotifyHandlerProps {
    notify: NotifyMessage
    action?: ModalAction
    isCancel: boolean
    children: React.ReactNode
    refresh: () => void
}

const backButtonContainer = css({
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "24px",
});

function NotifyHandler({notify, action, isCancel, children, refresh}: NotifyHandlerProps) {
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