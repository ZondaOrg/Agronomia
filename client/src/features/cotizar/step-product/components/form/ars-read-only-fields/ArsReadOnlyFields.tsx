import type { Iva } from "@/shared/domain/iva/iva";
import { ReadOnlyField } from "../read-only-field/ReadOnlyField";
import { getReadOnlyFields } from "./types/read-only-fields";
import { styles } from "./styles";

interface ArsReadOnlyFieldsProps {
    listPriceUsd: number;
    listPriceArs: number | null;
    iva: Iva;
}

export const ArsReadOnlyFields = ({
    listPriceUsd,
    listPriceArs,
    iva,
}: ArsReadOnlyFieldsProps) => {
    const { priceRow } = styles();
    const fields = getReadOnlyFields({ listPriceUsd, listPriceArs, iva });

    return (
        <div className={priceRow}>
            {fields.map((field) => (
                <ReadOnlyField key={field.label} {...field} />
            ))}
        </div>
    );
};
