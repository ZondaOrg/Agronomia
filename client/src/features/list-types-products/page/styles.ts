import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["container", "empty", "spinnerWrapper"],
    base: {
        container: {
            display: "flex",
            flexDirection: "column",
            gap: "6",
            width: "100%",
        },
        empty: {
            margin: 0,
            color: "gray.600",
            textAlign: "center",
        },
        spinnerWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8",
        },
    },
});
