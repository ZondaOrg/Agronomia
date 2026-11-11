import { sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const styles = sva({
    slots: ["section", "sectionTitle", "sectionDivider", "label"],
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
            borderColor: token("borders.borderColor.line"),
        },
        label: {
            color: "gray.700",
            fontSize: "sm",
            fontWeight: "medium",
        },
    },
});
