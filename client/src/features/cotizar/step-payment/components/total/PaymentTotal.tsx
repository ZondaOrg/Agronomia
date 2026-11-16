import { styles } from "./styles";

interface PaymentTotalProps {
    total?: number;
    currency?: string;
}

const format = (amount: number) => amount.toLocaleString("es-AR");

export const PaymentTotal = ({ total, currency }: PaymentTotalProps) => {
    const {
        total: totalBox,
        totalLabel,
        totalValueRow,
        totalValue,
        totalCurrency,
    } = styles();

    return (
        <div className={totalBox}>
            <span className={totalLabel}>Monto total</span>
            <div className={totalValueRow}>
                <span className={totalValue}>
                    {total !== undefined ? format(total) : "—"}
                </span>
                {currency && <span className={totalCurrency}>{currency}</span>}
            </div>
        </div>
    );
};
