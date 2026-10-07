import { css } from "@styled-system/css";

export const avatarStyle = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
    color: "#111",
    textDecoration: "none",
});

export const avatarText = css({
    display: { base: "flex", md: "none" },
    flexDirection: "column",
    minWidth: 0,
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "short",
    whiteSpace: "nowrap",
});

export const avatarRole = css({
    display: { base: "inline", md: "none" },
    color: "#6B7280",
    fontSize: "xs",
    fontWeight: "normal",
});
