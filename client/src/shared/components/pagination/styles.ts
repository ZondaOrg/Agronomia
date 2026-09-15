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
    _hover: { color: token("colors.primaryColorHover") },
    _disabled: { color: "#CCCCCC", cursor: "not-allowed" },
});

const pageButton = css.raw({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    bg: token("colors.primaryColor"),
    height: "32px",
    border: "1px solid transparent",
    borderRadius: "6px",
    background: "transparent",
    color: "#666666",
    fontSize: "14px",
    cursor: "pointer",
    _hover: { backgroundColor: "#F5F5F5" },
});

const activePageButton = css.raw({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    bg: token("colors.primaryColor"),
    border: "1px solid primaryColor",
    borderRadius: "6px",
    background: "white",
    color: "primaryColor",
    fontSize: "14px",
    fontWeight: "medium",
    cursor: "pointer",
});

const ellipsis = css.raw({
    color: "#999999",
    fontSize: "14px",
    padding: "0 4px",
});

export const styles = sva({
    slots: ["nav", "navButton", "pageButton", "activePageButton", "ellipsis"],
    base: { nav, navButton, pageButton, activePageButton, ellipsis },
});
