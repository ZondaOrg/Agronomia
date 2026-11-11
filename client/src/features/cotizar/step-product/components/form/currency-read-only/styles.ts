import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: ["wrapper", "field", "label", "control"],
    base: {
        wrapper: {
            width: "25%",
        },
        field: {
            display: "flex",
            flexDirection: "column",
            gap: "1",
        },
        label: {
            color: "gray.700",
            fontSize: "sm",
            fontWeight: "medium",
        },
        control: {
            width: "100%",
            minHeight: "10",
            paddingInline: "3",
            border: "1px solid",
            borderColor: "gray.300",
            borderRadius: "sm",
            backgroundColor: "gray.50",
            color: token("colors.textSubtle"),
            fontSize: "sm",
            outline: "none",
            cursor: "default",
        },
    },
});
