// import { useCallback, useEffect, useState } from "react";
// import {
//     CardCheckInput,
//     type CardCheckOption,
// } from "@/shared/components/card-check-input";
// import FilterChain from "@/shared/components/filter/chain/FilterChain";
// import type { FilterFieldConfig } from "@/shared/components/filter/chain/types/filter-chain";
// import { useAppDispatch, useAppSelector } from "@/core/store/hooks";

import { Container } from "@/features/cotizar/components/Container";
import { StepClient } from "@/features/cotizar/step-client/page/StepClient";
import { StepManager } from "@/shared/components/step/StepManager";

// import {
//     initStep,
//     setFilterValue,
// } from "@/features/cotizar/store/filterChain/filter-chain.slice";

// const STEP_ID = "step-1";

// const provinciaCiudadFilters: FilterFieldConfig[] = [
//     {
//         id: "provincia",
//         label: "Provincia",
//         required: true,
//         variant: "select",
//         options: [
//             { value: "BA", label: "Buenos Aires" },
//             { value: "CABA", label: "CABA" },
//         ],
//     },
//     {
//         id: "ciudad",
//         label: "Ciudad",
//         required: true,
//         variant: "text",
//     },
// ];

// export const CotizarPanel = () => {
//     // Redux (filtros)
//     const dispatch = useAppDispatch();
//     const filterValues = useAppSelector((s) => selectStepValues(s, STEP_ID));
//     const filterEnabled = useAppSelector((s) => selectStepEnabled(s, STEP_ID));
//     const filtersCompleto = useAppSelector((s) =>
//         selectFiltersCompleto(s, STEP_ID),
//     );

//     useEffect(() => {
//         dispatch(
//             initStep({
//                 stepId: STEP_ID,
//                 filters: provinciaCiudadFilters.map(({ id, required }) => ({
//                     id,
//                     required,
//                 })),
//             }),
//         );
//     }, [dispatch]);

//     const handleFilterChange = useCallback(
//         (filterId: string, value: string | null) =>
//             dispatch(setFilterValue({ stepId: STEP_ID, filterId, value })),
//         [dispatch],
//     );

//     // Estado local (cards)
//     const [simpleValue, setSimpleValue] = useState<string | null>(null);
//     const [articleValue, setArticleValue] = useState<string | null>(null);
//     const [multipleSimpleValues, setMultipleSimpleValues] = useState<string[]>(
//         [],
//     );
//     const [multipleArticleValues, setMultipleArticleValues] = useState<
//         string[]
//     >([]);

//     const articleOptions: CardCheckOption[] = [
//         {
//             value: "article-1",
//             label: "DOL 360: ",
//             description: "30% sobre 30 días",
//             content: <strong>Recargo: 12%</strong>,
//         },
//         {
//             value: "article-2",
//             label: "DOL 180: ",
//             description: "15% sobre 15 días",
//             content: <strong>Recargo: 8%</strong>,
//         },
//     ];

//     return (
//         <div>
//             <FilterChain
//                 filters={provinciaCiudadFilters}
//                 values={filterValues}
//                 enabled={filterEnabled}
//                 onChange={handleFilterChange}
//                 completo={filtersCompleto}
//             />

//             <CardCheckInput
//                 options={[
//                     { value: "option-1", label: "Opción simple 1" },
//                     { value: "option-2", label: "Opción simple 2" },
//                 ]}
//                 value={simpleValue}
//                 onChange={setSimpleValue}
//                 variant="CardSimple"
//                 emptyMessage="No hay opciones simples"
//             />
//             <CardCheckInput
//                 options={articleOptions}
//                 value={articleValue}
//                 onChange={setArticleValue}
//                 variant="CardArticleDetailed"
//                 emptyMessage="No hay artículos disponibles"
//             />

//             <CardCheckInput
//                 options={[
//                     { value: "multiple-option-1", label: "Opción múltiple 1" },
//                     { value: "multiple-option-2", label: "Opción múltiple 2" },
//                 ]}
//                 multiple
//                 value={multipleSimpleValues}
//                 onChange={setMultipleSimpleValues}
//                 variant="CardSimple"
//                 emptyMessage="No hay opciones simples"
//             />

//             <CardCheckInput
//                 options={articleOptions}
//                 multiple
//                 value={multipleArticleValues}
//                 onChange={setMultipleArticleValues}
//                 variant="CardArticleDetailed"
//                 emptyMessage="No hay artículos disponibles"
//             />
//         </div>
//     );
// };

export const CotizarPanel = () => {
    return (
        <StepManager
            indexes={["Cliente", "Producto", "Formas de pago"]}
            steps={[StepClient /*StepProduct, StepPayment, StepPreview*/]}
            Container={Container}
            title="Nueva cotización"
        />
    );
};
