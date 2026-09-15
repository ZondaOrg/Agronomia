import type { DynamicInputData } from "../dynamic";
import type { FileInputData } from "../file";
import type { SelectInputData } from "../select";
import type { TextInputData } from "../text";

export type InputData =
    | TextInputData
    | SelectInputData
    | FileInputData
    | DynamicInputData;

export type InputRow = InputData[];