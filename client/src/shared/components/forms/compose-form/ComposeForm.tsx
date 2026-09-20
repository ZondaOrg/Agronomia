import { useRef } from "react";
import ButtonsContainer from "../components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../simple-form/types/button/credentials-button";
import type { SubFormData } from "../types/sub-form";
import type { InferData, Schema } from "../validation-form/shema";
import ValidationForm, { type ValidationFormHandleProps } from "../validation-form/ValidationForm";
import FormContainer from "../components/form-container/FormContainer";
import type { Size } from "../types/size";

interface FormContainerProps<T> {
    subForms: SubFormData[];
    schema: T
    buttonData: ButtonData
    size?: Size
    onSubmit: (data: InferData<T>) => void;
    onCancel: (isCancel: boolean) => void;
}

function ComposeForm<T extends Schema>({subForms, schema, buttonData, size, onSubmit, onCancel}: FormContainerProps<T>) {
    const form = useRef<ValidationFormHandleProps>(null);
    const handleCancel = () => form.current?.confirmCancel();
    
    return (
        <FormContainer size={size}>
            <ValidationForm 
                subForms={subForms}
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onCancel}
                ref={form}
            />
            <ButtonsContainer buttonData={buttonData} cancelOption={{onSubmit: handleCancel}} />
        </FormContainer>
    )
}

export default ComposeForm;