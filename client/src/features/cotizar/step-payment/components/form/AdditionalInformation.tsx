import { css } from "@styled-system/css";

const section = css({
    borderTop: "1px solid #E5E7EB",
    marginTop: "16px",
    paddingTop: "12px",
});

const title = css({
    color: "#6B7280",
    fontSize: "sm",
    fontWeight: "normal",
});

const label = css({
    color: "#6B7280",
    display: "block",
    fontSize: "xs",
    marginBottom: "4px",
});

const textarea = css({
    border: "1px solid #D1D5DB",
    borderRadius: "6px",
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
