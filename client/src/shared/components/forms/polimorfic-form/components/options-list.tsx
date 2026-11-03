import CheckInput from "../../validation-form/inputs/check/CheckInput";
import { border, container, formContainer, subtitle, title } from "./styles";

interface OptionListProps {
    options: string[];
    onOption: (option: string) => void;
    selectedOption?: string;
    disabled?: boolean;
}

const OptionList = ({
    options,
    onOption,
    selectedOption,
    disabled,
}: OptionListProps) => {
    return (
        <section className={container}>
            <h3 className={title}>Tipo de cliente</h3>
            <hr className={border} />
            <p className={subtitle}>Selecciona el giro del cliente</p>
            <div className={formContainer}>
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
        </section>
    );
};

export default OptionList;
