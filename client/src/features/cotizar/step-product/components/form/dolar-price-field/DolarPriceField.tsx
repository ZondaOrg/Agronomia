import { useState } from "react";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/button/Button";
import { isValidDolarPrice } from "../../../domain/dolar-price";
import { styles } from "./styles";

interface DolarPriceFieldProps {
    value: number | null;
    editable: boolean;
    onApply: (dolarPrice: number) => void;
}

const parseDolarPrice = (text: string): number =>
    Number(text.trim().replace(",", "."));

export const DolarPriceField = ({
    value,
    editable,
    onApply,
}: DolarPriceFieldProps) => {
    const { field, label, controlWrapper, control, controlEditable, apply } =
        styles();
    const [draft, setDraft] = useState("");

    const parsed = parseDolarPrice(draft);
    const canApply = editable && isValidDolarPrice(parsed);
    const apply_ = () => {
        if (canApply) onApply(parsed);
    };

    return (
        <label className={field}>
            <span className={label}>
                Cotización dolar oficial hoy
            </span>
            <div className={controlWrapper}>
                <input
                    className={editable ? controlEditable : control}
                    readOnly={!editable}
                    inputMode="decimal"
                    value={
                        editable
                            ? draft
                            : (value?.toLocaleString("es-AR") ?? "")
                    }
                    onChange={(e) => setDraft(e.target.value)}
                />
                {editable && (
                    <Button
                        type="button"
                        className={apply}
                        color={token("colors.primaryColor")}
                        hoverColor={token("colors.primaryColorHover")}
                        textColor="white"
                        onClick={apply_}
                    >
                        Aplicar
                    </Button>
                )}
            </div>
        </label>
    );
};
