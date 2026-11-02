import { css, sva } from "@styled-system/css";

const container = css.raw({
    width: "100%",
    minHeight: "100vh",
    padding: { base: "16px", md: "24px" },
    backgroundColor: "#F8F7F6",
});

const content = css.raw({
    width: "100%",
    padding: { base: "24px 20px", md: "28px" },
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
});

const title = css.raw({
    margin: 0,
    fontSize: { base: "24px", md: "28px" },
    fontWeight: "bold",
    color: "textStrong",
});

const description = css.raw({
    margin: "8px 0 0",
    fontSize: "13px",
    color: "textSubtle",
});

const image = css.raw({
    display: "block",
    width: { base: "180px", sm: "220px" },
    height: "170.53px",
    maxWidth: "100%",
    objectFit: "contain",
    objectPosition: "left center",
    margin: "18px 0 20px",
});

const actions = css.raw({
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
});

export const styles = sva({
    slots: ["container", "content", "title", "description", "image", "actions"],
    base: {
        container,
        content,
        title,
        description,
        image,
        actions,
    },
});
