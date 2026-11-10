import CardCheckInput from "@/shared/components/card-check-input/CardCheckInput";
import type { CardCheckOption } from "@/shared/components/card-check-input/types";
import type { Money } from "@/shared/domain/money/money";
import { token } from "@styled-system/tokens";
import type { QuoteOptional } from "../../domain/quote-product";
import { formStyles } from "./styles";

interface OptionalsSelectorProps {
    optionals: QuoteOptional[];
    moneda: keyof Money;
    selected: number[];
    onToggle: (selected: number[]) => void;
}

export const OptionalsSelector = ({
    optionals,
    moneda,
    selected,
    onToggle,
}: OptionalsSelectorProps) => {
    if (optionals.length === 0) return null;

    const options: CardCheckOption[] = optionals.map((optional) => ({
        value: String(optional.id),
        label: optional.name,
        description: (
            <strong style={{ color: token("colors.success") }}>
                ${optional.price.toLocaleString("es-AR")} {moneda}
            </strong>
        ),
    }));

    return (
        <section className={formStyles.section}>
            <p className={formStyles.sectionTitle}>Opcionales</p>
            <hr className={formStyles.sectionDivider} />
            <CardCheckInput
                variant="CardSimple"
                multiple
                options={options}
                value={selected.map(String)}
                onChange={(values) => onToggle(values.map(Number))}
            />
        </section>
    );
};
