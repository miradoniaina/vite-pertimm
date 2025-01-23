import { z } from "zod";

export const SignInFormSchema = z.object({
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
});

export type SignInFormValues = z.infer<
  typeof SignInFormSchema
>;