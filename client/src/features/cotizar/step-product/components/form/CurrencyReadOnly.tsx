import { css } from "@styled-system/css";
import { formStyles } from "./styles";

export const CurrencyReadOnly = () => (
    <div className={css({ width: "25%" })}>
        <label className={formStyles.field}>
            <span className={formStyles.label}>Moneda</span>
            <input className={formStyles.controlReadOnly} readOnly value="ARS" />
        </label>
    </div>
);
