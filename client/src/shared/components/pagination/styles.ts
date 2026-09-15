import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const nav = css.raw({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginTop: "24px",
});

const navButton = css.raw({
    border: 0,
    background: "transparent",
    color: token("colors.primaryColor"),
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 8px",
    textDecoration: "underline",
    _hover: { color: token("colors.primaryColorHover") },
    _disabled: { color: "#CCCCCC", cursor: "not-allowed" },
});

const pageButton = css.raw({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    border: "1px solid transparent",
    borderRadius: "6px",
    background: "transparent",
    color: "#666666",
    fontSize: "14px",
    cursor: "pointer",
    _hover: { bg: "#F5F5F5" },

    "&[data-active='true']": {
        bg: token("colors.primaryColor"),
        color: "white",
        fontWeight: "medium",
        _hover: { bg: token("colors.primaryColorHover") },
    },
});

const ellipsis = css.raw({
    color: "#999999",
    fontSize: "14px",
    padding: "0 4px",
});

export const styles = sva({
    slots: ["nav", "navButton", "pageButton", "ellipsis"],
    base: { nav, navButton, pageButton, ellipsis },
});
