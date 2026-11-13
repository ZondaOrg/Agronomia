import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/core/store/hooks";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { selectFormValores } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import { Step } from "@/shared/components/step/components/step/Step";
import DataField from "@/shared/components/dataField/DataField";
import { FormPayment } from "../components/form/FormPayment";
import { useStep3Preview } from "../hooks/use-step3-preview";
import { optionalList, preview, previewFields } from "./styles";
import { PROVIDER } from "../../step-product/components/filter/types/inputs";

interface StepPaymentProps {
    stepId: string;
}

const PRODUCT_STEP_ID = "2";

export const StepPayment = ({ stepId }: StepPaymentProps) => {
    const { data, error, getPreview, loading } = useStep3Preview();

    const providerId = useAppSelector((s) =>
        selectFilterValue(s, PRODUCT_STEP_ID, PROVIDER),
    );

    const productFormValues = useAppSelector((s) =>
        selectFormValores(s, PRODUCT_STEP_ID),
    );

    const productId = productFormValues?.producto;
    const flete = productFormValues?.flete;

    const opcionales = useMemo(() => {
        return Array.isArray(productFormValues?.opcionales)
            ? (productFormValues.opcionales as number[])
            : [];
    }, [productFormValues?.opcionales]);

    useEffect(() => {
        if (providerId && productId) {
            getPreview({
                idProvider: Number(providerId),
                idProduct: Number(productId),
                idOptionals: opcionales,
            });
        }
    }, [getPreview, providerId, productId, opcionales]);

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
                                            <li key={optional}>{optional}</li>
                                        ))
                                    ) : (
                                        <li>Ninguno</li>
                                    )}
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
            actionsPosition="aside"
        />
    );
};
