import type { ReactNode } from "react";

export type CardCheckVariant =
    | "CardSimple"
    | "CardDetailed"
    | "CardArticleDetailed";

export interface CardCheckOption {
    value: string;
    label: string;
    description?: string;
    content?: ReactNode;
}

interface BaseCardCheckInputProps {
    options: CardCheckOption[];
    variant: CardCheckVariant;
    /** Título del estado vacío cuando `options` no tiene elementos. */
    emptyMessage?: string;
    /** Texto secundario del estado vacío. */
    emptyDescription?: ReactNode;
    /** Ícono del estado vacío. Por defecto se usa `SearchX`. */
    emptyIcon?: ReactNode;
    error?: string | boolean;
    result?: string;
}

export interface SingleCardCheckInputProps extends BaseCardCheckInputProps {
    multiple?: false;
    value?: string | null;
    onChange: (value: string) => void;
}

export interface MultipleCardCheckInputProps extends BaseCardCheckInputProps {
    multiple: true;
    value?: string[];
    onChange: (value: string[]) => void;
}

export type CardCheckInputProps =
    | SingleCardCheckInputProps
    | MultipleCardCheckInputProps;
