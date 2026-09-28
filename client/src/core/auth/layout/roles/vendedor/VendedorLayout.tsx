import AuthenticatedLayout from "../../AuthenticatedLayout";
import { links } from "../admin/links";
import { ROLE } from "@/shared/domain/user/role";

const VendedorLayout = () => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={"/vendedor"}
            allowedRoles={[ROLE.SELLER]}
        />
    );
};

export default VendedorLayout;
