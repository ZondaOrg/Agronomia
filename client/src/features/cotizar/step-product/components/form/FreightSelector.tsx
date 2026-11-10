import CardCheckInput from "@/shared/components/card-check-input/CardCheckInput";
import type { CardCheckOption } from "@/shared/components/card-check-input/types";
import type { Money } from "@/shared/domain/money/money";
import type { Freight } from "../../domain/freight";

interface FreightSelectorProps {
    value: Freight | null;
    disabled?: boolean;
    freightPrice?: number;
    moneda?: keyof Money | null;
    onChange: (value: Freight) => void;
}

export const FreightSelector = ({
    value,
    disabled = false,
    freightPrice,
    moneda,
    onChange,
}: FreightSelectorProps) => {
    const options: CardCheckOption[] = [
        { value: "NOT_INCLUDED", label: "No incluye flete" },
        {
            value: "INCLUDED",
            label: "Incluye flete",
            description:
                freightPrice && moneda ? (
                    <>
                        Tiene un valor de{" "}
                        <strong style={{ color: "#0D9488" }}>
                            ${freightPrice.toLocaleString("es-AR")} {moneda}
                        </strong>
                    </>
                ) : null,
        },
    ];

    return (
        <div
            style={
                disabled ? { pointerEvents: "none", opacity: 0.6 } : undefined
            }
            aria-disabled={disabled}
        >
            <CardCheckInput
                variant="CardSimple"
                options={options}
                value={value}
                onChange={(v) => onChange(v as Freight)}
            />
        </div>
    );
};
