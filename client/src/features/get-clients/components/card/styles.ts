import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const card = css({
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    maxWidth: "496px",
    minHeight: "150px",
    padding: "18px",
    border: "1px solid #CECECE",
    borderRadius: "13px",
    backgroundColor: "surfaceCardColor",
    color: "#333333",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
});

export const clientName = css({
    margin: 0,
    overflow: "hidden",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1.2",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
});

export const header = css({
    display: "flex",
    alignItems: "center",
    gap: "13px",
});

export const cardBody = css({
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    paddingLeft: "50px",
});

export const editLink = css({
    display: "inline-flex",
    alignSelf: "flex-end",
    alignItems: "center",
    border: 0,
    gap: 1,
    background: "transparent",
    color: token("colors.primaryColor"),
    fontSize: "12px",
    cursor: "pointer",
    _hover: { color: "primaryColorHover", textDecoration: "underline" },
});

export const editIcon = css({ width: "12px", height: "12px" });

export const label = css({
    color: "textSubtle",
    fontSize: "12px",
    fontWeight: "medium",
    lineHeight: "1.2",
});

export const cuitRow = css({
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
    paddingLeft: "45px",
});

export const contactHeader = css({
    display: "grid",
    gridTemplateColumns: "40px minmax(0, 1fr) auto",
    gridTemplateRows: "auto auto",
    columnGap: "13px",
    rowGap: "2px",
    alignItems: "start",
    "& > span:first-child": {
        gridColumn: "1",
        gridRow: "1 / span 2",
    },
    "& > span:nth-child(2)": {
        gridColumn: "2",
        gridRow: "1",
    },
    "& > div": {
        gridColumn: "2",
        gridRow: "2",
    },
    "& > button": {
        gridColumn: "3",
        gridRow: "1 / span 2",
        alignSelf: "start",
    },
});

export const headerInfo = css({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
});

export const inlineField = css({
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
});

export const inlineLabel = css({
    color: "textSubtle",
    fontSize: "12px",
    fontWeight: "medium",
    lineHeight: "1.2",
    whiteSpace: "nowrap",
});

export const inlineValue = css({
    color: "#333333",
    fontSize: "13px",
    fontWeight: "medium",
    lineHeight: "1.2",
});
