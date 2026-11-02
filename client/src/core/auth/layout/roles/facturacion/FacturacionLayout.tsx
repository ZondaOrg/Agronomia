import AuthenticatedLayout from "../../AuthenticatedLayout";
import { links } from "./links";
import { ROLE } from "@/shared/domain/user/role";
import type { ReactNode } from "react";

const FacturacionLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={"/facturacion"}
            allowedRoles={[ROLE.BILLING, ROLE.OWNER]}
            children={children}
        />
    );
};

export default FacturacionLayout;
