import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const item = css({
    color: token("colors.textSubtle"),
    textDecoration: "none",
    _hover: {
        color: token("colors.primaryColor"),
    },
});

export const selectedItem = css({
    color: token("colors.primaryColor"),
    fontWeight: "semibold",
    textDecoration: "underline",
    textDecorationThickness: "3px",
    textUnderlineOffset: "10px",
    _hover: {
        color: token("colors.primaryColorHover"),
    },
});

export const navBarList = css({
    listStyleType: "none",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem",
    display: { base: "none", md: "flex" },
});

export const drawerList = css({
    listStyleType: "none",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    margin: 0,
    "& a": {
        display: "block",
        padding: "10px 6px",
    },
});