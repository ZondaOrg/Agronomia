import { ivaPorcents, Iva } from "@/shared/domain/iva/iva";
import type { Money } from "@/shared/domain/money/money";
import { styles } from "./styles";

// eslint-disable-next-line react-refresh/only-export-components
export const IVA_LABEL: Record<Iva, (typeof ivaPorcents)[number]> = {
    GENERAL: "21%",
    REDUCIDA: "10,5%",
};

interface ProductPriceFieldsProps {
    listPrice: number;
    iva: Iva;
    moneda: keyof Money;
}

export const ProductPriceFields = ({
    listPrice,
    iva,
    moneda,
}: ProductPriceFieldsProps) => {
    const { row, field, label, controlWithCurrency, control, currencySuffix } =
        styles();

    return (
        <div className={row}>
            <label className={field}>
                <span className={label}>Precio neto</span>
                <div className={controlWithCurrency}>
                    <input
                        className={control}
                        readOnly
                        value={listPrice.toLocaleString("es-AR")}
                    />
                    <span className={currencySuffix}>{moneda}</span>
                </div>
            </label>
            <label className={field}>
                <span className={label}>IVA</span>
                <input className={control} readOnly value={IVA_LABEL[iva]} />
            </label>
        </div>
    );
};
