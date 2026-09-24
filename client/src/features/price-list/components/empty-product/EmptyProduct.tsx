import Button from "@/shared/components/button/Button";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import { token } from "@styled-system/tokens";

const EmptyProduct = () => {    
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
                    onClick={() => ""}
                >
                    + Añadir producto
                </Button>
            }
        />
    )
}

export default EmptyProduct;