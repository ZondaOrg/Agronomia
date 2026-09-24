import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const filtrarStyle = css({
    display: "flex",
    alignItems: "center",
    gap: "1",
    fontSize: "sm",
    color: token("colors.primaryColor"),
    fontWeight: "medium",
    cursor: "pointer",
    textDecoration: "underline",
    _hover: { color: token("colors.primaryColorHover") },
});
