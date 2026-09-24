import { useParams } from "react-router";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { PaymentCard } from "./components/card/PaymentCard";
import { paymentList } from "./styles";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { FilterIcon } from "@/shared/components/icon/components/icons/FilterIcon";
import { Searcher } from "@/shared/components/searcher/Sercher";
import { useGetVigentesPaymentsByProvider } from "../hooks/use-get-payment-by-provider-simple";

export const ListVigentPayments = () => {
    const { providerId } = useParams<{ providerId: string }>();
    const { data, isLoading, search, onSearch } =
        useGetVigentesPaymentsByProvider(Number(providerId));

    if (isLoading) {
        return <Spinner />;
    }

    if (!data) {
        return (
            <EmptyState
                icon={<FilterIcon size={32} />}
                title="No hay un listado de formas de pago"
                description="Este proveedor todavía no tiene formas de pago configuradas."
            />
        );
    }

    const hasPayments = data.payments.length > 0;

    return (
        <SectionPanel
            title={data.nameList}
            titleSize="xl"
            centered
            maxHeight="lg"
            actions={
                <Searcher
                    value={search}
                    title="Buscar forma de pago"
                    placeholder="Ingrese la forma de pago"
                    onChange={onSearch}
                />
            }
            description={`última actualización ${data.updateAt}`}
        >
            {hasPayments ? (
                <ul className={paymentList}>
                    {data.payments.map((payment) => (
                        <PaymentCard
                            key={payment.id}
                            payment={payment}
                        />
                    ))}
                </ul>
            ) : (
                <EmptyState
                    icon={<FilterIcon size={32} />}
                    title="No hay formas de pago cargadas"
                    description="Todavía no se agregaron formas de pago para este listado."
                />
            )}
        </SectionPanel>
    );
};
