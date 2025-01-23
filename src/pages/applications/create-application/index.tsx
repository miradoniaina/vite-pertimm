import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "@/components/custom/breadcrumb";
import {
  CreateApplicationForm,
} from "./create-application-form";
import { Application } from "@/type/application";
import { CreateApplicationFormValues } from "./create-application-form.schema";

type CreateApplicationProps = {
  onSubmit: (data: CreateApplicationFormValues) => Promise<void>;
  errorMsg?: string;
  application?: Application;
  mutationPending: boolean;
};

export const CreateApplication = ({
  application,
  mutationPending,
  onSubmit,
}: CreateApplicationProps) => {
  const handleSubmit = async (data: CreateApplicationFormValues) => {
    await onSubmit(data as CreateApplicationFormValues);
  };

  return (
    <>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Applications
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="text-foreground">Ajout application</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ajouter un nouveau application
          </h2>
          <p className="text-muted-foreground">
            Remplissez le formulaire ci-dessous pour ajouter un application.
          </p>
        </div>

        <CreateApplicationForm
          application={application}
          mutationPending={mutationPending}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
