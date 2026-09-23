import { composeSection, tableSection } from "@/shared/components/forms/multi-form/types/Factory";
import productSubForms from "./product/sub-forms";
import productSchema from "./product/schema";
import { optionalInputs } from "./optional/inputs";
import optionalSchema from "./optional/schema";
import type { OptionalRequest } from "../adapters/request/optional/optional";

export const productSections = (productTypes: string[]) => [
    composeSection({
        subForms: productSubForms(productTypes),
        schema: productSchema,
    }),
    tableSection<OptionalRequest, typeof optionalSchema>({
        title: "Opcionales",
        inputs: optionalInputs,
        schema: optionalSchema,
        nameElements: "opcionales",
        addLabel: "+ Añadir opcional",
    }),
];
