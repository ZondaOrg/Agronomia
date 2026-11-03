import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const container = css.raw({
    display: "grid",
    gridTemplateRows: "repeat(auto-fit, 1fr)",
    placeItems: "center",
    width: "100%",
    gap: "1rem",
});

const title = css.raw({
    justifySelf: "start",
    paddingLeft: "2rem",
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

