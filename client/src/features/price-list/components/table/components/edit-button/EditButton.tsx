import icon from "@/assets/icons/edit-button.svg"
import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ADMIN_ROUTES } from "@/core/routes/admin/paths";
import type { Product } from "@/features/price-list/domain/product";
import { ROLE } from "@/shared/domain/user/role";
import { useNavigate } from "react-router";

interface EditButtonProps {
    product: Product
}

const EditButton = ({product}: EditButtonProps) => {
    const navigate = useNavigate();
    
    return (
        <RoleGuard allowedRoles={[ROLE.OWNER]}>
            <img src={icon} alt="Icono para editar un producto" onClick={() => navigate(ADMIN_ROUTES.PRODUCTS.EDIT_PATH(product.id))}/>
        </RoleGuard>
    )
}

export default EditButton;