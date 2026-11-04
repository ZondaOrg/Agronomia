import * as z from "zod"; 

const schema = z.object({
  email: z.email({
    error: (result) => result.input === "" ? "El correo es obligatorio" : "El correo no es valido"}),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type CredentialsSchema = typeof schema;

export default schema;