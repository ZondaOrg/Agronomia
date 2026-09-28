import { css, sva } from "@styled-system/css";
import { token } from "@styled-system/tokens";

export const container = css({
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(24, 24, 27, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    zIndex: 200,
    overflowY: "auto",
});

export const card = css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
    w: {
        base: "100%",
        md: "50%",
        lg: "40%"
    },
    h: "100%",
    padding: 2,
    borderRadius: "8px",
    bg: "#FFF"
});

export const details = sva({
    slots: ["detailsSection", "cardTextContainer", "cardTitle", "image", "cardDescription"],
    base: {
        detailsSection: {
            display: "flex",
            flexDirection: "column",
            gap: 4,
            w: "96%",
        },
        image: {
            w: "30px"
        },
        cardTextContainer: {
            marginLeft: "5px"
        },
        cardTitle: {
            fontSize: 22,
            fontWeight: 500,
        },
        cardDescription: {
            fontSize: 16,
            color: token("colors.textSubtle")
        }
    }
})

export const optionals = sva({
    slots: ["optionalsContainer", "optionalTitle", "emptyMessage"],
    base: {
        optionalsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginLeft: "10px"
        },
        optionalTitle: {
            fontWeight: "bold"
        },
        emptyMessage: {
            color: token("colors.textSubtle")
        }
    }
})