import { styles } from "../product-price-fields/styles";

export interface ReadOnlyFieldProps {
    label: string;
    value: string;
    currency?: string;
}

export const ReadOnlyField = ({
    label: text,
    value,
    currency,
}: ReadOnlyFieldProps) => {
    const { field, label, controlWithCurrency, control, currencySuffix } =
        styles();

    return (
        <label className={field}>
            <span className={label}>{text}</span>
            {currency ? (
                <div className={controlWithCurrency}>
                    <input className={control} readOnly value={value} />
                    <span className={currencySuffix}>{currency}</span>
                </div>
            ) : (
                <input className={control} readOnly value={value} />
            )}
        </label>
    );
};
