import AuthenticatedLayout from "../../AuthenticatedLayout";
import { links } from "../admin/links";
import { ROLE } from "@/shared/domain/user/role";
import type { ReactNode } from "react";

const VendedorLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={"/vendedor"}
            allowedRoles={[ROLE.SELLER]}
            children={children}
        />
    );
};

export default VendedorLayout;
