import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import providerSchema from "./types/provider-schema";
import { providerSubForms } from "./types/subforms";
import { useAddProviders } from "../hook/use-add-provider";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

const AddProvider = () => {
    const { notify, action, isCancel, onRefresh, handleCancelNotify, add } = useAddProviders();

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={true}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <ComposeForm
                subForms={providerSubForms}
                schema={providerSchema}
                buttonData={{ text: "Agregar proveedor" }}
                onSubmit={add}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};

export default AddProvider;
