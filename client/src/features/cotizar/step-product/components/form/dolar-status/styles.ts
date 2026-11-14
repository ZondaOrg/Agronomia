import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: ["wrapper", "icon", "obtained"],
    base: {
        wrapper: {
            display: "flex",
            alignItems: "center",
            gap: "1",
            minHeight: "10",
        },
        icon: {
            width: "5",
            height: "5",
            flexShrink: 0,
        },
        obtained: {
            color: token("colors.success"),
            fontSize: "sm",
            fontWeight: "medium",
        },
    },
});
