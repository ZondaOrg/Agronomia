import { css } from "@styled-system/css/css";

export const form = css.raw({
    display: "grid",
    gridTemplateRows: "repeat(auto-fit, 1fr)",
    width: "100%",
    maxWidth: "500px",
    gap: "2rem",
});
