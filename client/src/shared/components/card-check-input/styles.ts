import { css } from "@styled-system/css";

export const styles = {
    container: css({
        display: "flex",
        flexDirection: "column",
        gap: "3",
        width: "100%",
        marginBottom: "4",
    }),
    options: css({
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "100%",
    }),
    simpleOptions: css({
        display: "grid",
        gridTemplateColumns: {
            base: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
        },
        gap: "2",
        width: "100%",
    }),
    option: css({
        display: "flex",
        alignItems: "flex-start",
        gap: "2",
        width: "100%",
        border: "1px solid",
        borderColor: "gray.300",
        borderRadius: "md",
        backgroundColor: "white",
        color: "gray.800",
        cursor: "pointer",
        textAlign: "left",
        padding: "3",
        transition: "border-color 0.15s, box-shadow 0.15s",
        _hover: {
            borderColor: "gray.400",
        },
    }),
    optionSelected: css({
        borderColor: "gray.300",
    }),
    checkIndicator: css({
        flex: "0 0 auto",
        width: "4",
        height: "4",
        marginTop: "0.5",
        border: "1px solid",
        borderColor: "gray.400",
        borderRadius: "full",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "xs",
        fontWeight: "bold",
        lineHeight: 1,
    }),
    checkIndicatorMultiple: css({
        borderRadius: "sm",
    }),
    checkIndicatorSelected: css({
        borderColor: "primaryColor",
        backgroundColor: "primaryColor",
    }),
    content: css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
        minWidth: 0,
        flex: 1,
    }),
    label: css({
        fontSize: "sm",
        fontWeight: "semibold",
    }),
    description: css({
        color: "gray.600",
        fontSize: "xs",
    }),
    empty: css({
        padding: "4",
        border: "1px dashed",
        borderColor: "gray.300",
        borderRadius: "md",
        color: "gray.600",
        fontSize: "sm",
        textAlign: "center",
    }),
    error: css({
        color: "red.600",
        fontSize: "sm",
    }),
    result: css({
        color: "green.700",
        fontSize: "sm",
    }),
    article: css({
        alignItems: "center",
        padding: "2",
    }),
    articleContent: css({
        display: "block",
        flex: 1,
        minWidth: 0,
    }),
    articleDetails: css({
        display: "block",
    }),
};
