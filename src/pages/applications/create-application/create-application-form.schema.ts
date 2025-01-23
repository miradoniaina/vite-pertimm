import { z } from "zod";

export const createApplicationFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Veuillez entrer votre email" })
    .email({ message: "Adresse email invalide" }),
  first_name: z
    .string()
    .min(1, {
      message: "Veuillez entrer votre prénom",
    })
    .min(4, {
      message: "Le Prénom doit contenir au moins 4 caractères",
    }),
  last_name: z
    .string()
    .min(1, {
      message: "Veuillez entrer votre nom",
    })
    .min(4, {
      message: "Le nom doit contenir au moins 4 caractères",
    }),
});

export type CreateApplicationFormValues = z.infer<
  typeof createApplicationFormSchema
>;