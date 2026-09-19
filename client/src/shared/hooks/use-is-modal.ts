import { useState } from "react";
import type { ModalAction } from "../types/modal/modal-action";

const useIsModal = () => {
    const [action, setAction] = useState<ModalAction>();

    const handleSuccess    = () => setAction("success");
    const handleError      = () => setAction("error");
    const handleAdvertence = () => setAction("advertence");
    const refreshAction    = () => setAction(undefined);

    return {action, handleSuccess, handleError, handleAdvertence, refreshAction}
}

export default useIsModal;