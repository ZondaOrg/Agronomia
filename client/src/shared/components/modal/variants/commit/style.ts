import { css } from "@styled-system/css";

export const confirmContent = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
});

export const confirmTitle = css({
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: 1.4,
    color: "#1A1A1A",
    textAlign: "center",
});

export const confirmMessage = css({
    margin: "8px 0 20px",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#52525B",
    textAlign: "center",
});

export const confirmActions = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    width: "100%",
});
