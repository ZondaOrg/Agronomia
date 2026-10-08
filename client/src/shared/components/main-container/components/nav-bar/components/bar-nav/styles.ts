import { css } from "@styled-system/css";

export const navBar = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    width: "100%",
    minHeight: "64px",
    padding: "14px",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    borderBottomWidth: "1px",
    borderBottomColor: "#E5E7EB",
});

export const wrapLogo = css({
    display: "flex",
    alignItems: "center",
});