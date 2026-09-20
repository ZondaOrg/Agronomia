import { css } from "@styled-system/css";
import type { Size } from "../../types/size";
import type { SystemStyleObject } from "@styled-system/types";

export const container = css.raw({
    placeSelf: {
        base: "center",
        md: "start"
    },
    display: "grid",
    placeItems: "center",
    gap: "5vh",
    width: "100%",
    paddingTop: "24px",
    paddingBottom: "24px",
    boxShadow: "0px 1px 3px rgba(39, 39, 42, 0.1), 0px 1px 2px -1px rgba(39, 39, 42, 0.1)",
    border: "1px solid #E8E8E8",
    borderRadius: "16px",
    bg: "#FFF"
});

export const smallContainer = css.raw({
    ...container,
   maxWidth: "640px",
});


export const styles = (size?: Size) => css(stylesHandler(size))

function stylesHandler(size?: string): SystemStyleObject {
    if(!size)         return smallContainer
    if(size === "lg") return container
    return smallContainer
}
