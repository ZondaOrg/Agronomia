import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const containerWithe = css.raw({
    padding: "24px",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: "lg",
    bg: "white",
    display: "flex",
    flexDirection: "column",
    gap: 10
});

export const container = css.raw({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
    minHeight: "100px",
});

export const sectionHeader = css.raw({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
});

export const title = css.raw({
    fontWeight: "400",
    fontSize: "24px",
    color: token("colors.textSubtle"),
});

export const subtitle = css.raw({
    fontSize: "0.875rem",
    color: token("colors.textSubtle"),
});

export const actions = css.raw({
    width: "90%",
    height: "20%",
    minHeight: "38px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.75rem",
});
