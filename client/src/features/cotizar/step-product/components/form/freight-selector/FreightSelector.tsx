import CardCheckInput from "@/shared/components/card-check-input/CardCheckInput";
import type { CardCheckOption } from "@/shared/components/card-check-input/types";
import type { Money } from "@/shared/domain/money/money";
import type { Freight } from "../../../domain/freight";
import { styles } from "./styles";

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
    const { section, sectionTitle, sectionDivider, label, price, optionsGroup } =
        styles({ disabled });

    const options: CardCheckOption[] = [
        { value: "NOT_INCLUDED", label: "No incluye flete" },
        {
            value: "INCLUDED",
            label: "Incluye flete",
            description:
                freightPrice && moneda ? (
                    <>
                        Tiene un valor de{" "}
                        <strong className={price}>
                            ${freightPrice.toLocaleString("es-AR")} {moneda}
                        </strong>
                    </>
                ) : null,
        },
    ];

    return (
        <section className={section}>
            <p className={sectionTitle}>Flete</p>
            <hr className={sectionDivider} />
            <span className={label}>Condición flete</span>
            <div
                className={optionsGroup}
                aria-disabled={disabled}
            >
                <CardCheckInput
                    variant="CardSimple"
                    options={options}
                    value={value}
                    onChange={(v) => onChange(v as Freight)}
                />
            </div>
        </section>
    );
};
