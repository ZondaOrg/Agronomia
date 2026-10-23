// HydrationForm.tsx
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { form, title as titleStyle, subTitle as subTitleStyle } from "./styles";
import Spinner from "@/shared/components/spinner/Spinner";
/** Props que recibe el input que renderiza un {@link HydrationForm}. */
export interface HydrationInputProps<TItem> {
    /** Elementos con los que se hidrata el input. */
    items: TItem[];
    /** Valor seleccionado, o `null` si no hay selección. */
    value: string | null;
    /** Se llama con el nuevo valor seleccionado. */
    onChange: (value: string | null) => void;
}

/** Propiedades del componente {@link HydrationForm}. */
export interface HydrationFormProps<TItem> {
    /** Resultado de la búsqueda con el que se hidrata el formulario. */
    items: TItem[];
    /** `true` mientras se ejecuta la búsqueda. */
    loading: boolean;
    /** Título del formulario. */
    title?: string;
    /** Subtítulo del formulario. */
    subtitle?: string;

    /** Input que renderiza los elementos y maneja la selección. */
    Input: React.ComponentType<HydrationInputProps<TItem>>;
}

interface HydrationFormValues {
    selected: string | null;
}

/**
 * Formulario que se hidrata con una lista de elementos.
 *
 * Delega el render de los elementos en `Input`, limpia la selección cada vez
 * que llega un resultado nuevo y activa el scroll interno cuando el contenido
 * supera la altura máxima.
 */
export const HydrationForm = <TItem,>({
    title,
    subtitle,
    items,
    loading,
    Input,
}: HydrationFormProps<TItem>) => {
    const { control, reset } = useForm<HydrationFormValues>({
        defaultValues: { selected: null },
    });

    useEffect(() => {
        reset({ selected: null });
    }, [items, reset]);

    if (loading) return <Spinner centered />;

    return (
        <form className={form}>
            <h1 className={titleStyle}>{title}</h1>
            <p className={subTitleStyle}>{subtitle}</p>
            <Controller
                name="selected"
                control={control}
                render={({ field }) => (
                    <Input
                        items={items}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
        </form>
    );
};
