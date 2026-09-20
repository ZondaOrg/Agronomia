import { useState } from "react";
import type { NotifyAction } from "./use-notify/modal-action";
import { useNavigate } from "react-router";

const useIsModal = () => {
    const navigate = useNavigate();
    const [is, setIsOpen] = useState(false);
    const [action, setAction] = useState<NotifyAction>();

    const backToPrev = () => {
        navigate(-1);
    };

    const onOpenIs = (isData: boolean, action: NotifyAction) => {
        if(!isData) {
            navigate(-1);
        }
        else {
            setIsOpen(true);
            setAction(action);
        }
    }

    const isOpen = (a: NotifyAction) => is && action === a

    const refresh = () => {
        setIsOpen(false);
        setAction(undefined);
    }

    return {isOpen, onOpenIs, backToPrev, refresh}
}

export default useIsModal;