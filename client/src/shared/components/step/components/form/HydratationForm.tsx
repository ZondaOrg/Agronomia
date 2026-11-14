import { useEffect, useRef } from "react";
import {
    Controller,
    useForm,
    useWatch,
    type FieldValues,
    type Path,
    type DefaultValues,
    type Control,
    type UseFormReturn,
} from "react-hook-form";
import {
    form,
    title as titleStyle,
    subTitle as subTitleStyle,
    content,
    loadingBox,
} from "./styles";
import Spinner from "@/shared/components/spinner/Spinner";

export interface HydrationInputProps<TItem> {
    items: TItem[];
    value: string | null;
    onChange: (value: string | null) => void;
    error?: boolean;
}
export interface HydrationFormProps<TItem, TFormValues extends FieldValues> {
    items?: TItem[];
    loading: boolean;
    title?: string;
    subtitle?: string;
    /** Input de un solo campo (`fieldName`). Se ignora si se pasan `children`. */
    Input?: React.ComponentType<HydrationInputProps<TItem>>;
    fieldName?: Path<TFormValues>;
    /** Contenido propio para formularios de varios campos (usar con `form`). */
    children?: React.ReactNode;
    defaultValues?: DefaultValues<TFormValues>;
    form?: UseFormReturn<TFormValues>;
    error?: boolean;
    onValueChange?: (value: string | null) => void;
    onValuesChange?: (values: TFormValues) => void;
    renderAdditionalFields?: (control: Control<TFormValues>) => React.ReactNode;
    onReset?: () => void;
    saveNonce?: number;
    onSave?: (values: TFormValues) => void;
}

export const HydrationForm = <TItem, TFormValues extends FieldValues>({
    title,
    subtitle,
    items = [],
    loading,
    Input,
    children,
    error,
    fieldName,
    defaultValues,
    form: externalForm,
    onValueChange,
    onValuesChange,
    renderAdditionalFields,
    saveNonce = 0,
    onSave,
}: HydrationFormProps<TItem, TFormValues>) => {
    const ownForm = useForm<TFormValues>({
        defaultValues,
        values: defaultValues as TFormValues,
    });
    const { control, getValues } = externalForm ?? ownForm;

    const formValues = useWatch({ control }) as TFormValues;
    const watched = useWatch({ control }) as TFormValues;
    const fieldValue = fieldName
        ? (watched[fieldName] as string | null | undefined) ?? null
        : null;

    useEffect(() => {
        if (fieldName) onValueChange?.(fieldValue);
    }, [fieldName, fieldValue, onValueChange]);

    useEffect(() => {
        onValuesChange?.(formValues);
    }, [formValues, onValuesChange]);

    const lastSave = useRef(saveNonce);
    useEffect(() => {
        if (saveNonce === lastSave.current) return;
        lastSave.current = saveNonce;
        onSave?.(getValues());
    }, [saveNonce, getValues, onSave]);

    return (
        <form className={form}>
            <h1 className={titleStyle}>{title}</h1>
            <p className={subTitleStyle}>{subtitle}</p>
            <div className={content}>
                {loading ? (
                    <div className={loadingBox}>
                        <Spinner centered />
                    </div>
                ) : children ? (
                    children
                ) : (
                    fieldName &&
                    Input && (
                        <Controller
                            name={fieldName}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    items={items}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={error}
                                />
                            )}
                        />
                    )
                )}
            </div>
            {renderAdditionalFields?.(control)}
        </form>
    );
};
