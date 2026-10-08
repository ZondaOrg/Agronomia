import { useCallback, useState } from "react";
import { token } from "@styled-system/tokens";
import Button from "@/shared/components/button/Button";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import { CreateTypeProduct } from "@/features/add-type-product/components/CreateTypeProduct";
import { ListTypesProductsPage as ProductTypesGrid } from "@/features/list-types-products/page/ListTypesProductsPage";
import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { ROLE } from "@/shared/types/roles/Roles";

export const ListTypesProductsPage = () => {
    const [isCreateTypeOpen, setIsCreateTypeOpen] = useState(false);
    const [refreshProductTypes, setRefreshProductTypes] = useState<() => void>(
        () => () => undefined,
    );

    const handleRefreshReady = useCallback((refresh: () => void) => {
        setRefreshProductTypes(() => refresh);
    }, []);

    return (
        <SectionPanel
            title="Productos"
            titleSize="xxxl"
            maxWidth="full"
            actions={
                <RoleGuard allowedRoles={[ROLE.OWNER]}>
                    <Button
                        color="white"
                        hoverColor={token("colors.primaryColorHover") + "20"}
                        borderColor={token("colors.primaryColor")}
                        textColor={token("colors.primaryColor")}
                        onClick={() => setIsCreateTypeOpen(true)}
                    >
                        + Añadir tipo de producto
                    </Button>
                </RoleGuard>
            }
        >
            <ProductTypesGrid onRefreshReady={handleRefreshReady} />
            <CreateTypeProduct
                isOpen={isCreateTypeOpen}
                onClose={() => setIsCreateTypeOpen(false)}
                onCreated={refreshProductTypes}
            />
        </SectionPanel>
    );
};
