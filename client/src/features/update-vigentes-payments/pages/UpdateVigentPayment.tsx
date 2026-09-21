import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import { useUpdateVigentPayments } from "../hooks/use-update-vigent-payments";
import type {
    Payment,
    VigentesPayment,
} from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { getUpdateVigentPaymentSections } from "./types/updateMultiFormSections";

type Props = {
    vigentId: number;
    data: VigentesPayment;
    onPageChange?: (page: number) => void;
};

export const UpdateVigentPayment = ({
    vigentId,
    data,
    onPageChange,
}: Props) => {
    const {
        isCancel,
        notify,
        action,
        updateVigentPayments,
        onRefresh,
        handleCancelNotify,
    } = useUpdateVigentPayments();

    const originalPaymentsList =
        data.payments?.rows.map((row) => row.data) || [];

    const sections = getUpdateVigentPaymentSections(
        data,
        data.payments,
        onPageChange,
    );

    const handleSubmit = (formData: unknown[]) => {
        const [fieldsData, tableData] = formData as [
            { nameList: string },
            Payment[],
        ];

        const deletePayments = originalPaymentsList
            .filter((orig) => !tableData.some((t) => t.id === orig.id))
            .map((p) => p.id!);

        const newPayments = tableData.filter((p) => !p.id);

        updateVigentPayments({
            vigentId,
            nameList: fieldsData.nameList,
            deletePayments,
            payments: newPayments,
        });
    };

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={true}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <MultiForm
                sections={sections}
                submitLabel="Guardar cambios"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};
