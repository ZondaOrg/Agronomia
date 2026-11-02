import Button from "@/shared/components/button/Button";
import Modal from "@/shared/components/modal/Modal";
import { token } from "@styled-system/tokens";
import { successContent, successMessage, successTitle } from "./style";

export const ModalCreateProvider = ({
    isOpen,
    onClose,
    title,
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}) => {
    return (
        <Modal
            isOpen={Boolean(isOpen)}
            onClose={onClose}
            compact
        >
            <div className={successContent}>
                <h2 className={successTitle}>{title}</h2>
                <p className={successMessage}>{message}</p>
                <Button
                    color={token("colors.primaryColor")}
                    hoverColor={token("colors.primaryColorHover")}
                    onClick={onClose}
                >
                    Ententido
                </Button>
            </div>
        </Modal>
    );
};
