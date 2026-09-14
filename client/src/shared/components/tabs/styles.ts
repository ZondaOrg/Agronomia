import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const tabsContainer = css({
    width: "100%",
});

export const tabsList = css({
    display: "flex",
    gap: "24px",
});

export const tab = css({
    position: "relative",
    padding: "0 0 10px",
    border: "none",
    background: "transparent",
    color: "#596579",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    transition: "color 160ms ease",
    _hover: {
        color: token("colors.primaryColorHover"),
    },
});

export const activeTab = css({
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
});

export const tabPanel = css({
    paddingTop: "20px",
    bg: "white",
});
