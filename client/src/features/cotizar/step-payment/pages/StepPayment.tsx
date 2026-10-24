import { useCallback } from "react";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";

const STEP_ID = "1";

export const StepPayment = () => {
    const handleSearch = useCallback((filters: FilterValues) => {
        // TODO: Implementar la lógica de búsqueda o llamada al servicio
    }, []);

    const handleClear = useCallback(() => {
        // TODO: Implementar la lógica para limpiar o resetear datos
    }, []);

    return (
        <Step
            stepId={STEP_ID}
            filter={<div>{/* Coloca aquí tu componente de filtro */}</div>}
            form={
                <div>
                    {/* Coloca aquí tu formulario o listado de elementos */}
                </div>
            }
            service={handleSearch}
            onClear={handleClear}
            actionsPosition="aside"
            // actions={<TuAccionAdicional />} // Opcional
        />
    );
};
