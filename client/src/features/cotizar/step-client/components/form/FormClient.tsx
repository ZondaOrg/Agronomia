import { HydrationForm } from "@/shared/components/step/components/form/HydratationForm";
import { CardCheckClient } from "../checks/CardCheckClient";
import type { Client } from "../../types/client";

/** Propiedades del componente `FormClient`. */
interface FormClientProps {
    /** Clientes encontrados que se muestran para seleccionar. */
    items: Client[];

    /**
     * Indica si se están cargando los clientes.
     * @default false
     */
    loading?: boolean;
}

/**
 * Formulario de resultados del paso de cliente.
 *
 * Muestra los clientes encontrados como tarjetas seleccionables
 * (`CardCheckClient`) y un mensaje mientras se cargan.
 *
 * @example
 * <FormClient items={clients} loading={loading} />
 */
export const FormClient = ({ items, loading = false }: FormClientProps) => (
    <HydrationForm
        title="Clientes encontrados"
        subtitle="Selecciona uno para continuar "
        items={items}
        loading={loading}
        Input={CardCheckClient}
        loadingMessage="Cargando clientes..."
    />
);
