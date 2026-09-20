import { css, cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const tabsContainer = css({
    width: "100%",
    display: "row",
    gap: "10px",
});

export const tabsList = css({
    display: "flex",
    gap: "24px",
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
    marginTop: "24px",
    minWidth: 0,
    padding: "24px",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: "lg",
    bg: "white",
});
