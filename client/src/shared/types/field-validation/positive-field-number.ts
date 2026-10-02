import z from "zod";

function positiveFieldNumber(motive: string) {
    return z.coerce.string()
            .trim()
            .min(1, { message: `${motive} es obligatorio` })
            .transform((v) => Number(v))
            .pipe(z
                .number()
                .positive({ message: `${motive} debe ser mayor a 0` })
            )
}

export default positiveFieldNumber;