import z from "zod/v4";

const phoneRegex = /^(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;

export const registerFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo  caracteres").max(100),
  email: z.string().email("E-mail inválido."),
  phone: z.string().regex(phoneRegex, "Formato de telefone inválido"),
  cpf: z
    .string()
    .min(11, "O CPF deve ter no mínimo 11 caracteres")
    .max(11)
    .refine((cpf) => {
      // Validação simples de CPF (apenas números)
      return /^\d{11}$/.test(cpf);
    }),
  sex: z.enum(["M", "F"], { message: "Sexo inválido" }),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de nascimento inválida",
  }),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100),
  redirectTo: z.string().optional(),
});

export type UserRegisternData = z.infer<typeof registerFormSchema>;
