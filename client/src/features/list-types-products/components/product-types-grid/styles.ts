import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["grid"],
    base: {
        grid: {
            display: "grid",
            gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
            },
            gap: "4",
        },
    },
});
