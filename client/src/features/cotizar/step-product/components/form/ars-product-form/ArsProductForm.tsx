import { Controller, type Control } from "react-hook-form";
import type { ProductTotal } from "../../../domain/product-total";
import type { QuoteProduct } from "../../../domain/quote-product";
import { CurrencyReadOnly } from "../currency-read-only/CurrencyReadOnly";
import { FreightSelector } from "../freight-selector/FreightSelector";
import { OptionalsSelector } from "../optionals-selector/OptionalsSelector";
import { ProductPriceFields } from "../product-price-fields/ProductPriceFields";
import { TotalPrice } from "../total-price/TotalPrice";
import { form } from "./styles";
import type { StepProductFormValues } from "../product-schema";

interface ArsProductFormProps {
    control: Control<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: ProductTotal | null;
}

export const ArsProductForm = ({
    control,
    detail,
    total,
}: ArsProductFormProps) => {
    const moneda = detail ? "ARS" : null;

    return (
        <div className={form}>
            {detail && <CurrencyReadOnly />}
            {detail && moneda && (
                <ProductPriceFields
                    listPrice={detail.listPrice}
                    iva={detail.iva}
                    moneda={moneda}
                />
            )}
            <Controller
                name="flete"
                control={control}
                render={({ field }) => (
                    <FreightSelector
                        value={field.value}
                        disabled={!detail}
                        freightPrice={detail?.freight}
                        moneda={moneda}
                        onChange={field.onChange}
                    />
                )}
            />
            {detail && (
                <Controller
                    name="opcionales"
                    control={control}
                    render={({ field }) => (
                        <OptionalsSelector
                            optionals={detail.optionals}
                            moneda={detail.money}
                            selected={field.value}
                            onToggle={field.onChange}
                        />
                    )}
                />
            )}
            {detail && <TotalPrice total={total} moneda={moneda} />}
        </div>
    );
};
