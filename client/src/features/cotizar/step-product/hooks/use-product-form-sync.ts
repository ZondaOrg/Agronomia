import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import {
    guardarValores,
    initForm,
    setEstadoForm,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import { selectGuardadoNonce } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import type { Money } from "@/shared/domain/money/money";
import type { Freight } from "../domain/freight";
import { isValidQuantity } from "./use-product-quote";

export const CAMPO_PRODUCTO = "producto";
export const CAMPO_UNIDADES = "unidades";
export const CAMPO_MONEDA = "moneda";
export const CAMPO_FLETE = "flete";

const OBLIGATORIOS = [CAMPO_PRODUCTO, CAMPO_UNIDADES, CAMPO_MONEDA, CAMPO_FLETE];

interface ProductFormValues {
    productId: string | undefined;
    quantity: number | null;
    moneda: keyof Money | null;
    freight: Freight | null;
    total: number | null;
}

export const useProductFormSync = (
    stepId: string,
    { productId, quantity, moneda, freight, total }: ProductFormValues,
) => {
    const dispatch = useAppDispatch();
    const saveNonce = useAppSelector((s) => selectGuardadoNonce(s, stepId));
    const lastNonce = useRef(saveNonce);

    useEffect(() => {
        dispatch(initForm({ stepId, obligatorios: OBLIGATORIOS }));
    }, [dispatch, stepId]);

    useEffect(() => {
        const camposFaltantes = [
            ...(productId ? [] : [CAMPO_PRODUCTO]),
            ...(isValidQuantity(quantity) ? [] : [CAMPO_UNIDADES]),
            ...(moneda ? [] : [CAMPO_MONEDA]),
            ...(freight ? [] : [CAMPO_FLETE]),
        ];
        dispatch(
            setEstadoForm({
                stepId,
                formCompleto: camposFaltantes.length === 0 && total !== null,
                camposFaltantes,
            }),
        );
    }, [dispatch, stepId, productId, quantity, moneda, freight, total]);

    useEffect(() => {
        if (saveNonce === lastNonce.current) return;
        lastNonce.current = saveNonce;
        if (!productId || !moneda || !isValidQuantity(quantity) || total === null)
            return;
        dispatch(
            guardarValores({
                stepId,
                valores: {
                    [CAMPO_PRODUCTO]: productId,
                    [CAMPO_UNIDADES]: quantity,
                    [CAMPO_MONEDA]: moneda,
                    total,
                },
            }),
        );
    }, [saveNonce, dispatch, stepId, productId, quantity, moneda, total]);
};
