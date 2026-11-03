import { useAuth } from "@/core/auth/hooks/use-auth";
import { ROLE } from "@/shared/domain/user/role";
import AdminLayout from "@/core/auth/layout/roles/admin/AdminLayout";
import FacturacionLayout from "@/core/auth/layout/roles/facturacion/FacturacionLayout";
import VendedorLayout from "@/core/auth/layout/roles/vendedor/VendedorLayout";
import ServerErrorPage from "./ServerErrorPage";

const AuthenticatedServerErrorPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <ServerErrorPage />;
    }

    const Layout =
        user.role === ROLE.OWNER
            ? AdminLayout
            : user.role === ROLE.BILLING
              ? FacturacionLayout
              : VendedorLayout;

    return (
        <Layout>
            <ServerErrorPage />
        </Layout>
    );
};

export default AuthenticatedServerErrorPage;
