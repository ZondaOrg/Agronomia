import { css } from "@styled-system/css";

export const mobileOnly = css({
    display: { base: "block", md: "none" },
});

export const overlay = css({
    position: "fixed",
    top: "64px",
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 80,
    width: "100%",
    height: "100%",
    border: 0,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    cursor: "pointer",
});

export const drawer = css({
    position: "fixed",
    top: "64px",
    bottom: 0,
    left: 0,
    zIndex: 90,
    width: "min(82vw, 320px)",
    backgroundColor: "#FFF",
    boxShadow: "4px 0 18px rgba(0, 0, 0, 0.12)",
});

export const drawerContent = css({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "18px 14px 14px",
});

export const drawerAvatar = css({
    display: "flex",
    paddingTop: "16px",
    marginTop: "auto",
    borderTopWidth: "1px",
    borderColor: "borderSubtle",
});