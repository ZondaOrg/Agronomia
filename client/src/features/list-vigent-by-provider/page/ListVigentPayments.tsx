import { useEffect } from "react";
import { useGetVigentesPaymentsByProvider } from "../hooks/use-get-payment-by-provider-simple";
import { useParams } from "react-router";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { PaymentCard } from "./components/card/PaymentCard";
import { paymentList } from "./styles";
import { FiltrarButton } from "./components/filter/FilterButton";

export const ListVigentPayments = () => {
    const { data, isLoading, getVigentPaymentsByProvider } =
        useGetVigentesPaymentsByProvider();
    const { providerId } = useParams<{ providerId: string }>();

    useEffect(() => {
        getVigentPaymentsByProvider(Number(providerId));
    }, [getVigentPaymentsByProvider, providerId]);

    if (isLoading || !data) {
        return <Spinner />;
    }
    return (
        <SectionPanel
            title={data.nameList}
            titleSize="xl"
            centered
            maxHeight="lg"
            actions={<FiltrarButton />}
            description={`última actualización ${data.updateAt}`}
        >
            <ul className={paymentList}>
                {data.payments.map((payment) => (
                    <PaymentCard
                        key={payment.id}
                        payment={payment}
                    />
                ))}
            </ul>
        </SectionPanel>
    );
};
