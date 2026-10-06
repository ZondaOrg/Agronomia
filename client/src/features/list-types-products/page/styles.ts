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

        spinnerWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8",
        },
    },
});
