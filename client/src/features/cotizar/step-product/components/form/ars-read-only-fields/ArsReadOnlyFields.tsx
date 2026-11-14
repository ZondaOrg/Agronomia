import type { Iva } from "@/shared/domain/iva/iva";
import type { DolarStatus as DolarStatusType } from "../../../domain/dolar-status";
import { DolarPriceField } from "../dolar-price-field/DolarPriceField";
import { DolarStatus } from "../dolar-status/DolarStatus";
import {
    IVA_LABEL,
} from "../product-price-fields/ProductPriceFields";
import { styles as priceStyles } from "../product-price-fields/styles";
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
    const { field, label, controlWithCurrency, control, currencySuffix } =
        priceStyles();

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
                <label className={field}>
                    <span className={label}>Precio de lista</span>
                    <div className={controlWithCurrency}>
                        <input
                            className={control}
                            readOnly
                            value={listPriceUsd.toLocaleString("es-AR")}
                        />
                        <span className={currencySuffix}>USD</span>
                    </div>
                </label>
                <label className={field}>
                    <span className={label}>Precio de lista en pesos</span>
                    <div className={controlWithCurrency}>
                        <input
                            className={control}
                            readOnly
                            value={listPriceArs?.toLocaleString("es-AR") ?? ""}
                        />
                        <span className={currencySuffix}>ARS</span>
                    </div>
                </label>
                <label className={field}>
                    <span className={label}>IVA</span>
                    <input
                        className={control}
                        readOnly
                        value={IVA_LABEL[iva]}
                    />
                </label>
            </div>
        </div>
    );
};
