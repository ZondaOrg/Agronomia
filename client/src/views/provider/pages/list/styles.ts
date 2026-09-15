import { css, sva } from "@styled-system/css";

const optionsRow = css.raw({
    display: "flex",
    flexDirection: { base: "column", sm: "row" },
    alignItems: { base: "stretch", sm: "center" },
    justifyContent: { base: "flex-start", sm: "space-between" },
    gap: "12px",
    marginTop: "16px",
});

export const styles = sva({
    slots: ["optionsRow"],
    base: {
        optionsRow,
    },
});
