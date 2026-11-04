import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["container", "grid"],
    base: {
        container: { 
            width: { 
                base: "100%",
                lg: "100%"
            },
            paddingTop: "4", 
            paddingBottom: "4" 
        },
        grid: {
            display: "grid",
            placeItems: {
                base: "center",
                sm: "start",
            },
            gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, 1fr)",
            },
            gap: "4",
            maxWidth: 1000,
        }
    },
});