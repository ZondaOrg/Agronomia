import { moneys, type Money } from "@/shared/domain/money/money";
import { formStyles } from "./styles";

interface CurrencySelectProps {
    value: keyof Money | null;
    onChange: (value: keyof Money | null) => void;
}

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => (
    <label className={formStyles.field}>
        <span className={formStyles.label}>Moneda</span>
        <select
            className={formStyles.control}
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
);
