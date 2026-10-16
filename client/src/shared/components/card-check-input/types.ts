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
    emptyMessage?: string;
    error?: string;
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
