import { css } from "@styled-system/css";

export const form = css({
    display: "flex",
    flexDirection: "column",
    gap: "4",
    width: "100%",
});

export const currencyRow = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    alignItems: "end",
    gap: "4",
});
