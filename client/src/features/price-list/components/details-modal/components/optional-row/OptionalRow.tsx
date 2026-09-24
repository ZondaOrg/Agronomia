import type { Optional } from "@/features/price-list/domain/optional";
import { css } from "@styled-system/css";
import { styles } from "./styles";

interface OptionalRowProps {
    optional: Optional
    index: number
}

const OptionalRow = ({optional, index}: OptionalRowProps) => {
    return (
        <div className={styles(index)}>
            <p>{optional.name}</p>
            <p className={css({fontWeight: "500"})}>{`$${optional.price}`}</p>
        </div>
    )
}

export default OptionalRow;