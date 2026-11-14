import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: ["wrapper", "obtained"],
    base: {
        wrapper: {
            display: "flex",
            alignItems: "center",
            minHeight: "10",
        },
        obtained: {
            color: token("colors.textSubtle"),
            fontSize: "sm",
            fontWeight: "medium",
        },
    },
});
