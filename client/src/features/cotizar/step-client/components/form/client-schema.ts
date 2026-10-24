import { z } from "zod";

export const stepClientSchema = z.object({
    cliente: z.string().min(1, "Debes seleccionar un cliente"),
});

export type StepClientFormValues = z.infer<typeof stepClientSchema>;
