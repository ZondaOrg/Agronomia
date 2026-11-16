import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const fieldContainer = css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
    marginBottom: "3",
});

export const labelStyle = css({
    fontSize: "14px",
    color: token("colors.textSubtle"),
    lineHeight: "1.2",
});

export const valueStyle = css({
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
    margin: 0,
    lineHeight: "1.4",
});
