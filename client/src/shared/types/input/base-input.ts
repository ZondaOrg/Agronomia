export type BaseInputData = {
    name: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    id: number;
    required?: boolean;
    disabled?: boolean;
    disabledWhen?: {
        field: string;
        value: unknown;
    };
};
