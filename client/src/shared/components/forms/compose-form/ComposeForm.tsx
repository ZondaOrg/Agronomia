import ButtonsContainer from "../components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../simple-form/types/button/credentials-button";
import type { SubFormData } from "../types/sub-form";
import type { InferData, Schema } from "../validation-form/shema";
import FormContainer from "../components/form-container/FormContainer";
import type { Size } from "../types/size";
import ValidationForm from "../validation-form/ValidationForm";

interface FormContainerProps<T> {
    subForms: SubFormData[];
    schema: T
    buttonData: ButtonData
    size?: Size
    onSubmit: (data: InferData<T>) => void;
    onDirty?: () => void
    onCancel: () => void;
}

function ComposeForm<T extends Schema>({subForms, schema, buttonData, size, onSubmit, onDirty, onCancel}: FormContainerProps<T>) {
    
    return (
        <FormContainer size={size}>
            <ValidationForm 
                subForms={subForms}
                schema={schema}
                onSubmit={onSubmit}
                onDirty={onDirty}
            />
            <ButtonsContainer buttonData={buttonData} cancelOption={{onSubmit: onCancel}} />
        </FormContainer>
    )
}

export default ComposeForm;