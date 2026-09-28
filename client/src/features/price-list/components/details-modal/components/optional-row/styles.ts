import { css, cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const base = cva({
    base: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        w: "100%",
        h: "40px",
        padding: 2,
        borderRadius: 2
    },
    variants: {
        color: {
            true: {
                bg: "#FFF"
            },
            false: {
                bg: token("colors.surfacePageColor")
            }
        }
    }
});

const isPar = (index: number) => index % 2 === 0;

export const styles = (index: number) => css(base.raw({color: isPar(index)}));