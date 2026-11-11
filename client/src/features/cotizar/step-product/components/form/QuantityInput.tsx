import { formStyles } from "./styles";

interface QuantityInputProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export const QuantityInput = ({ value, onChange }: QuantityInputProps) => (
    <label className={formStyles.field}>
        <span className={formStyles.label}>Unidades</span>
        <input
            className={formStyles.control}
            type="number"
            min={1}
            step={1}
            value={value ?? ""}
            onChange={(e) =>
                onChange(e.target.value === "" ? null : Number(e.target.value))
            }
        />
    </label>
);
