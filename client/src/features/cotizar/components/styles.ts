import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const container = css({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "900px",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "24px",
    background: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
});

export const title = css({
    fontSize: "26px",
    fontWeight: "semibold",
    color: token("colors.textSubtle"),
});
