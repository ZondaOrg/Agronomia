import { z } from "zod";

export const stepPaymentSchema = z.object({
    payment: z.string().min(1),
    observations: z.string().max(500),
});

export type StepPaymentFormValues = z.infer<typeof stepPaymentSchema>;
