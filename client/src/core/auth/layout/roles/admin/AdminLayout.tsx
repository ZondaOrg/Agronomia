import { ADMIN_ROUTES } from "../../../../routes/admin/paths";
import { links } from "./links";
import AuthenticatedLayout from "../../AuthenticatedLayout";
import { ROLE } from "@/shared/domain/user/role";

const AdminLayout = () => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={ADMIN_ROUTES.CONFIGURATION}
            allowedRoles={[ROLE.OWNER]}
        />
    );
};

export default AdminLayout;
