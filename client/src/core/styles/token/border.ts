import { defineTokens } from "@pandacss/dev";

export const borderRadiusTokens = defineTokens.radii({
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "16px" },
    xl: { value: "24px" },
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
