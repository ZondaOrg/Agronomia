export type InputType =
    | "text"
    | "select"
    | "email"
    | "password"
    | "file"
    | "dynamic";

export type TextInputType = Exclude<InputType, "select" | "dynamic">;
export type SelectInputType = Extract<InputType, "select">;

export type BaseInputData = {
    name: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    id: number;
    required?: boolean;
    disabled?: boolean;
};


export type TextInputData = {
    type: TextInputType;
    name: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    id: number;
    required?: boolean;
    disabled?: boolean;
};

export type SelectInputData = {
    type: SelectInputType;
    name: string;
    title: string;
    placeholder?: string;
    defaultValue?: string;
    id: number;
    options: Option[];
    required?: boolean;
    disabled?: boolean;
};

export type FileInputData = {
    type: "file";
    name: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    id: number;
    required?: boolean;
    disabled?: boolean;
};

export type DynamicInputData = {
    type: "dynamic";
    name: string;
    title: string;
    placeholder: string;
    defaultValue?: string;
    id: number;
    format: (data: string) => string;
    required?: boolean;
    disabled?: boolean;
};

export type InputData =
    | TextInputData
    | SelectInputData
    | FileInputData
    | DynamicInputData;

export type Option = {
    value: string;
    label: string;
    id: number | string;
};

export type InputRow = InputData[];
