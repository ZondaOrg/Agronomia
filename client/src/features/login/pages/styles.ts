import { css } from "@styled-system/css";
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