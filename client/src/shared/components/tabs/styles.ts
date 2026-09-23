// styles.ts
import { css, cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const tabsContainer = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: 0,
});

export const tabsList = css({
    display: "flex",
    gap: "24px",
    flexShrink: 0,
});

export const tab = cva({
    base: {
        position: "relative",
        border: "none",
        background: "transparent",
        color: "#596579",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        _hover: {
            color: token("colors.primaryColorHover"),
        },
    },
    variants: {
        active: {
            true: {
                color: token("colors.primaryColor"),
                fontWeight: "600",
                _after: {
                    content: '""',
                    position: "absolute",
                    right: "0",
                    bottom: "-1px",
                    left: "0",
                    height: "2px",
                    background: token("colors.primaryColorHover"),
                },
            },
        },
    },
    defaultVariants: {
        active: false,
    },
});

export const tabPanel = css({
    width: "100%",
    minWidth: 0,
    flex: 1,
    minHeight: 0,
    marginTop: "24px",
    padding: "24px",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: "lg",
    bg: "white",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
});
