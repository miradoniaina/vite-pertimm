import { HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/password-input";
import { useNavigate } from "react-router-dom";

interface RegisterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit?: (data: z.infer<typeof formSchema>) => Promise<void>;
  errorMsg?: string;
}

const formSchema = z.object({
  login: z
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
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Les mots de passe ne correspondent pas",
});;

export function RegisterForm({
  onSubmit: onSubmitProps,
  errorMsg,
  ...props
}: RegisterProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: ""
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (onSubmitProps) {
      await onSubmitProps(data);
    }
  };

  const handleInputChange = () => {
    if (errors.root) {
      clearErrors("root");
    }
  };

  useEffect(() => {
    if (errorMsg) {
      setError("root", { type: "manual", message: errorMsg });
    }
  }, [errorMsg, setError]);

  return (
    <div {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel>Confirmer mot de passe</FormLabel>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors.root?.message && (
            <p className="text-sm font-medium text-destructive">
              {errors.root.message}
            </p>
          )}

          <div className="flex flex-inline items-center justify-between">
            <Button className="mt-2" disabled={isSubmitting}>
              S'inscrire
            </Button>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/sign-in");
              }}
            >
              Se connecter ?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
