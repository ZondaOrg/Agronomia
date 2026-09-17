import { cva } from "@styled-system/css";

export const container = cva({
    base: {
        display: "grid",
        placeItems: "center",
        gap: "5vh",
        width: "100%",
        maxWidth: "640px",
        paddingTop: "24px",
        paddingBottom: "24px",
        borderRadius: "16px",
        bg: "#FFF",
    },
    variants: {
        bordered: {
            true: {
                boxShadow:
                    "0px 1px 3px rgba(39, 39, 42, 0.1), 0px 1px 2px -1px rgba(39, 39, 42, 0.1)",
                border: "1px solid #E8E8E8",
            },
            false: {
                border: "1px solid transparent",
                boxShadow: "none",
            },
        },
    },
    defaultVariants: {
        bordered: true,
    },
});
