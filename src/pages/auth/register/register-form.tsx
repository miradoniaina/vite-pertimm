import { HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { RegisterFormSchema, RegisterFormValues } from "./register-form.schema";

interface RegisterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit?: (data: RegisterFormValues) => Promise<void>;
  errorMsg?: string;
}

export function RegisterForm({
  onSubmit: onSubmitProps,
  errorMsg,
  ...props
}: RegisterProps) {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = form;

  const onSubmit = async (data: RegisterFormValues) => {
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
            name="email"
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
