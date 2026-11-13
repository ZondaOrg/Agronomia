import { moneys, type Money } from "@/shared/domain/money/money";
import { styles } from "./styles";

interface CurrencySelectProps {
    value: keyof Money | null;
    onChange: (value: keyof Money | null) => void;
}

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
    const { wrapper, field, label, control } = styles();

    return (
        <div className={wrapper}>
            <label className={field}>
                <span className={label}>Moneda</span>
                <select
                    className={control}
                    value={value ?? ""}
                    onChange={(e) =>
                        onChange(e.target.value ? (e.target.value as keyof Money) : null)
                    }
                >
                    <option value="">Seleccionar...</option>
                    {moneys.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};
