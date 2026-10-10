import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["card", "image", "imagePlaceholder", "cardFooter", "name", "arrow"],
    base: {
        card: {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "md",
            border: "1px solid",
            borderColor: "gray.200",
            backgroundColor: "white",
            boxShadow: "sm",
        },
        image: {
            display: "block",
            width: "100%",
            height: "auto",
        },
        imagePlaceholder: {
            width: "100%",
            height: "5.5rem",
            backgroundColor: "gray.100",
        },
        cardFooter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "2.25rem",
            padding: "2",
            color: "gray.600",
            fontSize: "xs",
        },
        name: {
            color: "gray.600",
            fontSize: "xs",
            fontWeight: "normal",
            lineHeight: "1rem",
        },
        arrow: {
            color: "gray.400",
            fontSize: "xl",
            lineHeight: 1,
        },
    },
});
