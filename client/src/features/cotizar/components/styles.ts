import { css } from "@styled-system/css";

export const container = css({
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    maxWidth: "900px",
    height: "100%",
    maxHeight: "850px",
    margin: "0 auto",
    padding: "24px",
    background: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
});

export const title = css({
    fontSize: "xl",
    fontWeight: "semibold",
    color: "#18181B",
});
