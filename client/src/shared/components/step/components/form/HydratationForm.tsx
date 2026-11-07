import { useEffect, useRef } from "react";
import {
    Controller,
    useForm,
    useWatch,
    type FieldValues,
    type Path,
    type DefaultValues,
    type Control,
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
    items: TItem[];
    loading: boolean;
    title?: string;
    subtitle?: string;
    Input: React.ComponentType<HydrationInputProps<TItem>>;
    fieldName: Path<TFormValues>;
    defaultValues?: DefaultValues<TFormValues>;
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
    items,
    loading,
    Input,
    error,
    fieldName,
    defaultValues,
    onValueChange,
    onValuesChange,
    renderAdditionalFields,
    saveNonce = 0,
    onSave,
}: HydrationFormProps<TItem, TFormValues>) => {
    const { control, getValues } = useForm<TFormValues>({
        defaultValues,
        values: defaultValues as TFormValues,
    });

    const fieldValue = useWatch({ control, name: fieldName }) as string | null;
    const formValues = useWatch({ control }) as TFormValues;

    useEffect(() => {
        onValueChange?.(fieldValue);
    }, [fieldValue, onValueChange]);

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
                ) : (
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
                )}
            </div>
            {renderAdditionalFields?.(control)}
        </form>
    );
};
