import type { ProductType } from "../../types/ProductType";
import { ProductTypeCard } from "../product-type-card/ProductTypeCard";
import { styles } from "./styles";

type ProductTypesGridProps = {
    productTypes: ProductType[];
};

export const ProductTypesGrid = ({
    productTypes,
}: ProductTypesGridProps) => {
    const { grid } = styles();

    return (
        <div className={grid}>
            {productTypes.map((productType) => (
                <ProductTypeCard
                    key={productType.id}
                    productType={productType}
                />
            ))}
        </div>
    );
};
