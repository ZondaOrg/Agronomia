import { defineTokens } from "@pandacss/dev";

const tokenBorder = defineTokens.borders({
    borderRadius: {
        sm: { value: "4px" },
        md: { value: "8px" },
        lg: { value: "16px" },
        xl: { value: "24px" },
    },
    borderWidth: {
        thin: { value: "1px" },
        thick: { value: "2px" },
    },
    borderColor: {
        primary: { value: "#E2E2E2" },
        subtle: { value: "#A1A1AA" },
        secondary: { value: "#E8E8E8" },
        line: { value: "#CECECE" },
    },
});

export const borderWidthTokens = defineTokens.borderWidths({
    thin: { value: "1px" },
    thick: { value: "2px" },
});

export const borderColorTokens = defineTokens.colors({
    borderPrimary: { value: "#E2E2E2" },
    borderSubtle: { value: "#A1A1AA" },
    borderSecondary: { value: "#E8E8E8" },
    borderLine: { value: "#CECECE" },
});

export const borderRadiusTokens = defineTokens.radii({
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "16px" },
    xl: { value: "24px" },
});

export default tokenBorder;
