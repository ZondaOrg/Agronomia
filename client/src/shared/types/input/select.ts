import type { BaseInputData, SelectInputType } from "./input";

export type SelectInputData = 
    BaseInputData & 
    {
        type: SelectInputType;
        options: Option[];
    };

export type Option = {
    value: string;
    label: string;
    id: number | string;
};