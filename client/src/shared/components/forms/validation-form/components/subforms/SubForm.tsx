import { css } from "@styled-system/css";
import type { SubFormProps } from "./sub-form";
import Input from "../../inputs/factory";
import type { Schema } from "../../shema";
import styles from "./styles";
import { inputWithMaxWidth } from "../../styles";

function SubForm<T extends Schema>({
    inputs,
    title,
    register,
    rowStyles,
    inputStyles,
    errors,
    isLine = false
}: SubFormProps<T>) {
    const { container, title: t, border } = styles();

    return (
        <div className={container}>
            {title && <p className={t}>{title}</p>}
            {isLine && <hr className={border} />}
            {inputs.map((row, rowIndex) => {
                const styleForRow =
                    row.length === 1 ? inputWithMaxWidth("420px") : inputStyles;

                return (
                    <div
                        key={rowIndex}
                        className={css(rowStyles)}
                    >
                        {row.map((i) =>
                            Input({
                                input: i,
                                styles: styleForRow,
                                register,
                                error: errors[i.name],
                            }),
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default SubForm;
