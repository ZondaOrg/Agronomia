import { Tabs } from "@/shared/components/tabs/Tabs";
import AddProduct from "@/features/add-product/pages/AddProduct";
import { ROLE } from "@/shared/domain/user/role";

const ProductPanel = () => {
    return (
        <Tabs tabs={
            [
                {
                    nameTab: "Todos los productos",
                    page: <>Listado</>
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