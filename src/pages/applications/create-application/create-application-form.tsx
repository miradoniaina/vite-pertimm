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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/type/application";
import { createApplicationFormSchema, CreateApplicationFormValues } from "./create-application-form.schema";


interface CreateApplicationFormProps {
  application?: Application;
  mutationPending: boolean;
  onSubmit: (data: CreateApplicationFormValues) => Promise<void>;
}

export function CreateApplicationForm({
  application,
  mutationPending,
  onSubmit,
}: CreateApplicationFormProps) {
  const formSchema = createApplicationFormSchema;

  const form = useForm<CreateApplicationFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto w-full max-w-4xl shadow-lg transition-shadow duration-200 hover:shadow-xl">
          <CardHeader className="border-b">
            <h3 className="text-xl font-semibold">Informations générales</h3>
            <p className="text-sm text-slate-600">
              Configurez les paramètres principaux de l'application
            </p>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mail@example.com"
                        {...field}
                        value={field.value}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        value={field.value}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium">Prénom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Johm"
                        {...field}
                        value={field.value}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={mutationPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
            >
              {application?.status !== "COMPLETED"
                ? "Sauvegarder"
                : "Confirmer"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
