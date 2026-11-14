import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["priceRow"],
    base: {
        priceRow: {
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "1fr 1fr auto" },
            gap: "4",
        },
    },
});
