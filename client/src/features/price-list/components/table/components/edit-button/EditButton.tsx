import icon from "@/assets/icons/edit-button.svg"
import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/domain/user/role";

const EditButton = () => {
    return (
        <RoleGuard allowedRoles={[ROLE.OWNER]}>
            <img src={icon} alt="Icono para editar un producto" />
        </RoleGuard>
    )
}

export default EditButton;