import type { Money } from "@/shared/domain/money/money";
import { styles } from "./styles";

interface TotalPriceProps {
    total: number | null;
    moneda: keyof Money | null;
}

export const TotalPrice = ({ total, moneda }: TotalPriceProps) => {
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
                    {total ? total.toLocaleString("es-AR") : "—"}
                </span>
                {total && moneda && (
                    <span className={totalCurrency}>{moneda}</span>
                )}
            </div>
        </div>
    );
};
