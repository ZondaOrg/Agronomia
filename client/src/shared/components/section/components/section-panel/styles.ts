// styles.ts
import { css, cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const panel = cva({
    base: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minWidth: 0,
        width: "100%",
        marginX: "auto",
    },
    variants: {
        maxWidth: {
            sm: { maxWidth: "40rem" },
            md: { maxWidth: "56rem" },
            lg: { maxWidth: "64rem" },
            xl: { maxWidth: "80rem" },
            full: { maxWidth: "none" },
        },
    },
    defaultVariants: {
        maxWidth: "lg",
    },
});

export const header = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4",
    flexShrink: 0,
});

export const titleGroup = css({
    display: "flex",
    alignItems: "center",
    gap: "2",
});

export const title = cva({
    base: {
        fontWeight: "semibold",
        color: "fg.default",
        margin: 0,
    },
    variants: {
        size: {
            sm: { fontSize: "sm" },
            md: { fontSize: "md" },
            xl: { fontSize: "xl" },
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export const description = css({
    fontSize: "sm",
    color: token("colors.textSubtle"),
    margin: 0,
    whiteSpace: "nowrap",
});

export const body = cva({
    base: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflowY: "auto",
    },
    variants: {
        centered: {
            true: {
                alignItems: "center",
                textAlign: "center",
            },
            false: {
                alignItems: "flex-start",
                textAlign: "left",
            },
        },
        maxHeight: {
            sm: { maxHeight: "12rem" },
            md: { maxHeight: "18rem" },
            lg: { maxHeight: "24rem" },
            xl: { maxHeight: "32rem" },
            screen: { maxHeight: "calc(100dvh - 1000rem)" },
            none: { maxHeight: "none" },
        },
    },
    defaultVariants: {
        centered: false,
        maxHeight: "none",
    },
});
