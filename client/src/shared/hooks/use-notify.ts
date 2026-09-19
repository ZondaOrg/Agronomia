import { useNavigate } from "react-router";
import useIsModal from "./use-is-modal";
import { useState } from "react";
import type { Notify } from "../components/notify/types/notify";

const useNotify = () => {
    const {action, handleSuccess, handleError, handleAdvertence, refreshAction} = useIsModal();
    const navigate = useNavigate();
    const [notify, setNotify] = useState<Notify>();

    async function handleNotify<T>(data: T | undefined, success: (data: T) => Notify, error: () => Notify) {
        if(data) {
            handleSuccess()
            setNotify(success(data))
        }
        else {
            handleError()
            setNotify(error())
        }   
    };

    const stop = (isData: boolean) => {
        if(isData) handleAdvertence()
        else navigate(-1);
    } 

    const init = (refresh?: () => void) => {
        if(refresh) refresh()
        refreshAction()
    }

    return { notify, action, handleNotify, stop, init }
}

export default useNotify;