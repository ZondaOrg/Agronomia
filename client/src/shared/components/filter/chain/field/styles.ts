import { css, cva } from "@styled-system/css";

export const filterFieldStyles = {
    container: css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
        width: "100%",
    }),
    label: cva({
        base: {
            color: "gray.700",
            fontSize: "sm",
            fontWeight: "medium",
        },
        variants: {
            error: {
                true: { color: "danger" },
            },
        },
    }),
    control: cva({
        base: {
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
        },
        variants: {
            error: {
                true: {
                    borderColor: "danger",
                    outlineColor: "danger",
                    _focus: {
                        borderColor: "danger",
                        boxShadow: "0 0 0 1px var(--colors-danger)",
                    },
                },
            },
        },
    }),
    row: css({
        display: "flex",
        alignItems: "flex-start",
        gap: "3",
        width: "100%",
        "& > :first-child": {
            flex: "1",
            minWidth: "0",
        },
        "& > :last-child:not(:first-child)": {
            flexShrink: "0",
        },
    }),
    autocomplete: css({
        position: "relative",
        width: "100%",
    }),
    options: css({
        position: "absolute",
        top: "100%",
        left: "0",
        right: "0",
        zIndex: "10",
        maxHeight: "60",
        overflowY: "auto",
        marginTop: "1",
        border: "1px solid",
        borderColor: "gray.300",
        borderRadius: "sm",
        backgroundColor: "white",
        boxShadow: "md",
        listStyle: "none",
        padding: "0",
    }),
    option: css({
        paddingInline: "3",
        paddingBlock: "2",
        fontSize: "sm",
        color: "gray.800",
        cursor: "pointer",
        _hover: { backgroundColor: "gray.100" },
    }),
};
