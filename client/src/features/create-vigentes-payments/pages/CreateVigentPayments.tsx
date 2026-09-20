import { useRef } from "react";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import { paymentsSubForms } from "./types/subForms";
import paymentsSchema from "./types/vigent-schema";
import { CreatePaymentsTable } from "./components/table/CreatePaymentsTable";
import { useCreateVigentPayments } from "../hook/use-create-vigent-payments";
import Spinner from "@/shared/components/spinner/Spinner";

type Props = {
    providerId: number;
};

export const CreateVigentPayment = ({ providerId }: Props) => {
    const { withPayments, loading, error } =
        useCreateVigentPayments(providerId);

    const submitRef = useRef<(rest: { nameList: string }) => void>(() => {});

    const onSubmit = (data: { nameList: string }) => {
        submitRef.current(data);
    };

    return (
        <>
            <ComposeForm
                subForms={paymentsSubForms}
                schema={paymentsSchema}
                bordered={false}
                buttonData={{ text: "Guardar listado" }}
                onSubmit={onSubmit}
                onCancel={() => console.log("cancel")}
            />
            <CreatePaymentsTable
                withPayments={withPayments}
                submitRef={submitRef}
            />
            {loading && <Spinner />}
            {error && <p>Ocurrió un error al guardar el listado.</p>}
        </>
    );
};
