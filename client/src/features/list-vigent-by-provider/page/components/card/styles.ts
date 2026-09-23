import { css, cva } from "@styled-system/css";

export const applicationText = cva({
    base: {
        fontWeight: "semibold",
    },
    variants: {
        type: {
            Recargo: { color: "red.600" },
            Descuento: { color: "green.600" },
            "No Aplica": { color: "gray.700" },
        },
    },
    defaultVariants: {
        type: "No Aplica",
    },
});

export const listItemStyle = css({
    listStyleType: "none",
    display: "flex",
    alignItems: "flex-start",
    gap: "2",
    fontSize: "sm",
    color: "gray.700",
    width: "100%",
    borderRadius: "md",
    padding: "4",
    _odd: {
        backgroundColor: "white",
    },
    _even: {
        backgroundColor: "gray.50",
    },
});

export const bulletStyle = css({
    marginTop: "2",
    height: "1.5",
    width: "1.5",
    flexShrink: 0,
    borderRadius: "full",
    backgroundColor: "black",
});

export const bonusStyle = css({
    fontWeight: "semibold",
    color: "blue.600",
});
