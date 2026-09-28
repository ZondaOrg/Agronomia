import AuthenticatedLayout from "../../AuthenticatedLayout";
import { links } from "./links";
import { ROLE } from "@/shared/domain/user/role";

const FacturacionLayout = () => {
    return (
        <AuthenticatedLayout
            links={links}
            avatarTo={"/facturacion"}
            allowedRoles={[ROLE.BILLING, ROLE.OWNER]}
        />
    );
};

export default FacturacionLayout;
