import { useState } from "react";
import ButtonsContainer from "../components/buttons-container/ButtonsContainer";
import type { ButtonData } from "../simple-form/types/button/credentials-button";
import type { OptionForm } from "../types/step";
import type { InferData, Schema } from "../validation-form/shema";
import OptionList from "./components/options-list";
import FormContainer from "../components/form-container/FormContainer";
import ValidationForm from "../validation-form/ValidationForm";

interface PolimorficFormProps<T extends Schema> {
    options: OptionForm[];
    buttonData: ButtonData;
    onCancel: () => void;
    onDirty: () => void
    initialSubType?: string;
    initialValues?: Partial<InferData<T>>;
    disableOptions?: boolean;
}

function PolimorficForm<T extends Schema>({
    options,
    buttonData,
    onCancel,
    onDirty,
    initialSubType,
    initialValues,
    disableOptions = false,
}: PolimorficFormProps<T>) {
    const [subType, setIsSubtype] = useState<string | undefined>(
        initialSubType,
    );

    const handleOption = (subType: string) => setIsSubtype(subType);
    const subTypes = options.map((option) => option.subType);

    return (
        <FormContainer>
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
                    onDirty={onDirty}
                    initialValues={initialValues}
                />
            )}
            <ButtonsContainer
                buttonData={buttonData}
                cancelOption={{ onSubmit: onCancel }}
            />
        </FormContainer>
    );
}

interface SubFormFactoryProps<T extends Schema> {
    subType: string;
    options: OptionForm[];
    onDirty: () => void;
    initialValues?: Partial<InferData<T>>;
}

function SubFormFactory<T extends Schema>({
    subType,
    options,
    onDirty,
}: SubFormFactoryProps<T>) {
    const option = options.find((option) => option.subType === subType)!;

    return (
        <ValidationForm
            schema={option.schema}
            subForms={option.subforms}
            onSubmit={option.onSubmit}
            onDirty={onDirty}
        />
    );
}

export default PolimorficForm;
