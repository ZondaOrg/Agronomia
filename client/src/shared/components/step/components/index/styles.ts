// styles.ts
import { css, cva } from "@styled-system/css";

export const listStyle = css({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    listStyle: "none",
    margin: 0,
    padding: 0,
});

export const itemStyle = css({
    display: "flex",
    alignItems: "center",
    gap: "16px",
});

export const chevronStyle = css({
    color: "#9CA3AF",
    flexShrink: 0,
});

export const stepRecipe = cva({
    base: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        padding: 0,
        fontFamily: "inherit",
        fontSize: "14px",
        lineHeight: "20px",
    },
    variants: {
        status: {
            previous: { cursor: "pointer", color: "#1F2937" },
            current: { cursor: "default", color: "#1F2937", fontWeight: 600 },
            next: { cursor: "not-allowed", color: "#6B7280" },
        },
    },
});

export const bulletRecipe = cva({
    base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        fontSize: "12px",
        fontWeight: 600,
        flexShrink: 0,
    },
    variants: {
        status: {
            current: { background: "#1D6FE8", color: "#FFFFFF" },
            previous: { background: "#CFE3FB", color: "#1D6FE8" },
            next: {
                background: "#FFFFFF",
                color: "#6B7280",
                border: "1px dashed #9CA3AF",
            },
        },
    },
});
