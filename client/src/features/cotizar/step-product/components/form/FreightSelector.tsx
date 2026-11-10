import CardCheckInput from "@/shared/components/card-check-input/CardCheckInput";
import type { CardCheckOption } from "@/shared/components/card-check-input/types";
import type { Freight } from "../../domain/freight";

const OPTIONS: CardCheckOption[] = [
    { value: "INCLUDED", label: "Incluir flete" },
    { value: "NOT_INCLUDED", label: "No incluir flete" },
];

interface FreightSelectorProps {
    value: Freight | null;
    disabled?: boolean;
    onChange: (value: Freight) => void;
}

export const FreightSelector = ({
    value,
    disabled = false,
    onChange,
}: FreightSelectorProps) => (
    <div
        style={
            disabled ? { pointerEvents: "none", opacity: 0.6 } : undefined
        }
        aria-disabled={disabled}
    >
        <CardCheckInput
            variant="CardSimple"
            options={OPTIONS}
            value={value}
            onChange={(v) => onChange(v as Freight)}
        />
    </div>
);
