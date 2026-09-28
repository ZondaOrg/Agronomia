// FieldsSection.tsx
import { useForm, useFormState } from "react-hook-form";
import type { InsertFormProps } from "../../validation-form/validation-form";
import type { InferData, Schema } from "../../validation-form/shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputWithMaxWidth, styles } from "../../validation-form/styles";
import { css } from "@styled-system/css";
import { useImperativeHandle } from "react";
import type { SubFormData } from "../../types/sub-form";
import SubForm from "../../validation-form/components/subforms/SubForm";
import type { FormSectionHandle } from "../types/FormSection";

type FieldsSectionProps<T extends Schema> = Pick<
    InsertFormProps<T>,
    "subForms" | "schema"
> & {
    initialValues?: Partial<InferData<T>>;
    hideSubFormTitles?: boolean;
    ref?: React.Ref<FormSectionHandle<InferData<T>>>;
};

function buildDefaultValues(subForms: SubFormData[]) {
    const defaults: Record<string, unknown> = {};
    subForms.forEach((subForm) => {
        subForm.inputs.flat().forEach((input) => {
            defaults[input.name] = input.defaultValue ?? "";
        });
    });
    return defaults;
}

function FieldsSection<T extends Schema>({
    subForms,
    schema,
    initialValues,
    hideSubFormTitles = false,
    ref,
}: FieldsSectionProps<T>) {
    const { register, trigger, getValues, reset, control } = useForm<
        InferData<T>
    >({
        resolver: zodResolver(schema),
        defaultValues: {
            ...buildDefaultValues(subForms),
            ...initialValues,
        } as InferData<T>,
    });

    const { isDirty, errors } = useFormState({ control });

    useImperativeHandle(
        ref,
        () => ({
            isDirty: () => isDirty,
            isValid: () => trigger(),
            getData: () => getValues(),
            reset: () => reset(),
        }),
        [isDirty, trigger, getValues, reset],
    );

    const { form, input, row } = styles;

    return (
        <div className={css(form)}>
            {subForms.map((subForm) => (
                <SubForm
                    key={subForm.id}
                    title={hideSubFormTitles ? undefined : subForm.title}
                    inputs={subForm.inputs}
                    register={register}
                    rowStyles={row}
                    inputStyles={
                        subForm.inputs.some((r) => r.length === 1)
                            ? inputWithMaxWidth("100px")
                            : input
                    }
                    errors={errors}
                />
            ))}
        </div>
    );
}

export default FieldsSection;
