import { css } from "@styled-system/css";
import CheckInput from "../../validation-form/inputs/check/CheckInput";

interface OptionListProps {
    options: string[];
    onOption: (option: string) => void;
    selectedOption?: string;
    disabled?: boolean;
}

const styles = css({
    display: "flex",
    flexDirection: {
        base: "column",
        md: "row",
    },
    justifyContent: {
        base: "center",
        md: "start",
    },
    gap: "8",
    width: "94%",
});

const OptionList = ({
    options,
    onOption,
    selectedOption,
    disabled,
}: OptionListProps) => {
    return (
        <div className={styles}>
            {options.map((option) => (
                <CheckInput
                    onSubmit={onOption}
                    value={option}
                    checked={option === selectedOption}
                    disabled={disabled}
                    key={option}
                />
            ))}
        </div>
    );
};

export default OptionList;
