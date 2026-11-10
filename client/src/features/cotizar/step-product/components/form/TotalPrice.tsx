import { formStyles } from "./styles";

interface TotalPriceProps {
    total: number | null;
}

export const TotalPrice = ({ total }: TotalPriceProps) => (
    <div className={formStyles.total}>
        <span className={formStyles.totalLabel}>Monto total</span>
        <span className={formStyles.totalValue}>
            {total === null ? "—" : total.toLocaleString("es-AR")}
        </span>
    </div>
);
