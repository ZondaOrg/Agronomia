import type { ProductType } from "../../types/ProductType";
import { styles } from "./styles";
import { Link } from "react-router";

type ProductTypeCardProps = {
    productType: ProductType;
};

export const ProductTypeCard = ({ productType }: ProductTypeCardProps) => {
    const { card, image, imagePlaceholder, cardFooter, name, arrow } = styles();

    return (
        <Link
            className={card}
            to={`./${productType.id}/${encodeURIComponent(productType.name)}`}
            relative="path"
            aria-label={`Ver productos de ${productType.name}`}
        >
            {productType.image ? (
                <img
                    className={image}
                    src={productType.image}
                    alt={productType.name}
                />
            ) : (
                <div
                    className={imagePlaceholder}
                    aria-label="Tipo de producto sin imagen"
                />
            )}
            <div className={cardFooter}>
                <h2 className={name}>{productType.name}</h2>
                <span
                    className={arrow}
                    aria-hidden="true"
                >
                    ›
                </span>
            </div>
        </Link>
    );
};
