import { createInputsRow, type CreateField } from "@/shared/types/input/factory";
import type { SubFormData } from "./sub-form"

interface CreateSubForm {
    name?: string 
    fields: CreateField[][]
}

export function createSubForms(factoryData: CreateSubForm[]): SubFormData[] {

    const subForm: SubFormData[] = [];
    const idCounter = { current: 0 };

    factoryData.forEach((createForm, index) => {
        subForm.push({
            title: createForm.name,
            id: index,
            inputs: createInputsRow(createForm.fields, idCounter)
        })
    });

    return subForm;
}

