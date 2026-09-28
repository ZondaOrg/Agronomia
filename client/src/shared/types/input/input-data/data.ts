import type { DynamicInputData } from "../dynamic";
import type { FileInputData } from "../file";
import type { SelectInputData } from "../select";
import type { TextInputData } from "../text";
import type { NumberInputData } from "../number";
import type { CounterCharsData } from "../counter-chars";

export type InputData =
    | TextInputData
    | SelectInputData
    | FileInputData
    | DynamicInputData
    | NumberInputData
    | CounterCharsData;

export type InputRow = InputData[];
