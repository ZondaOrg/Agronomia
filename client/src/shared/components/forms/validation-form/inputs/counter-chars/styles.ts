import { css, cva } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import type { SystemStyleObject } from "@styled-system/types";

export const container = (styles: SystemStyleObject) => css({
    ...styles,
    height: "200px",
})

const counterColor = cva({
    variants: {
        color: {
            true: {
                color: "black"
            },
            false: {
                color: token("colors.danger")
            }
        }
    }
})

export const counter = (isValid: boolean) => css(counterColor.raw({ color: isValid }))