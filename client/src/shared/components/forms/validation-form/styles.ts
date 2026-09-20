import { css, sva } from "@styled-system/css";

const form = css.raw({
    display: "grid",
    gridTemplateRows: "repeat(auto-fit, 1fr)",
    placeItems: "center",
    width: "100%",
    gap: "1rem",
});

const elementContainer = css.raw({
    width: "90%",
    height: "20%",
    minHeight: "38px",
});

const row = css.raw({
    display: "flex",
    flexDirection: "row",
    width: "90%",
    gap: "1rem",
    "& > *": {
        flex: 1,
        minWidth: 0,
        width: "100%",
    },
});

const input = (maxWidth: string = "100%") => ({
    ...elementContainer,
    width: "100%",
    maxWidth,
    padding: "8px",
    border: "1px solid #A1A1AA",
    boxShadow: "0px 1px 2px rgba(2, 6, 23, 0.05)",
    borderRadius: "10px",
    outline: "none",
    "&:disabled": {
        color: "#71717A",
        backgroundColor: "#F4F4F5",
        cursor: "not-allowed",
    },
});

const actions = css.raw({
    ...elementContainer,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.75rem",
});

export const styles = sva({
    slots: ["form", "input", "elementContainer", "row", "actions"],
    base: {
        form: form,
        input: css.raw(input()),
        elementContainer: elementContainer,
        row: row,
        actions: actions,
    },
}).raw();

export const inputWithMaxWidth = (maxWidth: string) => css.raw(input(maxWidth));
