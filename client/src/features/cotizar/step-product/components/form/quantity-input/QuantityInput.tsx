import { styles } from "./styles";

interface QuantityInputProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
    const { field, label, control } = styles();

    return (
        <label className={field}>
            <span className={label}>Unidades</span>
            <input
                className={control}
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
};
