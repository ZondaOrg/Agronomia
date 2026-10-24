import { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
    /** Si es `true`, el input se resalta como campo faltante. */
    error?: boolean;
}

export interface HydrationFormProps<TItem> {
    items: TItem[];
    loading: boolean;
    title?: string;
    subtitle?: string;
    Input: React.ComponentType<HydrationInputProps<TItem>>;

    /** Resalta el input como faltante. */
    error?: boolean;
    /** Valor con el que arranca el form (por ejemplo, el ya guardado en el store). */
    initialValue?: string | null;
    /** Se llama cada vez que cambia el valor seleccionado. Debe ser estable. */
    onValueChange?: (value: string | null) => void;
    /** Se llama cuando el form se limpia porque cambian `items` o `loading`. Debe ser estable. */
    onReset?: () => void;
    /** Cada cambio de este valor dispara `onSave`. */
    saveNonce?: number;
    /** Recibe el valor actual cuando cambia `saveNonce`. Debe ser estable. */
    onSave?: (value: string | null) => void;
}

interface HydrationFormValues {
    selected: string | null;
}

export const HydrationForm = <TItem,>({
    title,
    subtitle,
    items,
    loading,
    Input,
    error,
    initialValue = null,
    onValueChange,
    onReset,
    saveNonce = 0,
    onSave,
}: HydrationFormProps<TItem>) => {
    const { control, reset, getValues } = useForm<HydrationFormValues>({
        defaultValues: { selected: initialValue },
    });
    const selected = useWatch({ control, name: "selected" });

    // 1) Limpieza: solo cuando items o loading CAMBIAN después del montaje
    const prev = useRef({ items, loading });
    useEffect(() => {
        if (prev.current.items === items && prev.current.loading === loading) {
            return;
        }
        prev.current = { items, loading };
        reset({ selected: null });
        onReset?.();
    }, [items, loading, reset, onReset]);

    // 2) Avisar cambios de valor
    useEffect(() => {
        onValueChange?.(selected);
    }, [selected, onValueChange]);

    // 3) Guardar solo cuando cambia saveNonce
    const lastSave = useRef(saveNonce);
    useEffect(() => {
        if (saveNonce === lastSave.current) return;
        lastSave.current = saveNonce;
        onSave?.(getValues("selected"));
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
                        name="selected"
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
        </form>
    );
};
