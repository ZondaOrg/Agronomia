import PolimorficForm from "@/shared/components/forms/polimorfic-form/PolimorficForm";
import { useGetClientById } from "../hook/use-get-client-by-id";
import { usePutClient } from "../hook/use-put-client";
import naturalPersonSchema from "../types/natural-person/natural-person-schema";
import { generateForm } from "../types/generate-form";
import socialMotiveSchema from "../types/social-motive/social-motive-schema";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

export const EditClient = () => {
    const { client, isLoading, id } = useGetClientById();
    const { isCancel, notify, action, edit, onRefresh, handleCancelNotify, onDirty } = usePutClient();

    return (
        !isLoading && 
        client && 
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={true}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <PolimorficForm
                    options={[
                        {
                            subType: "razon social",
                            subforms: generateForm(client),
                            schema: socialMotiveSchema,
                            onSubmit: (data) => edit(data, id),
                        },
                        {
                            subType: "persona natural",
                            subforms: generateForm(client),
                            schema: naturalPersonSchema,
                            onSubmit: (data) => edit(data, id),
                        },
                    ]}
                    initialSubType={
                        "razonSocial" in client ? "razon social" : "persona natural"
                    }
                    disableOptions
                    isLine
                    initialValues={client}
                    onDirty={onDirty}
                    buttonData={{ text: "Guardar cambios" }}
                    onCancel={handleCancelNotify}
                />
        </NotifyHandler>
    );
};
