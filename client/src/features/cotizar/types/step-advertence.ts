import type { AdvertenceData } from "@/shared/components/notify/types/advertence-data";

export type StepAdvertence = Omit<AdvertenceData, "onConfirm">;

export const STEP_ADVERTENCE: StepAdvertence[] = [
    {
        subtitle: "Perderas la selección del cliente.",
        cancelText: "Continuar cotizando",
        confirmText: "Cancelar cotización",
    },
    {
        subtitle:
            "Si regresas a clientes vas a perder los datos de la selección de productos.",
        cancelText: "Continuar cotizando",
        confirmText: "Regresar a cliente",
    },
    {
        subtitle: "Si regresas a productos vas a perder la selección de formas de pago.",
        cancelText: "Continuar cotizando",
        confirmText: "Regresar a producto",
    },
    {
        subtitle: "Si regresas perderás los cambios de la vista previa.",
        cancelText: "Continuar cotizando",
        confirmText: "Regresar",
    },
];