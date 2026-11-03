import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const buttonContainer = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderRadius: 8,
    bg: token("colors.primaryColor"),
    _hover: {
        bg: token("colors.primaryColorHover"),
    },
});
