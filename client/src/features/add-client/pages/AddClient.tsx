import naturalPersonSchema from "../types/natural-person/natural-person-schema";
import PolimorficForm from "@/shared/components/forms/polimorfic-form/PolimorficForm";
import socialMotiveSchema from "../types/social-motive/social-motive-schema";
import useAddClient from "../hooks/use-add-client";
import { naturalPersonsubForms } from "../types/natural-person/subforms";
import { socialMotiveSubform } from "../types/social-motive/subforms";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

const AddClient = () => {
    const { action, notify, add, stop, onRefresh } = useAddClient();

    return (
        <NotifyHandler 
            action={action} 
            notify={notify ?? {}} 
            onClose={onRefresh} 
            refreshNotify={onRefresh}>
            <PolimorficForm
                options={[
                    {
                        subType: "razon social",
                        subforms: socialMotiveSubform,
                        schema: socialMotiveSchema,
                        onSubmit: add,
                    },
                    {
                        subType: "persona natural",
                        subforms: naturalPersonsubForms,
                        schema: naturalPersonSchema,
                        onSubmit: add,
                    },
                ]}
                buttonData={{ text: "Agregar cliente" }}
                onCancel={stop}
            />
        </NotifyHandler>
    )
};

export default AddClient;
