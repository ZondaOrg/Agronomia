import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: [
        "row",
        "field",
        "label",
        "controlWithCurrency",
        "control",
        "currencySuffix",
    ],
    base: {
        row: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
            gap: "4",
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
        controlWithCurrency: {
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
        currencySuffix: {
            position: "absolute",
            right: "3",
            color: token("colors.textSubtle"),
            fontSize: "sm",
            fontWeight: "medium",
            pointerEvents: "none",
        },
    },
});
