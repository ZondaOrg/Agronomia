import { Tabs } from "@/shared/components/tabs/Tabs";
import AddProduct from "@/features/add-product/pages/AddProduct";
import { ROLE } from "@/shared/domain/user/role";
import ListPrice from "@/features/price-list/pages/PriceList";

const ProductPanel = () => {
    return (
        <Tabs tabs={
            [
                {
                    nameTab: "Todos los productos",
                    page: <ListPrice />
                },
                {
                    nameTab: "Añadir Productos",
                    page: <AddProduct />,
                    allowedRoles: [ROLE.OWNER]
                }
            ]
        }
        />
    )
}

export default ProductPanel;