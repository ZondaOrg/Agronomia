import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

interface CheckInputProps {
    value: string;
    onSubmit: (value: string) => void;
    checked: boolean;
    disabled?: boolean;
}

const fieldStyles = sva({
    slots: ["container", "label"],
    base: {
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            minHeight: "38px",
            height: "50%",
            padding: "8px",
            border: "1px solid #A1A1AA",
            boxShadow: "0px 1px 2px rgba(2, 6, 23, 0.05)",
            borderRadius: "10px",
            outline: "none",
        },
        label: {
            width: "100%",
            textAlign: "left",
            color: token("colors.textSubtle"),
        },
    },
}).raw();

const CheckInput = ({
    value,
    onSubmit,
    checked,
    disabled,
}: CheckInputProps) => {
    const selectedStyles = checked
        ? {
              borderColor: token("colors.primaryColor"),
              backgroundColor: `${token("colors.primaryColor")}15`,
          }
        : {};

    return (
        <div
            className={css({
                ...fieldStyles.container,
                ...selectedStyles,
            })}
        >
            <label
                htmlFor={value}
                className={css({
                    ...fieldStyles.label,
                    ...(checked ? { color: token("colors.primaryColor") } : {}),
                })}
            >
                {value}
            </label>
            <input
                type="radio"
                name="client-type"
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={() => onSubmit(value)}
                key={value}
            />
        </div>
    );
};

export default CheckInput;
