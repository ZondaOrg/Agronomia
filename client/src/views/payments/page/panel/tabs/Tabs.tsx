import type { Tab } from "@/shared/components/tabs/types/Tabs";
import { ROLE } from "@/shared/domain/user/role";
import { VigentPaymentPage } from "../../vigent-payments/VigentPaymentPage";
import { ListVigentPayments } from "@/features/list-vigent-by-provider/page/ListVigentPayments";

export const tabs: Tab[] = [
    {
        page: <ListVigentPayments />,
        nameTab: "Ver",
    },
    {
        page: <VigentPaymentPage />,
        allowedRoles: [ROLE.OWNER],
        nameTab: "Actualizar",
    },
];
