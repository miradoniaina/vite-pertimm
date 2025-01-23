import { CreateApplication } from ".";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createApplicationApi,
  getApplicationApi,
  confirmApplicationApi,
} from "./create-application.api";
import { Application } from "@/type/application";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CreateApplicationFormValues } from "./create-application-form.schema";

export const CreateApplicationContainer = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const {
    mutateAsync: createApplicationAsync,
    data: createApplicationData,
    isPending: mutationPending,
  } = useMutation<Application, Error, Application>({
    mutationFn: createApplicationApi,
  });

  const { data: application, refetch } = useQuery<Application>({
    queryKey: ["getApplication", createApplicationData?.uid],
    queryFn: () => getApplicationApi(String(createApplicationData?.uid)),
    enabled: Boolean(createApplicationData),
  });

  const {
    mutateAsync: confirmApplicationAsync,
    isPending: confirmationPending,
  } = useMutation<
    Application,
    Error,
    {
      url: string;
      confirmed: boolean;
    }
  >({
    mutationKey: ["confirmApplication", application?.uid],
    mutationFn: () =>
      confirmApplicationApi(String(application?.confirmation_url), true),
  });

  useEffect(() => {
    if (Boolean(createApplicationData) && application?.status !== "COMPLETED") {
      refetch();
    }
  }, [application]);

  const handleCreateApplication = async (
    formData: CreateApplicationFormValues
  ) => {
    try {
      await createApplicationAsync(formData);

      toast({
        title: "Application crée avec succès",
        description: `L'application a été crée.`,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (formData: CreateApplicationFormValues) => {
    try {
      if (application?.status === "COMPLETED") {
        await confirmApplicationAsync({
          url: `${application?.confirmation_url}`,
          confirmed: true,
        });

        toast({
          title: "Application confirmé avec succès",
          description: `L'application a été confirmé.`,
        });

      } else {
        handleCreateApplication(formData);
      }
    } catch (err) {
      const message = (err as AxiosError)?.response?.data?.message;

      switch (message) {
        default:
          setErrorMsg(UNEXPECTED_ERROR_MSG);
      }
    }
  };

  return (
    <CreateApplication
      onSubmit={handleSubmit}
      errorMsg={errorMsg}
      application={application}
      mutationPending={mutationPending || confirmationPending}
    />
  );
};

const UNEXPECTED_ERROR_MSG =
  "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
