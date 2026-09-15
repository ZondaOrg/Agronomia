import type { BaseInputData, InputData, InputRow, Option, TextInputType } from "./input";

type BaseCreateField = {
    motive: string
    isRequired: boolean 
    placeholder?: string
    disable?: boolean
    defaultValue?: string
}

type CreateTextField    = BaseCreateField & {type: TextInputType}
type CreateSelectField  = BaseCreateField & {type: 'select', options: Option[]}
type CreateDynamicField = BaseCreateField & {type: 'dynamic', format: (data: string) => string}

export type CreateField = 
    CreateTextField   | 
    CreateSelectField | 
    CreateDynamicField

export type CreateRowField = CreateField[]

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
                type: field.type,
                ...base
            }
    }
}

function createRowInput(field: CreateField, id: number): BaseInputData {
    return {
        id: id,
        name: createName(field.motive),
        title: field.motive,
        placeholder: field.placeholder ?? "",
        defaultValue: field.defaultValue,
        required: field.isRequired,
        disabled: field.disable
    }
}

function createName(text: string): string {
    const normalized = text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ");

    const words = normalized.trim().split(/\s+/).filter(Boolean);

    return words
        .map((word, i) => {
            const lower = word.toLowerCase();
            return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
}

