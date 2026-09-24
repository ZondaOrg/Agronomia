import { css } from "@styled-system/css";

export const paymentCard = css({
    listStyleType: "none",
    backgroundColor: "gray.50",
    borderRadius: "md",
    padding: "4",
    fontSize: "sm",
    color: "gray.700",
});

export const paymentList = css({
    display: "flex",
    flexDirection: "column",
    gap: "3",
    width: "100%",
    alignSelf: "stretch",
});
