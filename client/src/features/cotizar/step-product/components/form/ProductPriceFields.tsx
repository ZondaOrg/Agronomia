import { ivaPorcents, Iva } from "@/shared/domain/iva/iva";
import { formStyles } from "./styles";

const IVA_LABEL: Record<Iva, (typeof ivaPorcents)[number]> = {
    GENERAL: "21%",
    REDUCIDA: "10,5%",
};

interface ProductPriceFieldsProps {
    listPrice: number;
    iva: Iva;
}

export const ProductPriceFields = ({
    listPrice,
    iva,
}: ProductPriceFieldsProps) => (
    <div className={formStyles.row}>
        <label className={formStyles.field}>
            <span className={formStyles.label}>Precio neto</span>
            <input
                className={formStyles.controlReadOnly}
                readOnly
                value={listPrice.toLocaleString("es-AR")}
            />
        </label>
        <label className={formStyles.field}>
            <span className={formStyles.label}>IVA</span>
            <input
                className={formStyles.controlReadOnly}
                readOnly
                value={IVA_LABEL[iva]}
            />
        </label>
    </div>
);
