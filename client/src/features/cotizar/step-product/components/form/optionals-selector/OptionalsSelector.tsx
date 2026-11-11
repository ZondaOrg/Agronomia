import CardCheckInput from "@/shared/components/card-check-input/CardCheckInput";
import type { CardCheckOption } from "@/shared/components/card-check-input/types";
import type { Money } from "@/shared/domain/money/money";
import { token } from "@styled-system/tokens";
import type { QuoteOptional } from "../../../domain/quote-product";
import { styles } from "./styles";

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
    const {
        section,
        sectionTitle,
        sectionDivider,
        field,
        optionalsTitle,
        optionalsHint,
    } = styles();

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
        <section className={section}>
            <p className={sectionTitle}>Opcionales</p>
            <hr className={sectionDivider} />
            <div className={field}>
                <p className={optionalsTitle}>
                    Este producto cuenta con opcionales
                </p>
                <p className={optionalsHint}>
                    Los opcionales sumados se agregan al precio de lista
                </p>
            </div>
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
