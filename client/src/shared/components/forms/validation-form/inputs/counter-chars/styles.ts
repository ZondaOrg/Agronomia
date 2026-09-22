import { css, cva } from "@styled-system/css";
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
                color: "red"
            }
        }
    }
})

export const counter = (isValid: boolean) => css(counterColor.raw({ color: isValid }))