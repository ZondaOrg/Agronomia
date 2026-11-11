import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const container = css.raw({
    display: "grid",
    placeItems: "center",
    width: "94%",
    gap: "2rem",
});

const title = css.raw({
    justifySelf: "start",
    fontWeight: "400",
    fontSize: "22px",
    color: token("colors.textSubtle")
});

const border = css.raw({
    width: "100%",
    borderColor: "borders.borderColor.line",
});

const styles = sva({
    slots: ["container", "title", "border"],
    base: {
        container: container,
        title: title,
        border: border
    }
});

export default styles;

