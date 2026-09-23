import { css, sva } from "@styled-system/css";

const wrapper = css.raw({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: { base: "100%", md: "40%", lg: "100%" },
    padding: "10px 14px",
    border: "1px solid #E4E4E4",
    borderRadius: "10px",
    backgroundColor: "white",
});

const icon = css.raw({
    flexShrink: 0,
    width: "16px",
    height: "16px",
    color: "#9A9A9A",
});

const input = css.raw({
    flex: 1,
    minWidth: 0,
    border: 0,
    outline: "none",
    fontSize: "14px",
    color: "#333333",
    backgroundColor: "transparent",
    _placeholder: { color: "#9A9A9A" },
});

export const styles = sva({
    slots: ["wrapper", "icon", "input"],
    base: { wrapper, icon, input },
});
