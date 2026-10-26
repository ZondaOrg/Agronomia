import { css } from "@styled-system/css";

export const filterFieldStyles = {
    container: css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
        width: "100%",
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
        _disabled: {
            cursor: "not-allowed",
            opacity: 0.6,
        },
    }),
};
