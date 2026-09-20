import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import { vigentPaymentSections } from "./types/multiFormSections";
import { useCreateVigentPayments } from "../hook/use-create-vigent-payments";
import Spinner from "@/shared/components/spinner/Spinner";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const { createVigentPayments, loading, error } = useCreateVigentPayments();

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
        <div id="holaaaaa">
            <MultiForm
                sections={vigentPaymentSections}
                submitLabel="Guardar forma de pago"
                onSubmit={handleSubmit}
                onCancel={() => console.log("cancel")}
            />
            {loading && <Spinner />}
            {error && <p>Ocurrió un error al guardar el listado.</p>}
        </div>
    );
};
