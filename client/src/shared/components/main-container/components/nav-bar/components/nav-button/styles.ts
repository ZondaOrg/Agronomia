import { css } from "@styled-system/css";

export const styles = css({
    display: { base: "inline-flex", md: "none" },
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "md",
    color: "textColor",
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    cursor: "pointer",
    _focusVisible: {
        outlineWidth: "2px",
        outlineColor: "textColor",
        outlineOffset: "2px",
    },
    "& svg": {
        width: "20px",
        height: "20px",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
    },
})