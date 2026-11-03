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
})

const styles = sva({
    slots: ["container", "title"],
    base: {
        container: container,
        title: title
    }
});

export default styles;

