import type { Money } from "@/shared/domain/money/money";
import type { ProductTotal } from "../../../domain/product-total";
import { getTotalDisplay } from "./types/total-display";
import { styles } from "./styles";

interface TotalPriceProps {
    total: ProductTotal | null;
    moneda: keyof Money | null;
}

const format = (amount: number) => amount.toLocaleString("es-AR");

export const TotalPrice = ({ total, moneda }: TotalPriceProps) => {
    const {
        total: totalBox,
        totalLabel,
        totalValueRow,
        totalValue,
        totalCurrency,
        totalSecondary,
    } = styles();

    const main = getTotalDisplay(total, moneda);

    return (
        <div className={totalBox}>
            <span className={totalLabel}>Monto total</span>
            <div className={totalValueRow}>
                <span className={totalValue}>
                    {main ? format(main.amount) : "—"}
                </span>
                {main?.currency && (
                    <span className={totalCurrency}>{main.currency}</span>
                )}
            </div>
            {total?.kind === "convert" && (
                <span className={totalSecondary}>
                    {format(total.totalUsd)} USD
                </span>
            )}
        </div>
    );
};
