import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const pageWrapper = css({
    display: "grid",
    placeItems: "center",
    width: "100vw",
    height: "100vh",
    bg: token("colors.surfacePageColor"),
});

export const card = css({
    display: "grid",
    placeItems: "center",
    width: "90%",
    maxWidth: "400px",
    minWidth: "36vw",
    height: {
        base: "90%",
        md: "75%",
    },
    bg: "#FFF",
    boxShadow:
        "0px 10px 15px -3px rgba(2, 6, 23, 0.1), 0px 4px 6px -4px rgba(2, 6, 23, 0.1)",
    borderRadius: "1vw",
});

export const buttonContainer = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderRadius: 8,
    bg: token("colors.primaryColor"),
    _hover: {
        bg: token("colors.primaryColorHover"),
    },
});

export const header = sva({
    slots: ["container", "title", "subtitle"],
    base: {
        container: {
            width: "90%",
        },
        title: {
            fontSize: "36",
            fontWeight: "500",
            color: token("colors.textSubtle"),
        },
        subtitle: {
            fontSize: "16px",
            fontWeight: "400",
            color: token("colors.textSubtle"),
        }
    }
});