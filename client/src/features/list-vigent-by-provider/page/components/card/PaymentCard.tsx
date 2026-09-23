import type { Payment } from "@/features/list-vigent-by-provider/types/VigentesPayment";
import { css, cva } from "@styled-system/css";

const applicationText = cva({
    base: {
        fontWeight: "semibold",
    },
    variants: {
        type: {
            recargo: { color: "red.600" },
            descuento: { color: "green.600" },
            default: { color: "gray.700" },
        },
    },
    defaultVariants: {
        type: "default",
    },
});

const APPLICATION_VARIANT: Record<string, "recargo" | "descuento"> = {
    Recargo: "recargo",
    Descuento: "descuento",
};

const NO_APPLICATION_LABEL = "No Aplica";

const formatPercentage = (value: number) =>
    value.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const listItemStyle = css({
    listStyleType: "none",
    display: "flex",
    alignItems: "flex-start",
    gap: "2",
    fontSize: "sm",
    color: "gray.700",
    width: "100%",
    backgroundColor: "gray.50",
    borderRadius: "md",
    padding: "4",
});

const bulletStyle = css({
    marginTop: "2",
    height: "1.5",
    width: "1.5",
    flexShrink: 0,
    borderRadius: "full",
    backgroundColor: "gray.400",
});

const bonusStyle = css({
    fontWeight: "semibold",
    color: "blue.600",
});

export const PaymentCard = ({ payment }: { payment: Payment }) => {
    const hasApplication = payment.application !== NO_APPLICATION_LABEL;
    const applicationType = APPLICATION_VARIANT[payment.application];

    return (
        <li className={listItemStyle}>
            <span className={bulletStyle} />
            <p>
                {payment.description}
                {hasApplication && (
                    <>
                        {" — "}
                        <strong>[{payment.application}]:</strong>{" "}
                        <span
                            className={applicationText({
                                type: applicationType,
                            })}
                        >
                            [{formatPercentage(payment.percentage)}%]
                        </span>
                    </>
                )}
                {" — "}
                <strong>Bonificación:</strong>{" "}
                <span className={bonusStyle}>
                    [{formatPercentage(payment.bonusPercentage)}%]
                </span>
            </p>
        </li>
    );
};
