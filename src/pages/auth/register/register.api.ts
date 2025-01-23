import axios from "@/axios";

export const registerApi = async (user: any) => {
  const response = await axios.post("/api/v1.1/auth/register/", user);
  return response.data;
};
