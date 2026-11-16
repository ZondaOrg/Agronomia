import { Step } from "@/shared/components/step/components/step/Step";
import DataField from "@/shared/components/dataField/DataField";
import { FormPayment } from "../components/form/FormPayment";
import { useStepPayment } from "../hooks/use-step-payment";
import { optionalList, preview, previewFields } from "./styles";

interface StepPaymentProps {
    stepId: string;
}

export const StepPayment = ({ stepId }: StepPaymentProps) => {
    const { data, error, loading, flete, total, moneda } = useStepPayment();

    return (
        <Step
            stepId={stepId}
            title="Elegí la forma de pago"
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
                            // Evaluamos contra el string que vimos en Redux DevTools
                            value={flete === "INCLUDED" ? "Sí" : "No"}
                        />
                        <DataField
                            label="Opcionales"
                            value={
                                <ul className={optionalList}>
                                    {data?.nameOptionals?.length ? (
                                        data.nameOptionals.map((optional) => (
                                            <li key={optional}>{optional}{data?.nameOptionals.indexOf(optional) === data?.nameOptionals.length - 1 ? "" : ","}</li>
                                        ))
                                    ) : (
                                        <li>Ninguno</li>
                                    )}
                                </ul>
                            }
                        />
                        <DataField
                            label="Monto total"
                            value={
                                total !== undefined
                                    ? `$${total.toLocaleString("es-AR")} ${moneda ?? ""}`.trim()
                                    : "—"
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
            actionsPosition="aside"
        />
    );
};
