import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: [
        "total",
        "totalLabel",
        "totalValueRow",
        "totalValue",
        "totalCurrency",
        "totalSecondary",
    ],
    base: {
        total: {
            display: "flex",
            flexDirection: "column",
            padding: "4",
            borderRadius: "md",
            backgroundColor: "white",
            border: "1px solid",
            borderColor: "gray.200",
        },
        totalLabel: {
            color: token("colors.primaryColor"),
            fontWeight: "medium",
        },
        totalValueRow: {
            display: "flex",
            alignItems: "baseline",
            gap: "2",
        },
        totalValue: {
            color: token("colors.textSubtle"),
            fontSize: "32px",
            fontWeight: "bold",
        },
        totalCurrency: {
            color: token("colors.textSubtle"),
            fontSize: "32px",
            fontWeight: "bold",
        },
        totalSecondary: {
            color: token("colors.textSubtle"),
            fontSize: "md",
            fontWeight: "medium",
        },
    },
});
