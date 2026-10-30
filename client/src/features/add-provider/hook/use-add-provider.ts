import type { Provider } from "@/features/get-providers/types/Provider";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import addProvider from "../service/add-provider.service";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { ProviderRequest } from "../adapter/ProviderRequest";
import type { HttpError } from "@/core/server/errors/http-error";

export const useAddProviders = () => {
    const { data, error, execute, refresh } = useFetch<Provider>();
    const { action, notify, isCancel, handleNotify, handleCancelNotify, init } = useNotify()

    async function add(provider: ProviderRequest) {
        handleNotify(
            provider, 
            {
                title: "Proveedor agregado",
                message: (product: Provider) => `Se registro el proveedor ${product.legalName}`
            },
            {
                title: "Error Proveedor",
                message: (error: HttpError) => error.getMessage
            },
            execute(addProvider)
        )
    }

    const onRefresh = () => {
        refresh()
        init()
    }

    return {
        data,
        error,
        action, 
        notify, 
        isCancel,
        add,
        handleCancelNotify,
        onRefresh,
    };
};
