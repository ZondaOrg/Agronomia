import type { CardCheckOption } from "../types";
import { styles } from "../styles";

interface Props {
    option: CardCheckOption;
    selected: boolean;
    multiple: boolean;
    onSelect: () => void;
}

export default function CardDetailed({
    option,
    selected,
    multiple,
    onSelect,
}: Props) {
    return (
        <button
            className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
            type="button"
            aria-pressed={selected}
            onClick={onSelect}
        >
            <span
                className={`${styles.checkIndicator} ${
                    multiple ? styles.checkIndicatorMultiple : ""
                } ${selected ? styles.checkIndicatorSelected : ""}`}
                aria-hidden="true"
            >
                {selected ? "✓" : ""}
            </span>
            <span className={styles.content}>
                <span className={styles.label}>{option.label}</span>
                {option.description && (
                    <span className={styles.description}>
                        {option.description}
                    </span>
                )}
                {option.content}
            </span>
        </button>
    );
}
