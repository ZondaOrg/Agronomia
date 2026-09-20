import { useState } from "react";
import type { NotifyMessage } from "../../components/notify/types/notify-message";
import { HttpError } from "@/core/server/errors/http-error";
import type { Notify } from "../../components/notify/types/notify";
import type { NotifyAction } from "@/shared/hooks/use-notify/modal-action";
import { useNavigate } from "react-router";

const useNotify = () => {
    const [action, setAction] = useState<NotifyAction>();
    const [notify, setNotify] = useState<NotifyMessage>({});
    const [isCancel, setIsCancel] = useState(false);
    const navegate = useNavigate();

    async function handleNotify<T, D>(
        data: T, 
        success: Notify<D>,
        error: Notify<HttpError>,
        intent: (data: T) => Promise<D | undefined>) {
            try {
                const client = await intent(data);
                if(client) handleSuccessNotify(success.title, success.message(client))
            }
            catch(e) {
                if(e instanceof HttpError) handleErrorNotify(error.title, error.message(e))
            }
    }
    
    const handleSuccessNotify = (title: string, message: string) => {
        setAction("success");
        setNotify(createNotify(title, message));
    }

    const handleErrorNotify = (title: string, message: string) => {
        setAction("error");
        setNotify(createNotify(title, message));
    }

    const handleCancelNotify = (isData: boolean) => {
        if(isData) {
            setAction("advertence")
            setIsCancel(true)
        }
        else {
            navegate(-1)
        }
    }

    const init = () => {
        setAction(undefined);
        setNotify({})
        setIsCancel(false);
    }

    function createNotify(title: string, message: string) {
        return {
            toast: {
                title,
                message
            },
            modal: {
                title,
                message
            }
        } 
    }

    return { notify, action, isCancel, handleNotify, handleCancelNotify, init }
}

export default useNotify;