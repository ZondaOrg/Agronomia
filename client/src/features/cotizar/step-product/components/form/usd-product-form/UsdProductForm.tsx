import { Controller, useWatch, type Control } from "react-hook-form";
import type { Money } from "@/shared/domain/money/money";
import type { ArsQuoteResult } from "../../../domain/ars-quote";
import { getDolarStatus } from "../../../domain/dolar-status";
import type { ProductTotal } from "../../../domain/product-total";
import type { QuoteProduct } from "../../../domain/quote-product";
import { ArsReadOnlyFields } from "../ars-read-only-fields/ArsReadOnlyFields";
import { CurrencySelect } from "../currency-select/CurrencySelect";
import { FreightSelector } from "../freight-selector/FreightSelector";
import { OptionalsSelector } from "../optionals-selector/OptionalsSelector";
import { ProductPriceFields } from "../product-price-fields/ProductPriceFields";
import type { StepProductFormValues } from "../product-schema";
import { TotalPrice } from "../total-price/TotalPrice";
import { form } from "./styles";

interface UsdProductFormProps {
    control: Control<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: ProductTotal | null;
    ars: ArsQuoteResult | undefined;
    arsLoading: boolean;
    onSelectMoneda: (moneda: keyof Money | null) => void;
    onApplyDolar: (dolarPrice: number) => void;
}

export const UsdProductForm = ({
    control,
    detail,
    total,
    ars,
    arsLoading,
    onSelectMoneda,
    onApplyDolar,
}: UsdProductFormProps) => {
    const moneda = useWatch({ control, name: "moneda" });
    const official = ars?.source === "OFFICIAL" ? ars : undefined;

    return (
        <div className={form}>
            {detail && (
                <Controller
                    name="moneda"
                    control={control}
                    render={({ field }) => (
                        <CurrencySelect
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                onSelectMoneda(value);
                            }}
                        />
                    )}
                />
            )}
            {detail && moneda === "USD" && (
                <ProductPriceFields
                    listPrice={detail.listPrice}
                    iva={detail.iva}
                    moneda={moneda}
                />
            )}
            {detail && moneda === "ARS" && (
                <ArsReadOnlyFields
                    listPriceUsd={detail.listPrice}
                    listPriceArs={official?.listPriceArs ?? null}
                    iva={detail.iva}
                    dolarPrice={official?.dolarPrice ?? null}
                    status={getDolarStatus(arsLoading, ars)}
                    onApply={onApplyDolar}
                />
            )}
            <Controller
                name="flete"
                control={control}
                render={({ field }) => (
                    <FreightSelector
                        value={field.value}
                        disabled={!detail || !moneda}
                        freightPrice={detail?.freight}
                        moneda={moneda}
                        onChange={field.onChange}
                    />
                )}
            />
            {detail && moneda && (
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
