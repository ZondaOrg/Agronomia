import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import { useUpdateVigentPayments } from "../hooks/use-update-vigent-payments";
import type {
    Payment,
    VigentesPayment,
} from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import { getUpdateVigentPaymentSections } from "./types/updateMultiFormSections";
import { useLocation, useNavigate } from "react-router";

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

    const location = useLocation();
    const navigate = useNavigate();

    const handleSuccessClose = () => {
        const returnTo = location.state?.returnTo;

        onRefresh();

        setTimeout(() => {
            if (returnTo) {
                navigate(returnTo, {
                    replace: true,
                    state: location.state,
                });
            } else {
                navigate(-1);
            }
        }, 300);
    };

    const sections = getUpdateVigentPaymentSections(
        data,
        data.payments,
        onPageChange,
    );

    const handleSubmit = (
        formData: unknown[],
        deletedIdsBySection?: (number[] | undefined)[],
    ) => {
        const [fieldsData, newPayments] = formData as [
            { nameList: string },
            Payment[],
        ];

        const deletePayments = deletedIdsBySection?.[1] ?? [];

        updateVigentPayments({
            vigentId,
            nameList: fieldsData.nameList,
            deletePayments,
            newPayments,
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
            onSuccess={handleSuccessClose}
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
