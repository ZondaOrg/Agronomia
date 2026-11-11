import { Controller, useWatch, type Control } from "react-hook-form";
import type { QuoteProduct } from "../../../domain/quote-product";
import { CurrencyReadOnly } from "../currency-read-only/CurrencyReadOnly";
import { CurrencySelect } from "../currency-select/CurrencySelect";
import { FreightSelector } from "../freight-selector/FreightSelector";
import { OptionalsSelector } from "../optionals-selector/OptionalsSelector";
import { ProductPriceFields } from "../product-price-fields/ProductPriceFields";
import { TotalPrice } from "../total-price/TotalPrice";
import { form } from "./styles";
import type { StepProductFormValues } from "../product-schema";

interface ProductFormProps {
    control: Control<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: number | null;
}

export const ProductForm = ({ control, detail, total }: ProductFormProps) => {
    const selectedMoneda = useWatch({ control, name: "moneda" });
    const isArs = detail?.money === "ARS";
    const moneda = isArs ? "ARS" : selectedMoneda;

    return (
        <div className={form}>
            {detail &&
                (isArs ? (
                    <CurrencyReadOnly />
                ) : (
                    <Controller
                        name="moneda"
                        control={control}
                        render={({ field }) => (
                            <CurrencySelect
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                ))}
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
