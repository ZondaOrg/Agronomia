import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const container = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    width: "94%",
});

export const title = css({
    alignSelf: "start",
    fontSize: "22px",
    fontWeight: "400",
    color: "textSubtle",
});

export const subtitle = css({
    alignSelf: "start",
    fontWeight: "500",
    fontSize: "16px",
    color: token("colors.textSubtle"),
});

export const formContainer = css({
    display: "flex",
    flexDirection: {
        base: "column",
        md: "row",
    },
    justifyContent: {
        base: "center",
        md: "start",
    },
    gap: "8",
    width: "100%",
});
