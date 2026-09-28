import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/domain/user/role";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import { useNavigate } from "react-router";

export const AddProviderButton = () => {
    const navigate = useNavigate();

    return (
        <RoleGuard allowedRoles={[ROLE.OWNER]}>
            <Button
                color="white"
                hoverColor={token("colors.primaryColorHover") + "20"}
                borderColor={token("colors.primaryColor")}
                textColor={token("colors.primaryColor")}
                onClick={() => navigate("nuevo-proveedor")}
            >
                + Añadir proveedor
            </Button>
        </RoleGuard>
    );
};
