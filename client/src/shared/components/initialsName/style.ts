// style.ts
import { cva } from "@styled-system/css";

export const avatarInitials = cva({
    base: {
        flexShrink: 0,
        borderRadius: "full",
        background: "#EAF2FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        color: "#111",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)",
    },
    variants: {
        size: {
            sm: { width: "30px", height: "30px", fontSize: "12px" },
            md: { width: "40px", height: "40px", fontSize: "14px" },
            lg: { width: "52px", height: "52px", fontSize: "18px" },
        },
    },
    defaultVariants: {
        size: "md",
    },
});
