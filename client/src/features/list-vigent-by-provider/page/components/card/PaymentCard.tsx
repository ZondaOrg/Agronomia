import type { Payment } from "@/features/list-vigent-by-provider/types/VigentesPayment";
import {
    applicationText,
    bonusStyle,
    bulletStyle,
    listItemStyle,
} from "./styles";

const APPLICATION_VARIANT: Record<string, "recargo" | "descuento"> = {
    Recargo: "recargo",
    Descuento: "descuento",
};

const NO_APPLICATION_LABEL = "No Aplica";

export const PaymentCard = ({ payment }: { payment: Payment }) => {
    const hasApplication = payment.application !== NO_APPLICATION_LABEL;
    const applicationType = APPLICATION_VARIANT[payment.application];
    const hasBonus = Number(payment.bonusPercentage) !== 0;

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
                            [{payment.percentage}%]
                        </span>
                    </>
                )}
                {hasBonus && (
                    <>
                        {" — "}
                        <strong>Bonificación:</strong>{" "}
                        <span className={bonusStyle}>
                            [{payment.bonusPercentage}%]
                        </span>
                    </>
                )}
            </p>
        </li>
    );
};
