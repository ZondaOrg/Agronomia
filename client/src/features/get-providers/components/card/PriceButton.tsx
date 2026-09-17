import Button from "@/shared/components/button/Button";
import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/domain/user/role";
import { token } from "@styled-system/tokens";
import * as styles from "./styles";
import { useNavigate } from "react-router";
import { PRODUCTS } from "@/core/routes/urls/products";

type PricesButtonProps = {
    hasPrices: boolean;
    idProvider: number 
    nameProvider: string
};

export const PricesButton = ({ hasPrices, idProvider, nameProvider }: PricesButtonProps) => {
    const navegate = useNavigate()

    if (hasPrices) {
        return (
            <Button
                onClick={() => navegate(PRODUCTS.PATH(idProvider, nameProvider))}
                color={token("colors.primaryColor")}
                hoverColor={token("colors.primaryColorHover")}
                textColor="white"
                className={styles.priceListButton}
            >
                Lista de precios
            </Button>
        );
    }

    return (
        <RoleGuard allowedRoles={[ROLE.OWNER]}>
            <Button
                color="transparent"
                hoverColor={token("colors.primaryColor")}
                borderColor={token("colors.primaryColor")}
                textColor={token("colors.primaryColor")}
                textHoverColor="white"
                className={styles.priceListButton}
            >
                Añadir lista de precios
            </Button>
        </RoleGuard>
    );
};
