import type { BaseInputData, InputData, InputRow } from "../input";
import type { CreateField, CreateRowField } from "./create-field";
import { createPlaceholder } from "./create-placeholder";

export function createInputsRow(fields: CreateRowField[], idCounter?: {current: number}): InputRow[] {
    return fields.map((row) => row.map((field, i) => createInputRow(field, i, idCounter)));
}

export function createInputRow(field: CreateField, index: number, idCounter?: {current: number}): InputData {
    const id = idCounter ? idCounter.current++ : index;
    const base = createRowInput(field, id);

    switch(field.type) {
        case 'select':
            return { 
                type: "select",
                options: field.options, 
                ...base
            };
        case 'dynamic':
            return {
                type: "dynamic",
                format: field.format,
                ...base
            }
        default: 
            return {
                type: field.type ?? "text",
                ...base
            }
    }
}

function createRowInput(field: CreateField, id: number): BaseInputData {
    return {
        id: id,
        name: field.name,
        title: field.motive,
        placeholder: field.placeholder ?? createPlaceholder(field.motive),
        defaultValue: field.defaultValue,
        required: field.isRequired ?? true,
        disabled: field.disable
    }
}
