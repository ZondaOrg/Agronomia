import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["priceRow"],
    base: {
        priceRow: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
            gap: "4",
        },
    },
});
