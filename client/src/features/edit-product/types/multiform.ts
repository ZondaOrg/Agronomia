import { composeSection, tableSection } from "@/shared/components/forms/multi-form/types/Factory";
import type { Product } from "../domain/product";
import type { Optional } from "../domain/optional";
import productSubForms from "./product/sub-forms";
import productSchema from "./product/schema";
import { optionalInputs } from "./optionals/inputs";
import optionalSchema from "./optionals/schema";

export const productForm = (
    product: Product,
) => [
    composeSection({
        title: "Datos del listado",
        subtitle: "Modificá la referencia de vigencia actual.",
        subForms: productSubForms,
        schema: productSchema,
        initialValues: {...product}
    }),
    tableSection<Optional, typeof optionalSchema>({
        title: "Opcionales",
        inputs: optionalInputs,
        schema: optionalSchema,
        nameElements: "opcionales",
        addLabel: "+ Añadir opcional",
        initialValues: product.optionals,
        //onPageChange: onPageChange,
    }),
];
