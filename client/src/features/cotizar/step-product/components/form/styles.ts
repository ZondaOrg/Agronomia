import { css } from "@styled-system/css";

export const formStyles = {
    form: css({
        display: "flex",
        flexDirection: "column",
        gap: "4",
        width: "100%",
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
        color: "gray.800",
        fontSize: "sm",
        outline: "none",
        _focus: {
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--colors-blue-500)",
        },
        _disabled: { cursor: "not-allowed", opacity: 0.6 },
        _readOnly: { backgroundColor: "gray.50", cursor: "default" },
    }),
    total: css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
        padding: "4",
        borderRadius: "md",
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "gray.200",
    }),
    totalLabel: css({
        color: "gray.500",
        fontSize: "sm",
        fontWeight: "medium",
    }),
    totalValue: css({
        color: "gray.900",
        fontSize: "2xl",
        fontWeight: "bold",
    }),
};
