import type { Iva } from "@/shared/domain/iva/iva";
import type { ReadOnlyFieldProps } from "../../read-only-field/ReadOnlyField";
import { IVA_LABEL } from "../../product-price-fields/ProductPriceFields";

interface ReadOnlyFieldsData {
    listPriceUsd: number;
    listPriceArs: number | null;
    iva: Iva;
}

export const getReadOnlyFields = ({
    listPriceUsd,
    listPriceArs,
    iva,
}: ReadOnlyFieldsData): ReadOnlyFieldProps[] => [
    {
        label: "Precio de lista",
        value: listPriceUsd.toLocaleString("es-AR"),
        currency: "USD",
    },
    {
        label: "Precio de lista en pesos",
        value: listPriceArs?.toLocaleString("es-AR") ?? "",
        currency: "ARS",
    },
    {
        label: "IVA",
        value: IVA_LABEL[iva],
    },
];