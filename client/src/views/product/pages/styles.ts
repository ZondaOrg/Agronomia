import { sva } from "@styled-system/css";

export const styles = sva({
    slots: [
        "container",
        "grid",
        "card",
        "image",
        "imagePlaceholder",
        "name",
        "spinnerWrapper",
    ],
    base: {
        container: {
            width: "100%",
            padding: "4",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
            },
            gap: "4",
        },
        card: {
            display: "flex",
            flexDirection: "column",
            gap: "3",
            overflow: "hidden",
            borderRadius: "md",
            backgroundColor: "white",
            boxShadow: "sm",
        },
        image: {
            width: "100%",
            aspectRatio: "1",
            objectFit: "cover",
        },
        imagePlaceholder: {
            width: "100%",
            aspectRatio: "1",
            backgroundColor: "gray.100",
        },
        name: {
            padding: "0 4 4",
            fontSize: "lg",
            fontWeight: "semibold",
        },
        spinnerWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8",
        },
    },
});
