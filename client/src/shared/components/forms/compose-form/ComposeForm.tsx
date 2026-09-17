import { useRef } from "react";
import ButtonsContainer from "../components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../simple-form/types/button/credentials-button";
import type { SubFormData } from "../types/sub-form";
import type { InferData, Schema } from "../validation-form/shema";
import ValidationForm, {
    type ValidationFormHandleProps,
} from "../validation-form/ValidationForm";
import { container } from "./styles";

interface FormContainerProps<T> {
    subForms: SubFormData[];
    schema: T;
    buttonData: ButtonData;
    onSubmit: (data: InferData<T>) => void;
    onCancel: (isCancel: boolean) => void;
    bordered?: boolean;
}

function ComposeForm<T extends Schema>({
    subForms,
    schema,
    buttonData,
    onSubmit,
    onCancel,
    bordered = true,
}: FormContainerProps<T>) {
    const form = useRef<ValidationFormHandleProps>(null);
    const handleCancel = () => form.current?.confirmCancel();

    return (
        <section className={container({ bordered })}>
            <ValidationForm
                subForms={subForms}
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onCancel}
                ref={form}
            />
            <ButtonsContainer
                buttonData={buttonData}
                cancelOption={{ onSubmit: handleCancel }}
            />
        </section>
    );
}

export default ComposeForm;
