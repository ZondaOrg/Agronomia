import { useGetProviderById } from "../hook/use-get-provider-by-id";
import { usePutProviderData } from "../hook/use-put-provider";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import providerSchema from "./types/provider-edit-schema";
import { generateSubForm } from "./types/input";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

export const EditProvider = () => {
    const { notify, action, isCancel, onRefresh, onDirty, handleCancelNotify, edit } = usePutProviderData();
    const { data, providerId } = useGetProviderById();

    return (
        data && <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={true}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <ComposeForm
                subForms={generateSubForm(data)}
                schema={providerSchema}
                buttonData={{ text: "Editar proveedor" }}
                onSubmit={(provider) => edit(provider, providerId)}
                onDirty={onDirty}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};
