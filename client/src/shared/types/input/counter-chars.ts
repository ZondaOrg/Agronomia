import type { BaseInputData } from "./base-input";

export type CounterCharsData =
    BaseInputData & 
    {
        type: "counter-chars",
        limit: number
    }