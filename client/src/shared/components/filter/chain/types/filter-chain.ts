interface BaseFilterFieldConfig {
    id: string;
    label: string;
    required: boolean;
}

export interface SelectFilterFieldConfig extends BaseFilterFieldConfig {
    variant: "select";
    options: { value: string; label: string }[];
}

export interface TextFilterFieldConfig extends BaseFilterFieldConfig {
    variant: "text";
}

export type FilterFieldConfig =
    | SelectFilterFieldConfig
    | TextFilterFieldConfig;
