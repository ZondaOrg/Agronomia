import type { Provider } from "@/features/get-providers/types/Provider";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import addProvider from "../service/add-provider.service";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { ProviderRequest } from "../adapter/ProviderRequest";
import type { HttpError } from "@/core/server/errors/http-error";

export const useAddProviders = () => {
    const { execute, refresh } = useFetch<Provider>();
    const { action, notify, isCancel, handleNotify, onDirty, handleCancelNotify, init } = useNotify();

    async function add(providerRequest: ProviderRequest) {
        handleNotify(
            providerRequest,
            {
                title: "Proveedor agregado",
                message: (provider: Provider) =>
                    `Se registro al proveedor ${provider.legalName}`,
            },
            {
                title: "Error Proveedor",
                message: (error: HttpError) => error.getMessage,
            },
            execute(addProvider),
        );
    }

    const onRefresh = () => {
        refresh();
        init();
    };

    return {
        isCancel,
        notify,
        action,
        add,
        onRefresh,
        onDirty,
        handleCancelNotify,
    };
};
