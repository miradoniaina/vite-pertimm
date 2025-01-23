import axios from "@/axios";
import { Application } from "@/type/application";

export const createApplicationApi = async (application: Application) => {
  const response = await axios.post(
    "/api/v1.1/job-application-request/",
    application
  );
  return response.data;
};

export const getApplicationApi = async (uid: string) => {
  const response = await axios.get(`/api/v1.1/job-application-request/${uid}/`);
  return response.data;
};

export const confirmApplicationApi = async (url: string, confirmed: boolean) => {
  const response = await axios.patch(
    `${url}`,
    {
      confirmed,
    }
  );
  return response.data;
};