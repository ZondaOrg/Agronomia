import { css, sva } from "@styled-system/css";

const container = css.raw({
    width: "100%",
    padding: { base: "8px", md: "8px" },
});

const content = css.raw({
    width: "100%",
    padding: { base: "20px 12px", md: "20px 12px" },
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
});

const title = css.raw({
    margin: 0,
    fontSize: { base: "26px", md: "30px" },
    fontWeight: "bold",
    color: "textStrong",
});

const description = css.raw({
    margin: "8px 0 0",
    fontSize: "14px",
    color: "textSubtle",
});

const image = css.raw({
    display: "block",
    width: "571.24px",
    height: "170.53px",
    maxWidth: "100%",
    objectFit: "contain",
    objectPosition: "left center",
    margin: "22px 0 30px",
});

const message = css.raw({
    margin: 0,
    fontSize: "12px",
    color: "textSubtle",
});

const actions = css.raw({
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "18px",
});

export const styles = sva({
    slots: [
        "container",
        "content",
        "title",
        "description",
        "image",
        "message",
        "actions",
    ],
    base: {
        container,
        content,
        title,
        description,
        image,
        message,
        actions,
    },
});
