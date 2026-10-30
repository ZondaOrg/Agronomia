import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Provider } from "../types/Provider";
import putProvider from "../service/put-provider.service";
import useNotify from "@/shared/hooks/use-notify/use-notify";
import type { ProviderEdit } from "../api/dto/ProviderEdit";
import type { HttpError } from "@/core/server/errors/http-error";

export const usePutProviderData = () => {
    const { execute, refresh } = useFetch<Provider>();
    const { action, notify, isCancel, handleNotify, onDirty, handleCancelNotify, init } = useNotify();

    async function edit(providerRequest: Omit<ProviderEdit, "id">, id: number) {
        handleNotify(
            providerRequest,
            {
                title: "Proveedor editado",
                message: (provider: Provider) =>
                    `Se edito al proveedor ${provider.legalName}`,
            },
            {
                title: "Error Proveedor",
                message: (error: HttpError) => error.getMessage,
            },
            execute(() => putProvider({id, ...providerRequest}),
        ));
    }

    const onRefresh = () => {
        refresh();
        init();
    };

    return {
        isCancel,
        notify,
        action,
        edit,
        onRefresh,
        onDirty,
        handleCancelNotify,
    };
};
