import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const formStyles = {
    form: css({
        display: "flex",
        flexDirection: "column",
        gap: "4",
        width: "100%",
    }),
    section: css({
        display: "flex",
        flexDirection: "column",
        gap: "4",
        width: "100%",
        marginTop: "6",
    }),
    sectionTitle: css({
        fontWeight: "400",
        fontSize: "22px",
        color: token("colors.textSubtle"),
    }),
    sectionDivider: css({
        width: "100%",
        borderColor: token("borders.borderColor.line"),
    }),
    row: css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
        gap: "4",
    }),
    field: css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
    }),
    label: css({
        color: "gray.700",
        fontSize: "sm",
        fontWeight: "medium",
    }),
    control: css({
        width: "100%",
        minHeight: "10",
        paddingInline: "3",
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
        _disabled: { cursor: "not-allowed", opacity: 0.6 },
    }),
    controlWithCurrency: css({
        position: "relative",
        display: "flex",
        alignItems: "center",
    }),
    currencySuffix: css({
        position: "absolute",
        right: "3",
        color: token("colors.textSubtle"),
        fontSize: "sm",
        fontWeight: "medium",
        pointerEvents: "none",
    }),
    controlReadOnly: css({
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
    }),
    total: css({
        display: "flex",
        flexDirection: "column",
        padding: "4",
        borderRadius: "md",
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "gray.200",
    }),
    totalLabel: css({
        color: token("colors.primaryColor"),
        fontWeight: "medium",
    }),
    totalValueRow: css({
        display: "flex",
        alignItems: "baseline",
        gap: "2",
    }),
    totalValue: css({
        color: token("colors.textSubtle"),
        fontSize: "32px",
        fontWeight: "bold",
    }),
    totalCurrency: css({
        color: token("colors.textSubtle"),
        fontSize: "32px",
        fontWeight: "bold",
    }),
};
