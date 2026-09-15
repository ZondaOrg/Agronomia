import { useRef, useState } from "react";
import ButtonsContainer from "../components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../simple-form/types/button/credentials-button";
import type { OptionForm } from "../types/step";
import type { InferData, Schema } from "../validation-form/shema";
import OptionList from "./components/options-list";
import ValidationForm, {
    type ValidationFormHandleProps,
} from "../validation-form/ValidationForm";
import { container } from "./styles";

interface PolimorficFormProps<T extends Schema> {
    options: OptionForm[];
    buttonData: ButtonData;
    onCancel: (isCancel: boolean) => void;
    initialSubType?: string;
    initialValues?: Partial<InferData<T>>;
    disableOptions?: boolean;
}

function PolimorficForm<T extends Schema>({
    options,
    buttonData,
    onCancel,
    initialSubType,
    initialValues,
    disableOptions = false,
}: PolimorficFormProps<T>) {
    const form = useRef<ValidationFormHandleProps>(null);
    const [subType, setIsSubtype] = useState<string | undefined>(
        initialSubType,
    );

    const handleCancel = () => form.current?.confirmCancel();
    const handleOption = (subType: string) => setIsSubtype(subType);
    const subTypes = options.map((option) => option.subType);

    return (
        <section className={container}>
            <OptionList
                onOption={handleOption}
                options={subTypes}
                selectedOption={subType}
                disabled={disableOptions}
            />
            {subType && (
                <SubFormFactory
                    key={subType}
                    subType={subType}
                    options={options}
                    onCancel={onCancel}
                    initialValues={initialValues}
                    ref={form}
                />
            )}
            <ButtonsContainer
                buttonData={buttonData}
                cancelOption={{ onSubmit: handleCancel }}
            />
        </section>
    );
}

interface SubFormFactoryProps<T extends Schema> {
    subType: string;
    options: OptionForm[];
    onCancel: (isCancel: boolean) => void;
    initialValues?: Partial<InferData<T>>;
    ref: React.Ref<ValidationFormHandleProps>;
}

function SubFormFactory<T extends Schema>({
    subType,
    options,
    ref,
    onCancel,
    initialValues,
}: SubFormFactoryProps<T>) {
    const option = options.find((option) => option.subType === subType)!;

    return (
        <ValidationForm
            schema={option.schema}
            subForms={option.subforms}
            onSubmit={option.onSubmit}
            onCancel={onCancel}
            initialValues={initialValues}
            ref={ref}
        />
    );
}

export default PolimorficForm;
