import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: [
        "field",
        "label",
        "controlWrapper",
        "control",
        "controlEditable",
        "apply",
    ],
    base: {
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
        controlWrapper: {
            position: "relative",
            display: "flex",
            alignItems: "center",
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
        controlEditable: {
            width: "100%",
            minHeight: "10",
            paddingInline: "3",
            paddingRight: "28",
            border: "1px solid",
            borderColor: "gray.300",
            borderRadius: "sm",
            backgroundColor: "white",
            color: "black",
            fontSize: "sm",
            outline: "none",
            _focus: {
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px var(--colors-blue-500)",
            },
        },
        apply: {
            position: "absolute",
            right: "1",
            top: "50%",
            transform: "translateY(-50%)",
        },
    },
});
