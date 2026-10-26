import { useCallback } from "react";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";

interface StepProductProps {
    stepId: string;
}

export const StepProduct = ({ stepId }: StepProductProps) => {
    const handleSearch = useCallback((filters: FilterValues) => {
        // TODO: Implementar la lógica de búsqueda o llamada al servicio
    }, []);

    const handleClear = useCallback(() => {
        // TODO: Implementar la lógica para limpiar o resetear datos
    }, []);

    return (
        <Step
            stepId={stepId}
            filter={<div>{/* Coloca aquí tu componente de filtro */}</div>}
            form={
                <div>
                    <h1>PRODUCTOS asdasdas</h1>
                </div>
            }
            service={handleSearch}
            onClear={handleClear}
            actionsPosition="aside"
            // actions={<TuAccionAdicional />} // Opcional
        />
    );
};
