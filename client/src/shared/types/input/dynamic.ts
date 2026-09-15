import type { BaseInputData } from "./input";

export type DynamicInputData = 
    BaseInputData &
    {
        type: "dynamic";
        format: (data: string) => string;
    };