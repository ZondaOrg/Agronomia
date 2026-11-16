import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const container = css.raw({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

const inputContainer = css.raw({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "34px",
    padding: "5px",
    border: "1px solid #949494",
    borderRadius: "8px",
});

const inputInto = css.raw({
    borderStyle: "none",
    outline: "none",
})

const errorStyle = css.raw({
    color: token("colors.danger"),
    fontSize: "12px",
})

export const styles = sva({
    slots: ["container", "inputContainer", "inputInto", "errorStyle"],
    base: {
        container: container,
        inputContainer: inputContainer,
        inputInto: inputInto,
        errorStyle: errorStyle
    },
    variants: {
        error: {
            true: {
                inputContainer: { 
                    borderColor: token("colors.danger"),
                    border: "1.5px solid", 
                },
            },
        },
    },
})