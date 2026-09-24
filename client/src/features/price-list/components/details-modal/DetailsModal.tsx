import type { Product } from "../../domain/product"
import OptionsContainer from "./components/optional-container/OptionalContainer";
import { card, container, details, optionals } from "./styles";
import prev from "@/assets/icons/prev-icon.svg";

interface DetailsModalProps {
    product: Product
    onActive: () => void
}

const DetailsModal = ({product, onActive}: DetailsModalProps) => {

    const {detailsSection, cardTextContainer, cardTitle, cardDescription, image} = details();
    const {optionalsContainer, emptyMessage, optionalTitle} = optionals();

    return (
        <div className={container}>
            <article className={card}>
                <section className={detailsSection}>
                    <img className={image} src={prev} alt="Icono para cerrar los detalles del producto" onClick={onActive} />
                    <div className={cardTextContainer}>
                        <h2 className={cardTitle}>{product.name}</h2>
                        <p className={cardDescription}>{product.details.description}</p>
                    </div>
                </section>
                <div className={optionalsContainer}>
                    <p className={optionalTitle}>Opcionales</p>
                    {product.details.optionals.length > 0 ? 
                        <OptionsContainer optionals={product.details.optionals} /> :
                        <p className={emptyMessage}>Este producto no tiene opcionales</p>
                    }
                </div>
            </article>
        </div>
    )
}

export default DetailsModal;