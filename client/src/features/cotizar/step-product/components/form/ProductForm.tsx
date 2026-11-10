import type { Money } from "@/shared/domain/money/money";
import type { QuoteProduct } from "../../domain/quote-product";
import type { Freight } from "../../domain/freight";
import { CurrencySelect } from "./CurrencySelect";
import { FreightSelector } from "./FreightSelector";
import { ProductPriceFields } from "./ProductPriceFields";
import { TotalPrice } from "./TotalPrice";
import { formStyles } from "./styles";

interface ProductFormProps {
    detail: QuoteProduct | undefined;
    moneda: keyof Money | null;
    freight: Freight | null;
    total: number | null;
    onMonedaChange: (value: keyof Money | null) => void;
    onFreightChange: (value: Freight) => void;
}

export const ProductForm = ({
    detail,
    moneda,
    freight,
    total,
    onMonedaChange,
    onFreightChange,
}: ProductFormProps) => (
    <div className={formStyles.form}>
        {detail && <CurrencySelect value={moneda} onChange={onMonedaChange} />}
        {detail && moneda && (
            <ProductPriceFields listPrice={detail.listPrice} iva={detail.iva} />
        )}
        <FreightSelector
            value={freight}
            disabled={!detail}
            onChange={onFreightChange}
        />
        {detail && <TotalPrice total={total} />}
    </div>
);
