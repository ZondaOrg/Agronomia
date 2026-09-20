// import { token } from "@styled-system/tokens";

export const container = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    backgroundColor: "#ff0000",
};

export const sectionHeader = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
    marginBottom: "1rem",
};

export const title = {
    fontWeight: "600",
    fontSize: "1rem",
    bold: true,
};

export const subtitle = {
    fontSize: "0.875rem",
    color: "text.muted",
};

export const actions = {
    width: "90%",
    height: "20%",
    minHeight: "38px",
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "0.75rem",
};
