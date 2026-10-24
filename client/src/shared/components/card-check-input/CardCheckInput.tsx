import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import CardArticleDetailed from "./components/CardArticleDetailed";
import CardDetailed from "./components/CardDetailed";
import CardSimple from "./components/CardSimple";
import { styles } from "./styles";
import type { CardCheckInputProps, CardCheckOption } from "./types";
import { SearchIcon } from "../icon/components/icons/Search";

function CardOption({
    option,
    variant,
    multiple = false,
    selected,
    onSelect,
}: {
    option: CardCheckOption;
    variant: CardCheckInputProps["variant"];
    multiple: boolean;
    selected: boolean;
    onSelect: () => void;
}) {
    if (variant === "CardSimple") {
        return (
            <CardSimple
                option={option}
                selected={selected}
                multiple={multiple}
                onSelect={onSelect}
            />
        );
    }

    if (variant === "CardArticleDetailed") {
        return (
            <CardArticleDetailed
                option={option}
                selected={selected}
                multiple={multiple}
                onSelect={onSelect}
            />
        );
    }

    return (
        <CardDetailed
            option={option}
            selected={selected}
            multiple={multiple}
            onSelect={onSelect}
        />
    );
}

export default function CardCheckInput(props: CardCheckInputProps) {
    const {
        options,
        variant,
        emptyMessage = "No hay opciones disponibles",
        emptyDescription,
        emptyIcon = <SearchIcon />,
        error,
        result,
    } = props;
    const optionsClassName =
        variant === "CardSimple" ? styles.simpleOptions : styles.options;

    return (
        <div className={styles.container}>
            {options.length === 0 ? (
                <EmptyState
                    icon={emptyIcon}
                    title={emptyMessage}
                    description={emptyDescription}
                />
            ) : (
                <div className={optionsClassName}>
                    {options.map((option) => (
                        <CardOption
                            key={option.value}
                            option={option}
                            variant={variant}
                            multiple={props.multiple === true}
                            // ACÁ ESTÁ EL FIX: Forzamos a String para evitar falsos negativos
                            selected={
                                props.multiple === true
                                    ? props.value?.includes(option.value) ??
                                      false
                                    : String(props.value) ===
                                      String(option.value)
                            }
                            onSelect={() => {
                                if (props.multiple === true) {
                                    const selectedValues = props.value ?? [];
                                    const nextValue = selectedValues.includes(
                                        option.value,
                                    )
                                        ? selectedValues.filter(
                                              (selectedValue) =>
                                                  selectedValue !==
                                                  option.value,
                                          )
                                        : [...selectedValues, option.value];
                                    props.onChange(nextValue);
                                    return;
                                }

                                props.onChange(option.value);
                            }}
                        />
                    ))}
                </div>
            )}
            {error && <span className={styles.error}>{error}</span>}
            {result && <span className={styles.result}>{result}</span>}
        </div>
    );
}
