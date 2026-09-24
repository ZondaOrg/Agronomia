import { PRODUCTS } from "@/core/routes/urls/products";
import Button from "@/shared/components/button/Button";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import { token } from "@styled-system/tokens";
import { useNavigate } from "react-router";

const EmptyProduct = () => {
    const navigate = useNavigate();
    
    return (
        <EmptyState
            icon={<TractorIcon />}
            title="Todavía no hay productos cargados en el sistema" 
            description="Agregá los productos de este proveedor para que puedan ser cotizados."
            action={
                <Button
                    color={token("colors.primaryColor")}
                    hoverColor={token("colors.primaryColorHover")}
                    textColor="white"
                    onClick={() => navigate("/" + PRODUCTS.BASE)}
                >
                    + Añadir producto
                </Button>
            }
        />
    )
}

export default EmptyProduct;