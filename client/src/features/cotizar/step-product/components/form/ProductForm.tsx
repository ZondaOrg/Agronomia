import type { Money } from "@/shared/domain/money/money";
import type { QuoteProduct } from "../../domain/quote-product";
import type { Freight } from "../../domain/freight";
import { CurrencySelect } from "./CurrencySelect";
import { FreightSelector } from "./FreightSelector";
import { ProductPriceFields } from "./ProductPriceFields";
import { QuantityInput } from "./QuantityInput";
import { TotalPrice } from "./TotalPrice";
import { formStyles } from "./styles";

interface ProductFormProps {
    detail: QuoteProduct | undefined;
    moneda: keyof Money | null;
    freight: Freight | null;
    quantity: number | null;
    total: number | null;
    onMonedaChange: (value: keyof Money | null) => void;
    onFreightChange: (value: Freight) => void;
    onQuantityChange: (value: number | null) => void;
}

export const ProductForm = ({
    detail,
    moneda,
    freight,
    quantity,
    total,
    onMonedaChange,
    onFreightChange,
    onQuantityChange,
}: ProductFormProps) => (
    <div className={formStyles.form}>
        {detail && <CurrencySelect value={moneda} onChange={onMonedaChange} />}
        {detail && moneda && (
            <ProductPriceFields listPrice={detail.listPrice} iva={detail.iva} />
        )}
        <QuantityInput value={quantity} onChange={onQuantityChange} />
        <FreightSelector
            value={freight}
            disabled={!detail}
            onChange={onFreightChange}
        />
        {detail && <TotalPrice total={total} />}
    </div>
);
