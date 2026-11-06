import { useCallback, useEffect } from "react";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import DataField from "@/shared/components/dataField/DataField";
import { FormPayment } from "../components/form/FormPayment";
import { useStep3Preview } from "../hooks/use-step3-preview";
import { optionalList, preview, previewFields } from "./styles";

const STEP3_PREVIEW_REQUEST = {
    idProvider: 1,
    idProduct: 1,
    idOptionals: [1, 2, 3],
};

interface StepPaymentProps {
    stepId: string;
}

export const StepPayment = ({ stepId }: StepPaymentProps) => {
    const { data, error, getPreview, loading } = useStep3Preview();

    useEffect(() => {
        void getPreview(STEP3_PREVIEW_REQUEST);
    }, [getPreview]);

    const handleSearch = useCallback((_filters: FilterValues) => undefined, []);

    const handleClear = useCallback(() => undefined, []);

    return (
        <Step
            stepId={stepId}
            title="Elegí la forma de pago"
            filter={<div>{/* Coloca aquí tu componente de filtro */}</div>}
            extraPosition="before"
            form={
                <FormPayment
                    stepId={stepId}
                    items={data?.vigentePayment ?? []}
                    loading={loading}
                />
            }
            extra={
                <section
                    className={preview}
                    aria-labelledby="step-payment-preview"
                >
                    <dl className={previewFields}>
                        <DataField
                            label="Nombre proveedor"
                            value={
                                loading
                                    ? "Cargando..."
                                    : data?.nameProvider ?? "—"
                            }
                        />
                        <DataField
                            label="Nombre producto"
                            value={
                                loading
                                    ? "Cargando..."
                                    : data?.nameProduct ?? "—"
                            }
                        />
                        <DataField
                            label="¿Incluye flete?"
                            value="Sí"
                        />
                        <DataField
                            label="Opcionales"
                            value={
                                <ul className={optionalList}>
                                    {data?.nameOptionals.map((optional) => (
                                        <li key={optional}>{optional}</li>
                                    ))}
                                </ul>
                            }
                        />
                        {error && (
                            <DataField
                                label="Error"
                                value="No se pudo cargar la vista previa"
                            />
                        )}
                    </dl>
                </section>
            }
            service={handleSearch}
            onClear={handleClear}
            actionsPosition="aside"
            // actions={<TuAccionAdicional />} // Opcional
        />
    );
};
