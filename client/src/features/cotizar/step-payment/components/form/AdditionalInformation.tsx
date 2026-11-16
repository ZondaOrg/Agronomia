import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const section = css({
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingTop: "12px",
});

const title = css({
    fontSize: "24px",
    color: token("colors.textSubtle"),
    fontWeight: "normal",
});

const label = css({
    color: "#6B7280",
    display: "block",
    marginBottom: "4px",
});

const textarea = css({
    border: "1px solid #545454",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "xs",
    minHeight: "92px",
    padding: "8px",
    resize: "vertical",
    width: "100%",
});

const counter = css({
    color: "#6B7280",
    display: "block",
    fontSize: "xs",
    textAlign: "right",
});

interface AdditionalInformationProps {
    value: string;
    onChange: (value: string) => void;
}

export const AdditionalInformation = ({
    value,
    onChange,
}: AdditionalInformationProps) => (
    <section className={section} aria-labelledby="additional-information-title">
        <h2 id="additional-information-title" className={title}>
            Información adicional
        </h2>
        <hr className={css({ borderColor: token("colors.textMuted")})}/>
        <label className={label} htmlFor="observations">
            Observaciones
        </label>
        <textarea
            id="observations"
            className={textarea}
            placeholder="Ej: Entrega en agosto, por acceso norte."
            maxLength={500}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
        <span className={counter}>{value.length} / 500</span>
    </section>
);
