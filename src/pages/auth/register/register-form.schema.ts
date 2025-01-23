import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Veuillez entrer votre email" })
      .email({ message: "Adresse email invalide" }),
    password: z
      .string()
      .min(1, {
        message: "Veuillez entrer votre mot de passe",
      })
      .min(4, {
        message: "Le mot de passe doit contenir au moins 4 caractères",
      }),
    confirmPassword: z
      .string()
      .min(1, {
        message: "Veuillez entrer votre mot de passe",
      })
      .min(4, {
        message: "Le mot de passe doit contenir au moins 4 caractères",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
