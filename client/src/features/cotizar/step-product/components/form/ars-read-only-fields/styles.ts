import { sva } from "@styled-system/css";

export const styles = sva({
    slots: ["wrapper", "dolarRow", "priceRow"],
    base: {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            gap: "4",
        },
        dolarRow: {
            display: "flex",
            alignItems: "flex-end",
            gap: "4",
        },
        priceRow: {
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "1fr 1fr auto" },
            gap: "4",
        },
    },
});
