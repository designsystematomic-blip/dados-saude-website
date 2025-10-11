import z from "zod/v4";

export const loginFormSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100),
  redirectTo: z.string().optional(),
});

export type UserLoginData = z.infer<typeof loginFormSchema>;
