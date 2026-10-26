/** Valores de un form publicados al guardar, indexados por nombre de campo. */
export type FormValues = Record<string, string | null>;

/** Estado de un form asociado a un paso. */
export interface FormStepState {
    /** Nombres de los campos obligatorios. Se fijan en `initForm`. */
    obligatorios: string[];

    /** `true` si todos los campos cumplen el esquema (obligatorios y formato). */
    formCompleto: boolean;

    /** Campos obligatorios que todavía no están completos. */
    camposFaltantes: string[];

    /**
     * Valores publicados por el form. Solo se actualizan con `guardarValores`,
     * que se dispara tras `solicitarGuardado`.
     */
    valores: FormValues;

    /**
     * Contador de pedidos de guardado. El form detecta cada incremento
     * y publica sus valores.
     */
    guardadoNonce: number;

    /**
     * Contador de pedidos de resaltado. Si es mayor a 0, el form resalta
     * los campos de `camposFaltantes`. Vuelve a 0 con `resetForm`.
     */
    mostrarFaltantesNonce: number;
}

/** Estado del slice: un form por `stepId`. */
export type HidratationFormState = Record<string, FormStepState>;

/** Payload de `initForm`. */
export interface InitFormPayload {
    stepId: string;
    /** Nombres de los campos obligatorios del esquema. */
    obligatorios: string[];
}

/** Payload de `setEstadoForm`. */
export interface SetEstadoFormPayload {
    stepId: string;
    formCompleto: boolean;
    camposFaltantes: string[];
}

/** Payload de `guardarValores`. */
export interface GuardarValoresPayload {
    stepId: string;
    valores: FormValues;
}
