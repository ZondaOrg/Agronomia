import { css } from "@styled-system/css";

export const buttonShape = css.raw({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0 1rem",
    height: "38px",
    minHeight: "38px",
    borderRadius: "10px",
    fontWeight: "medium",
    fontSize: "sm",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition:
        "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
    border: "1px solid var(--button-border, var(--button-bg))",
    color: "var(--button-color, #FFF)",
    bg: "var(--button-bg)",
    _hover: {
        bg: "var(--button-bg-hover)",
        color: "var(--button-color-hover, var(--button-color, #FFF))",
    },
    _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        bg: "var(--button-bg)",
        color: "var(--button-color, #FFF)",
    },
});

export const fullWidth = css.raw({
    width: "100%",
});
