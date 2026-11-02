import { ADMIN_ROUTES } from "../../../../routes/admin/paths";
import { links } from "./links";
import AuthenticatedLayout from "../../AuthenticatedLayout";
import { ROLE } from "@/shared/domain/user/role";
import type { ReactNode } from "react";

const AdminLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={ADMIN_ROUTES.CONFIGURATION.BASE}
            allowedRoles={[ROLE.OWNER]}
            children={children}
        />
    );
};

export default AdminLayout;
