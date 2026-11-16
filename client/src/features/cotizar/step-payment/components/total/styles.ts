import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: ["total", "totalLabel", "totalValueRow", "totalValue", "totalCurrency"],
    base: {
        total: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
            marginLeft: "auto",
            marginTop: "2",
            borderRadius: "md",
            backgroundColor: "white",
        },
        totalLabel: {
            color: token("colors.primaryColor"),
            fontSize: "20px",
            fontWeight: "medium",
        },
        totalValueRow: {
            display: "flex",
            alignItems: "baseline",
            gap: "2",
        },
        totalValue: {
            color: token("colors.textSubtle"),
            fontSize: "md",
            fontWeight: "semibold",
        },
        totalCurrency: {
            color: token("colors.textSubtle"),
            fontSize: "md",
            fontWeight: "semibold",
        },
    },
});
