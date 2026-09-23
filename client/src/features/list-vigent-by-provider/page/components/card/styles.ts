import { css, cva } from "@styled-system/css";

export const applicationText = cva({
    base: {
        fontWeight: "semibold",
    },
    variants: {
        type: {
            recargo: { color: "red.600" },
            descuento: { color: "green.600" },
            default: { color: "gray.700" },
        },
    },
    defaultVariants: {
        type: "default",
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
    backgroundColor: "gray.50",
    borderRadius: "md",
    padding: "4",
});

export const bulletStyle = css({
    marginTop: "2",
    height: "1.5",
    width: "1.5",
    flexShrink: 0,
    borderRadius: "full",
    backgroundColor: "gray.400",
});

export const bonusStyle = css({
    fontWeight: "semibold",
    color: "blue.600",
});
