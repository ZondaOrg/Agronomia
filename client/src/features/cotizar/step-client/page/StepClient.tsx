import { CardCheckClient } from "../components/checks/CardCheckClient";
import { useGetClientsByNameAndType } from "../hooks/use-get-clients-by-name-and-type";
import { FilterClient } from "../components/filter/FilterClient";
import { Index } from "@/shared/components/step/components/index/Index";

export const StepClient = () => {
    const { clients } = useGetClientsByNameAndType();

    return (
        <>
            <Index
                indexes={[
                    "Clientes",
                    "Productos",
                    "Formas de pago",
                    "Vista previa",
                ]}
            />
            <FilterClient />
            <CardCheckClient clients={clients} />
        </>
    );
};
