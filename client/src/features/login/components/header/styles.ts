import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const header = sva({
    slots: ["container", "title", "subtitle"],
    base: {
        container: {
            width: "90%",
        },
        title: {
            fontSize: "36",
            fontWeight: "500",
            color: token("colors.textSubtle"),
        },
        subtitle: {
            fontSize: "16px",
            fontWeight: "400",
            color: token("colors.textSubtle"),
        }
    }
});