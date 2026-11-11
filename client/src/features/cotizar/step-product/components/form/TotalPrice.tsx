import type { Money } from "@/shared/domain/money/money";
import { formStyles } from "./styles";

interface TotalPriceProps {
    total: number | null;
    moneda: keyof Money | null;
}

export const TotalPrice = ({ total, moneda }: TotalPriceProps) => (
    <div className={formStyles.total}>
        <span className={formStyles.totalLabel}>Monto total</span>
        <div className={formStyles.totalValueRow}>
            <span className={formStyles.totalValue}>
                {total === null ? "—" : total.toLocaleString("es-AR")}
            </span>
            {total !== null && moneda && (
                <span className={formStyles.totalCurrency}>{moneda}</span>
            )}
        </div>
    </div>
);
