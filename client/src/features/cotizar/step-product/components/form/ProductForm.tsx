import { Controller, useWatch, type Control } from "react-hook-form";
import type { QuoteProduct } from "../../domain/quote-product";
import { CurrencySelect } from "./CurrencySelect";
import { FreightSelector } from "./FreightSelector";
import { OptionalsSelector } from "./OptionalsSelector";
import { ProductPriceFields } from "./ProductPriceFields";
import { TotalPrice } from "./TotalPrice";
import { formStyles } from "./styles";
import type { StepProductFormValues } from "./product-schema";

interface ProductFormProps {
    control: Control<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: number | null;
}

export const ProductForm = ({ control, detail, total }: ProductFormProps) => {
    const moneda = useWatch({ control, name: "moneda" });

    return (
        <div className={formStyles.form}>
            {detail && (
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
            )}
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
