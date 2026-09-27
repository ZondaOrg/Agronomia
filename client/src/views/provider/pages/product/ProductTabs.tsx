import AddProduct from "@/features/add-product/pages/AddProduct"
import ListPrice from "@/features/price-list/pages/PriceList"
import { Tabs } from "@/shared/components/tabs/Tabs"
import { ROLE } from "@/shared/domain/user/role"

const ProductTabs = () => {
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

export default ProductTabs;