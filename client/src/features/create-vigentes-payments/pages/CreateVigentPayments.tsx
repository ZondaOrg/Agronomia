import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import { vigentPaymentSections } from "./types/multiFormSections";
import { useCreateVigentPayments } from "../hook/use-create-vigent-payments";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const {
        isCancel,
        notify,
        action,
        createVigentPayments,
        onRefresh,
        handleCancelNotify,
    } = useCreateVigentPayments();

    const handleSubmit = (data: unknown[]) => {
        const [fieldsData, tableData] = data as [
            { nameList: string },
            Payment[],
        ];

        createVigentPayments({
            nameList: fieldsData.nameList,
            providerId,
            payments: tableData,
        });
    };

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={false}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <MultiForm
                sections={vigentPaymentSections}
                submitLabel="Guardar forma de pago"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};
