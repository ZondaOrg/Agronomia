import { useNavigate } from "react-router";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/button/Button";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";

export const NoProviders = () => {
    const navigate = useNavigate();

    return (
        <EmptyState
            icon={<TractorIcon />}
            title="Todavía no cargaste ningún proveedor"
            description="Agregá tus proveedores para poder asociar productos y armar cotizaciones."
            action={
                <Button
                    color={token("colors.primaryColor")}
                    hoverColor={token("colors.primaryColorHover")}
                    textColor="white"
                    onClick={() => navigate("nuevo-proveedor")}
                >
                    + Añadir proveedor
                </Button>
            }
        />
    );
};
