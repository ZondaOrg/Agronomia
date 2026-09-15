import { createInputsRow } from "@/shared/types/input/input-data/factory";
import type { SubFormData } from "./sub-form"
import type { CreateRowField } from "@/shared/types/input/input-data/create-field";

interface CreateSubForm {
    name?: string 
    fields: CreateRowField[]
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

