import { css } from "@styled-system/css";

export const successContent = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    textAlign: "center",
});

export const successTitle = css({
    fontSize: "lg",
    fontWeight: "semibold",
    color: "#18181B",
});

export const successMessage = css({
    color: "#52525B",
    fontSize: "sm",
    lineHeight: "relaxed",
});
