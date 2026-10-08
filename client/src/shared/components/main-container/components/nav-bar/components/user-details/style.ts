import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const container = css({
    cursor: "pointer",
})

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

export const userDetails = css({
    width: "100%",
    height: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,  
    "& p": {
        color: token("colors.textStrong")
    },
    "& a": {
        color: token("colors.textStrong")
    },
    md: {
        position: "fixed",
        alignItems: "center",
        top: 20,
        right: 4,
        width: "auto",
        zIndex: 110,
        bg: token("colors.primaryColorSubtle"),
        borderRadius: 8,
        padding: 14,
        "& p": {
            color: "#FFF"
        },
        "& a": {
            color: "#FFF"
        },
    },
})
