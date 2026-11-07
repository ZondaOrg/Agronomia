import { css } from "@styled-system/css";

export const preview = css({
    width: "100%",
    padding: "4",
    border: "1px solid",
    borderColor: "borderSubtle",
    borderRadius: "md",
    backgroundColor: "white",
});

export const previewTitle = css({
    margin: 0,
    marginBottom: "4",
    color: "#18181B",
    fontSize: "md",
    fontWeight: "semibold",
});

export const previewFields = css({
    display: "flex",
    flexDirection: "column",
    gap: "3",
});

export const optionalList = css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
    margin: 0,
    paddingLeft: "4",
});
