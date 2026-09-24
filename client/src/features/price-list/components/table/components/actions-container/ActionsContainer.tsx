import type { Product } from "@/features/price-list/domain/product";
import DetailsButton from "../deatils-button/DetailsButton";
import QuoteButton from "../quote-button/QuoteButton";
import { css } from "@styled-system/css";
import useActive from "@/shared/hooks/use-active";
import EditButton from "../edit-button/EditButton";
import DetailsModal from "../../../details-modal/DetailsModal";

interface ActionContainerProps {
    product: Product
}

const styles = css({
    display: "flex",
    alignItems: "center",
    gap: 6
})

const ActionContainer = ({product}: ActionContainerProps) => {
    const {isActive, onActive} = useActive();

    return (
        <div className={styles}>
            <DetailsButton onActive={onActive}/>
            <QuoteButton />
            <EditButton />
            {isActive && <DetailsModal product={product} onActive={onActive} />}
        </div>
    )
}

export default ActionContainer;