import { defineTokens } from "@pandacss/dev";

const tokenColors = defineTokens.colors({
    primaryColor: { value: "#0E5CA5" },
    primaryColorHover: { value: "#0B4A8C" },
    surfacePageColor: { value: "#F8F7F6" },
    surfaceCardColor: { value: "#FFFFFF" },
    danger: { value: "#E11D48" },
    dangerHover: { value: "#B91C1C" },
    success: { value: "#0C9589" },
    primaryColorSubtle: { value: "#638BAF" },
    textSubtle: { value: "#545454" },
    textMuted: { value: "#A1A1AA" },
    textStrong: { value: "#202020" },
});

export default tokenColors;
