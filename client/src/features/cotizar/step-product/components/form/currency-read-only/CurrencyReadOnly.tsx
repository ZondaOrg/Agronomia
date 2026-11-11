import { styles } from "./styles";

export const CurrencyReadOnly = () => {
    const { wrapper, field, label, control } = styles();

    return (
        <div className={wrapper}>
            <label className={field}>
                <span className={label}>Moneda</span>
                <input className={control} readOnly value="ARS" />
            </label>
        </div>
    );
};
