import z from "zod/v4";

export const profileSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(100),
  socialName: z.string().max(100).optional(),
  email: z.string().email("E-mail inválido."),
  phone: z
    .string()
    .min(10, "O telefone deve ter no mínimo 10 dígitos")
    .max(15, "O telefone deve ter no máximo 15 dígitos"),
  image: z.string().url("URL de imagem inválida").optional(),
  sex: z.enum(["male", "female", "other"]),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data de nascimento inválida",
    }),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  healthPlan: z
    .object({
      id: z.string().uuid("ID do plano de saúde inválido"),
      name: z
        .string()
        .min(2, "O nome do plano de saúde deve ter no mínimo 2 caracteres"),
    })
    .optional(),
  allergies: z.array(z.string().min(2)).optional(),
  chronicDiseases: z.array(z.string().min(2)).optional(),
  emergencyContacts: z.array(z.string().min(2)).optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
