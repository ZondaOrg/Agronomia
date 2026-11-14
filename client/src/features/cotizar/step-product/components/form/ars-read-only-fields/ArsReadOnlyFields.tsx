import type { Iva } from "@/shared/domain/iva/iva";
import type { DolarStatus as DolarStatusType } from "../../../domain/dolar-status";
import { DolarPriceField } from "../dolar-price-field/DolarPriceField";
import { DolarStatus } from "../dolar-status/DolarStatus";
import { ReadOnlyField } from "../read-only-field/ReadOnlyField";
import { getReadOnlyFields } from "./types/read-only-fields";
import { styles } from "./styles";

interface ArsReadOnlyFieldsProps {
    listPriceUsd: number;
    listPriceArs: number | null;
    iva: Iva;
    dolarPrice: number | null;
    status: DolarStatusType;
    onApply: (dolarPrice: number) => void;
}

export const ArsReadOnlyFields = ({
    listPriceUsd,
    listPriceArs,
    iva,
    dolarPrice,
    status,
    onApply,
}: ArsReadOnlyFieldsProps) => {
    const { wrapper, dolarRow, priceRow } = styles();
    const fields = getReadOnlyFields({ listPriceUsd, listPriceArs, iva });

    return (
        <div className={wrapper}>
            <div className={dolarRow}>
                <DolarPriceField
                    value={dolarPrice}
                    editable={status === "MANUAL"}
                    onApply={onApply}
                />
                <DolarStatus status={status} />
            </div>
            <div className={priceRow}>
                {fields.map((field) => (
                    <ReadOnlyField key={field.label} {...field} />
                ))}
            </div>
        </div>
    );
};
