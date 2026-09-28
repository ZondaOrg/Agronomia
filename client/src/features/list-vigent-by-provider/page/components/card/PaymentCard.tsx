import type { Payment } from "@/features/list-vigent-by-provider/types/VigentesPayment";
import {
    applicationText,
    bonusStyle,
    bulletStyle,
    listItemStyle,
} from "./styles";

export const PaymentCard = ({ payment }: { payment: Payment }) => {
    const hasBonus = Number(payment.bonusPercentage) !== 0;
    const hasApplication = payment.application !== "No Aplica";

    return (
        <li className={listItemStyle}>
            <span className={bulletStyle} />
            <p>
                {payment.description}
                {hasApplication && (
                    <>
                        {" — "}
                        <strong>{payment.application}:</strong>{" "}
                        <span
                            className={applicationText({
                                type: payment.application,
                            })}
                        >
                            {payment.percentage}%
                        </span>
                    </>
                )}
                {hasBonus && (
                    <>
                        {" — "}
                        <strong>Bonificación:</strong>{" "}
                        <span className={bonusStyle}>
                            {payment.bonusPercentage}%
                        </span>
                    </>
                )}
            </p>
        </li>
    );
};
