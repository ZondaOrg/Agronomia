import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: [
        "section",
        "sectionTitle",
        "sectionDivider",
        "field",
        "optionalsTitle",
        "optionalsHint",
        "price",
    ],
    base: {
        section: {
            display: "flex",
            flexDirection: "column",
            gap: "4",
            width: "100%",
            marginTop: "6",
        },
        sectionTitle: {
            fontWeight: "400",
            fontSize: "22px",
            color: token("colors.textSubtle"),
        },
        sectionDivider: {
            width: "100%",
            borderColor: "borders.borderColor.line",
        },
        field: {
            display: "flex",
            flexDirection: "column",
            gap: "1",
        },
        optionalsTitle: {
            fontWeight: "bold",
            fontSize: "sm",
            color: token("colors.textSubtle"),
        },
        optionalsHint: {
            fontWeight: "normal",
            fontSize: "sm",
            color: token("colors.textSubtle"),
        },
        price: {
            color: token("colors.success"),
        },
    },
});
