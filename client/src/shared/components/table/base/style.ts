import { css } from "@styled-system/css";

const borderCell = css.raw({
    borderBottom: "1px solid #CECECE",
});

const colorCell = css.raw({
    backgroundColor: "#F9F9F9",
});

export const tableWrapper = css({
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    boxShadow: "sm",
    borderRadius: "md",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    border: "1px solid #CECECE",
});

export const tableCard = css({
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    backgroundColor: "white",
});

export const table = css(
    {
        width: "100%",
        minWidth: "760px",
    },
    colorCell,
);

export const thead = css(borderCell, colorCell);

export const th = css(
    {
        textAlign: "left",
        padding: "0.85rem 1rem",
        fontSize: "sm",
        color: "#6B7280",
        fontWeight: "600",
    },
    borderCell,
);

export const tbody = css({});

export const tr = (index: number) =>
    index % 2 === 0 ? css({ bg: "#FFF" }) : css({ bg: "#FBFCFE" });

export const td = css(
    {
        padding: "1rem",
        fontSize: "sm",
        color: "#374151",
        verticalAlign: "middle",
    },
    borderCell,
);

export const tdActions = css(
    {
        padding: "1rem",
        borderColor: "#E5E7EB",
    },
    borderCell,
);

export const pagination = css({
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
});

export const size = css({
    textAlign: "start",
    fontSize: "xs",
    color: "#6B7280",
});

export const paginationButton = css({
    display: "flex",
    justifyContent: "end",
    flex: 1,
});
